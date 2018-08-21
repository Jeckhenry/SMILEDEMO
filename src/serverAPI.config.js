const BASEURL = 'https://www.easy-mock.com/mock/5af43f2e5174243e26511194/SmileVue/';
const LOCALURL = 'http://127.0.0.1:3000/';
const URL = {
    getShoppingMallInfo : BASEURL+"index",//商城首页信息
    getGoodsInfo: BASEURL+'getGoodsInfo',
    registerUser: LOCALURL+'user/register',
    loginUser: LOCALURL+'user/login',
    getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo',//获取商品详情
    getCategoryList: LOCALURL + 'goods/getCategory', //获取商品大类
    getCategorySubList:LOCALURL+'goods/getCategorySubList',   //得到小类信息
    getGoodsListByCategorySubID: LOCALURL+'goods/getGoodsListbyCategorySubId', //得到小类商品信息
}

module.exports = URL;