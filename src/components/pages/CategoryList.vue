<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar title="类别列表"/>
        </div>
        <div>
            <van-row>
                <van-col span='6'>
                    <div id='leftNav'>
                        <ul>
                            <li @click="clickCategory(index,item.ID)" v-for="(item,index) in category" :key="index" :class="{categoryActive:categoryIndex==index}">
                                {{item.MALL_CATEGORY_NAME}}
                            </li>
                        </ul>
                    </div>
                </van-col>
                <van-col span='18'>
                    <div class="tabCategorySub">
                        <van-tabs v-model="active" @click='onClickCategorySub' type='line' swipeable>
                            <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME" >

                            </van-tab>
                        </van-tabs>
                    </div>
                    <div id="list-div">
                       <van-pull-refresh v-model="isRefresh" @refresh='onRefresh'>
                          <van-list v-model='loading' :finished='finished' @load="onload()">
                              <div class="list-item" v-for="(item,index) in goodList" :key="index" @click="goGoodsInfo(item.ID)">
                                  <div class="list-item-img">
                                    <img :src="item.IMAGE1" width="100%" :onerror="errorImg"/>
                                  </div>
                                    <div class="list-item-text">
                                        <div>{{item.NAME}}</div>
                                        <div class="">￥{{item.ORI_PRICE | moneyFilter}}</div>
                                    </div>
                              </div>
                          </van-list>
                       </van-pull-refresh>                      
                    </div>
                </van-col>
            </van-row>
        </div>
        
    </div>
</template>

<script>
import axios from "axios";
import url from "@/serverAPI.config.js";
import {tomoney} from '@/filter/moneyfilter'
import { Toast } from "vant";
export default {
  data() {
    return {
      category: [],
      categoryIndex: 0,
      categorySub: [],
      active: 0, //激活标签的值
      list: [],
      loading: false, //上拉加载使用
      finished: false, //上拉刷新是否没有数据了
      isRefresh: false, //下拉加载
      page: 1,
      goodList: [],
      categorySubId: "", //商品分类ID
      errorImg: 'this.src="'+require('@/assets/images/errorimg.png')+'"' //失效图片
    };
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height = winHeight - 46 -50 + "px";
    document.getElementById("list-div").style.height = winHeight - 90 -50 + "px";
  },
  filters:{
    moneyFilter(money){
      return tomoney(money);
    }
  },
  created() {
    this.getCategory();
  },
  methods: {
    getCategory() {
      axios({
        url: url.getCategoryList,
        method: "get"
      })
        .then(response => {
          if (response.data.code == 200 && response.data.msg) {
            this.category = response.data.msg;
            this.getCategorySubByCategoryId(this.category[0].ID);
          } else {
            Toast("服务器错误，大类获取失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    clickCategory(index, categoryId) {
      this.categoryIndex = index;
      this.categorySubId = this.categorySub[index].ID;
      this.page = 1;
      this.finished = false;
      this.goodList = [];
      this.getCategorySubByCategoryId(categoryId);
    },
    getCategorySubByCategoryId(categoryId) {
      axios({
        url: url.getCategorySubList,
        method: "post",
        data: { categoryId: categoryId }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.msg) {
            this.categorySub = response.data.msg;
            this.categorySubId = this.categorySub[0].ID;
            this.active = 0;
            this.onload();
          } else {
            Toast("服务器错误，小类获取");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onload() {
      //上拉加载
      setTimeout(() => {
        this.categorySubId = this.categorySubId
          ? this.categorySubId
          : this.categorySub[0].ID;
        this.getGoodList();
      }, 1000);
    },
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
        this.finished = false;
        this.goodList = [];
        this.page = 1;  
        this.onload();
      }, 500);
    },
    getGoodList() {
      axios({
        url: url.getGoodsListByCategorySubID,
        method: "post",
        data: {
          categorySubId: this.categorySubId,
          page: this.page
        }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.msg.length) {
            this.page++;
            this.goodList = this.goodList.concat(response.data.msg);
          } else {
            this.finished = true;
          }
          this.loading = false;
        })
        .catch(error => {
          Toast("获取数据失败");
        });
    },
    //点击子类tab获取商品信息
    onClickCategorySub(index, title) {
      this.categorySubId = this.categorySub[index].ID;
      console.log(this.categorySubId);
      this.goodList = [];
      this.finished = false;
      this.page = 1;
      this.onload();
    },
    //跳转商品详情页面
    goGoodsInfo(id){
      // this.$router.push({path: '/Goods',query:{goodsId: id}});
      this.$router.push({name: 'Goods',params:{goodsId: id}});
    }
  }
};
</script>

<style scoped>
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActive {
  background-color: #fff;
}
.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}
#list-div {
  overflow: scroll;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
</style>