<template>
  <view class="wx-login-container">
    <view class="toggle-to-email" @click="$emit('toggleLogin', email)">
      <view class="toggle-to-email-text">{{ t("使用邮箱登录") }}</view>
    </view>
    <view class="wx-login-button" @tap="login">
      {{ t("微信一键登录按钮") }}
    </view>
    <view class="wx-register" @tap="navTo(RouteConfig.my.login.wxRegister.url)">
      {{ t("使用微信注册") }}
    </view>
  </view>
</template>

<script setup lang="ts">
import loginMethods from "@/models/loginMethods";
import { useI18n } from "vue-i18n";
import { ref, onMounted } from "vue";
import Api from "@/api/api";
import RouteConfig from "@/config/routes";

const { t } = useI18n();

const wxLogin = loginMethods.WX;
const email = loginMethods.Email;
const code = ref("");

const login = () => {
  Api.wxLogin(code.value).then((res: any) => {
    if (res.data.success === true) {
      emit("loginSuccess", res);
    } else {
      emit("loginFail", res);
      if (res.data.status === 404) {
        //这里判断是不是用户不存在
        navTo(RouteConfig.my.login.wxRegister.url);
      }
    }
  });
};

const navTo = (url: string) => {
  uni.navigateTo({
    url: url,
  });
};

onMounted(() => {
  uni.login({
    provider: "weixin",
    success: (res) => {
      console.log("微信登录成功" + JSON.stringify(res));
      uni.getUserInfo({
        provider: "weixin",
        success: (infoRes) => {
          console.log("获取用户信息成功" + JSON.stringify(infoRes));
          code.value = JSON.parse(JSON.stringify(res)).code;
        },
      });
    },
  });
});

const emit = defineEmits(["loginSuccess", "loginFail", "toggleLogin"]);
</script>

<style lang="scss">
.wx-login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  .toggle-to-email {
    margin-top: 20px;
    margin-bottom: 20px;
    .toggle-to-email-text {
      color: #999999;
      font-size: 14px;
    }
  }
  .wx-login-button {
    width: 100%;
    height: 50px;
    background-color: #00e923;
    border-radius: 5px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
  }
}
</style>
