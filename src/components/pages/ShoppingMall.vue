<template>
    <div>
        <div class="search-bar">
             <van-row>
            <van-col span='3'>
                <img :src="locationIcon" width="50%" alt="" class="locationIcon">
            </van-col>
            <van-col span='16'>
                <input type="text" class="search-input" placeholder="查找"> 
            </van-col>
            <van-col span='5' class="vbutton">
                <van-button size='mini'>
                    查找
                </van-button>
            </van-col>
        </van-row>
        </div>
        <!--swipe area-->
        <div class="swipe-area">
            <van-swipe :autoplay='1000'>
                <van-swipe-item v-for='( banner,index ) in bannerPic' :key="index">
                  <img v-lazy="banner.image" alt="" width="100%">
                </van-swipe-item>
            </van-swipe>
        </div>
       <!--type-bar-->
       <div class="type-bar">
         <div v-for="(cate,index) in category" :key="index">
            <img v-lazy="cate.image" alt="" width="61.3px">
            <span>{{cate.mallCategoryName}}</span>
         </div>
       </div>
       <!--adbanner-->
       <div>
         <img v-lazy="adbanner" alt="" width="100%">
       </div>
       <!--recommend goods area-->
       <div class="recommend">
         <div class="recommend-title">
            商品推荐
         </div>
         <div class="recommend-body">
           <swiper :options='swiperOption'>
             <swiper-slide v-for="(recommend,index) in recommendgoods" :key="index">
               <div class="recommenditem">
                  <img :src="recommend.image" width="80%" alt="">
                  <div>{{recommend.goodsName}}</div>
                  <div>￥ {{recommend.price|moneyfilter}}(￥{{recommend.mallPrice|moneyfilter}})</div>
               </div>
             </swiper-slide>
           </swiper>
         </div>
       </div>
       <!-- <swiper-default></swiper-default>
       <swiper-default1></swiper-default1>
       <swiper-default2></swiper-default2>
       <swiper-default3></swiper-default3> -->
       <floor-component :floorData='floor1' :floortitle='floorName.floor1'></floor-component>
       <floor-component :floorData='floor2' :floortitle='floorName.floor2'></floor-component>
       <floor-component :floorData='floor3' :floortitle='floorName.floor3'></floor-component>
       
        <!--Hot Area-->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
              <!--这里需要一个list组件-->
              <van-list>
                <van-row>
                    <van-col span='12' v-for='(item,index) in hotgoods' :key="index">
                        <goodsinfocomponent :goodsImage='item.image' :goodsId='item.goodsId' :goodsName='item.name' :goodsPrice='item.price'></goodsinfocomponent>
                    </van-col>
                </van-row>
              </van-list>
            </div>
        </div>

    </div>
</template>

<script>
import axios from "axios";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
// import swiperDefault from '../swiper/swiperDefault.vue'
// import swiperDefault1 from '../swiper/swiperDefault.1.vue'
// import swiperDefault2 from '../swiper/swiperDefault.2.vue'
// import swiperDefault3 from '../swiper/swiperDefault.3.vue'
import floorComponent from "../component/floorComponent.vue";
import goodsinfocomponent from "../component/goodsinfocomponent.vue";
import { tomoney } from "@/filter/moneyfilter.js";
import url from "@/serverAPI.config.js";
import data from "../../util/mock.js";

export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 3
      },
      msg: "shoppingmall",
      locationIcon: require("../../assets/images/location.png"),
      bannerPic: [],
      category: [],
      adbanner: "",
      recommendgoods: [],
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: [],
      hotgoods: []
    };
  },
  components: { swiper, swiperSlide, floorComponent, goodsinfocomponent },
  filters: {
    moneyfilter(money) {
      return tomoney(money);
    }
  },
  created() {
    axios({
      // url:url.getShoppingMallInfo,
      url: "http://index",
      method: "get"
    })
      .then(response => {
        console.log(response);
        if (response.status == 200) {
          this.category = response.data.data.category;
          this.adbanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
          this.bannerPic = response.data.data.slides;
          this.recommendgoods = response.data.data.recommend;
          this.floor1 = response.data.data.floor1;
          this.floor2 = response.data.data.floor2;
          this.floor3 = response.data.data.floor3;
          this.floorName = response.data.data.floorName;
          this.hotgoods = response.data.data.hotGoods;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.search-bar {
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
  overflow: hidden;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 1px solid #ffffff;
  background-color: #e5017d;
  color: #ffffff;
}
.locationIcon {
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}
.vbutton {
  text-align: center;
}
.search-input::-webkit-input-placeholder {
  color: #fff;
}
.search-input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #fff;
}
.search-input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #fff;
}
.search-input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #fff;
}
.swipe-area {
  clear: both;
  max-height: 10rem;
  overflow: hidden;
}
.type-bar {
  background-color: #ffffff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  min-width: 2rem;
  overflow: hidden;
}
.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
}
.recommend {
  background: #ffffff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}
.recommenditem {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
.hot-goods {
  /* height: 140rem; */
  padding-bottom: 4rem;
  overflow: hidden;
  background-color: #fff;
}
</style>