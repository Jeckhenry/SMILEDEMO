<template>
    <div>
        <van-nav-bar title="用户注册" left-text='返回' left-arrow @click-left="goBack()" />
        <div class="register-panel">
            <van-field v-model="UserName"  label='用户名'
            :error-message='usernameErrorMsg' icon='clear' placeholder='请输入用户名' required @click-icon="UserName=''"/>
            <van-field v-model="password" label='密码'
            :error-message='passwordErrorMsg' type='password' required placeholder='请输入密码' />
            <div class="register-btn">
                <van-button type='primary' size='large' @click="registerAction" :loading='openloading'>马上注册</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import url from "@/serverAPI.config.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      UserName: "",
      password: "",
      openloading: false, //是否开启用户注册的loading状态
      usernameErrorMsg: "", //当用户名出现错误的时候
      passwordErrorMsg: "" //当密码出现错误的时候
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    axiosRegisterUser() {
      this.openloading = true;
      axios({
        url: url.registerUser,
        method: "post",
        data: {
          UserName: this.UserName,
          password: this.password
        }
      })
        .then(response => {
          console.log("相应成功:", response);
          if (response.data.code == 200) {
            Toast.success("注册成功");
            this.$router.push("/");
          } else {
            console.log(response.data.msg);
            Toast.fail("注册失败");
            this.openloading = false;
          }
        })
        .catch(error => {
          console.log(error);
          Toast.fail("注册失败");
          this.openloading = false;
        });
    },
    checkForm() {
      let isOk = true;
      if (this.UserName.length < 5) {
        this.usernameErrorMsg = "用户名不能小于5位";
        isOk = false;
      } else {
        this.usernameErrorMsg = "";
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = "密码不能少于6位";
        isOk = false;
      } else {
        this.passwordErrorMsg = "";
      }
      return isOk;
    },
    registerAction() {
      this.checkForm() && this.axiosRegisterUser();
    }
  }
};
</script>

<style scoped>
.register-panel {
  width: 95%;
  margin: 0 auto;
  border-radius: 5px;
}
.register-btn {
  padding-top: 10px;
}
</style>