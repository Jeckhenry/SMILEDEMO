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
       
    </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "shoppingmall",
      locationIcon: require("../../assets/images/location.png")
    };
  }
};
</script>

<style scoped>
.search-bar {
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
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
  padding-top: 0.4rem;
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
</style>