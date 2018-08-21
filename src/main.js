// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import Vant from 'vant'//全局引入vant
// import 'vant/lib/vant-css/index.css'
// import VueAweSome from 'vue-awesome-swiper'//全局引入
// import 'swiper/dist/css/swiper.css'
// Vue.use(Vant)
// Vue.use(VueAweSome)
import {Button,Row,Col,Swipe,SwipeItem, Lazyload, List, Field, NavBar,Tab,Tabs,PullRefresh, Stepper, Tabbar, TabbarItem} from 'vant'

Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Field).use(NavBar).use(Tab).use(Tabs).use(PullRefresh).use(Stepper).use(Tabbar).use(TabbarItem);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
