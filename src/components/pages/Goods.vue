<template>
    <div>
        <div class='navbar-div'>
            <van-nav-bar title="商品详情" left-text='返回' left-arrow  @click-left="ClickLeft()" />
        </div>
        <div class="topimg-div">
            <img :src="goodsInfo.IMAGE1" alt="" width="100%">
        </div>
        <div class="goods-name">{{goodsInfo.NAME}}</div>
        <div class="goods-price">价格：￥{{goodsInfo.PRESENT_PRICE|moneyfilter}}元</div>
        <div>
            <van-tabs swipeable sticky>
                <van-tab title="商品详情">
                    <div class="detail" v-html='goodsInfo.DETAIL'>

                    </div>
                </van-tab>
                <van-tab title="评价">
                    正在制作中
                </van-tab>
            </van-tabs>
        </div>
        <div class="goods-bottom">
            <div>
                <van-button size='large' type='primary' @click="addGoodsToCart">加入购物车</van-button>
            </div>
            <div>
                <van-button size='large' type='danger'>直接购买</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import url from "@/serverAPI.config.js";
import {tomoney} from "@/filter/moneyfilter.js";
import {Toast} from 'vant';

export default {
  data() {
    return {
      goodsId: "",
      goodsInfo:{},//商品信息
    };
  },
  created() {
    this.goodsId = this.$route.query.goodsId?this.$route.query.goodsId:this.$route.params.goodsId;
    this.getInfo();
  },
  filters: {
    moneyfilter(money) {
      return tomoney(money);
    }
  },
  methods: {
    ClickLeft() {
      this.$router.go(-1);
    },
    getInfo() {
      axios({
        url: url.getDetailGoodsInfo,
        method: "post",
        data: {
          goodsId: this.goodsId
        }
      })
        .then(response => {
          if(response.data.code == 200 && response.data.msg){
            this.goodsInfo = response.data.msg;
          }else{
              Toast('服务器错误！')
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //向购物车中添加商品
    addGoodsToCart(){
        let cartInfo = localStorage.cartInfo?JSON.parse(localStorage.cartInfo) : [];
        let isHave = cartInfo.find(cart=>cart.goodsId==this.goodsId);
        console.log(isHave)
        if(!isHave){
            //没有商品信息就添加
            let newGoodsInfo={
                goodsId:this.goodsInfo.ID,
                Name:this.goodsInfo.NAME,
                price:this.goodsInfo.PRESENT_PRICE,
                image:this.goodsInfo.IMAGE1,
                count:1
            };
            cartInfo.push(newGoodsInfo);
            localStorage.cartInfo = JSON.stringify(cartInfo);
            Toast.success('添加成功！')
        }else{
            Toast.success('商品已存在')
        }
        this.$router.push({name: 'cart'});
    }
  }
};
</script>

<style scoped>
.detail{
    font-size: 0px;
}
.goods-name{
    background-color: #fff;
}
.goods-price{
    background: #fff;
}
.goods-bottom{
    position: fixed;
    bottom:0px;
    left:0px;
    background-color: #FFF;
    width:100%;
    display: flex;
    flex-direction: row;
    flex-flow: nowrap;
}
.goods-bottom > div{
    flex:1;
    padding:5px;
}
</style>