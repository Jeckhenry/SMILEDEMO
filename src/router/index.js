import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import register from '@/components/pages/register'
import Login from '@/components/pages/login'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'ShoppingMall', component: ShoppingMall },
    { path: "/register", name: "register", component: register },
    { path: '/Login', name: 'Login', component: Login },
  ]
})
