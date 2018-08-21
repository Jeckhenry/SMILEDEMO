<template>
    <div>
        <div class="nav-bar">
            <van-nav-bar title="购物车" />
        </div>
        <div class="cart-title">
            <van-button  size='small' type='danger' plain @click="clearCart">清空购物车</van-button>
        </div>
        <div class="cart-list">
            <div class="pang-row" v-for="(item,index) in cartInfo" :key="index">
                <div class="pang-img"><img :src="item.image" alt="" width="100%"></div>
                <div class="pang-text">
                    <div class="pang-goods-name">{{item.name}}</div>
                    <div class="pang-control">
                        <van-stepper v-model="item.count" />
                    </div>
                </div>
                <div class="pang-goods-price">￥{{item.price*item.count | moneyFilter}}</div>
            </div>
        </div>
        
        <!--显示总金额-->
        <div class="totalMoney">
            商品总价：￥ {{totalMoney | moneyFilter}}
        </div>

    </div>
</template>

<script>
import { tomoney } from "@/filter/moneyfilter";
export default {
  data() {
    return {
      cartInfo: [], //购物车商品信息
      isEmpty: false //购物车是否为空
    };
  },
  computed: {
    totalMoney() {
      let allMoney = 0;
      this.cartInfo.forEach((item, index) => {
        allMoney += item.price * item.count;
      });
      localStorage.cartInfo = JSON.stringify(this.cartInfo);
      return allMoney;
    }
  },
  created() {
    this.getCartInfo();
  },
  filters: {
    moneyFilter(money) {
      return tomoney(money);
    }
  },
  methods: {
    //得到购物车相关信息
    getCartInfo() {
      if (localStorage.cartInfo) {
        this.cartInfo = JSON.parse(localStorage.cartInfo);
      }
      this.isEmpty = this.cartInfo.length > 0 ? true : false;
    },
    //清空购物车
    clearCart() {
      localStorage.removeItem("cartInfo");
      this.cartInfo = [];
    }
  }
};
</script>

<style scoped>
.card-title {
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  text-align: right;
}
.cart-list {
  background-color: #fff;
}
.pang-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0.5rem;
  font-size: 0.85rem;
  border-bottom: 1px solid #e4e7ed;
}
.pang-img {
  flex: 6;
}
.pang-text {
  flex: 14;
  padding-left: 10px;
}
.pang-control {
  padding-top: 10px;
}
.pang-goods-price {
  flex: 4;
  text-align: right;
}
.totalMoney {
  text-align: right;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  padding-bottom: 5rem;
}
</style>