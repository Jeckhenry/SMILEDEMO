import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import ShoppingMall from '@/components/pages/ShoppingMall'
import register from '@/components/pages/register'
import Login from '@/components/pages/login'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'
import cart from '@/components/pages/cart'
import Main from '@/components/pages/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', name: 'Main', component: Main,
      children: [{ path: '/', name: 'ShoppingMall', component: ShoppingMall },
      { path: '/CategoryList', name: "CategoryList", component: CategoryList },
      { path: '/cart', name: "cart", component: cart }]
    },


    { path: "/register", name: "register", component: register },
    { path: '/Login', name: 'Login', component: Login },
    { path: '/Goods', name: "Goods", component: Goods },
  ]
})
