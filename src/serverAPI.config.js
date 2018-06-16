const BASEURL = 'https://www.easy-mock.com/mock/5af43f2e5174243e26511194/SmileVue/';
const LOCALURL = 'http://127.0.0.1:3000/';
const URL = {
    getShoppingMallInfo : BASEURL+"index",//商城首页信息
    getGoodsInfo: BASEURL+'getGoodsInfo',
    registerUser: LOCALURL+'user/register'
}

module.exports = URL;