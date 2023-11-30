<template>
  <navbar />
  <view class="login-container">
    <view class="wx-login" v-if="login === wxLogin">
      <WxLogin
        @login-success="loginSuccess"
        @login-fail="loginFail"
        @toggleLogin="toggleLogin"
      />
    </view>
    <view class="email-login" v-else-if="login === emailLogin">
      <EmailLogin
        @login-success="loginSuccess"
        @login-fail="loginFail"
        @toggleLogin="toggleLogin"
      />
    </view>
  </view>
  <view
    class="nav-to-register"
    @click="navTo(RouteConfig.my.login.emailRegister.url)"
  >
    <view class="nav-to-register-text">{{ $t("没有账号？去注册") }}</view>
  </view>
  <view class="wx-register" @click="navTo(RouteConfig.my.login.wxRegister.url)">
    <view class="wx-register-text">{{ $t("微信一键注册") }}</view>
  </view>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import navbar from "@/components/navbar.vue";
import RouteConfig from "@/config/routes";
import EmailLogin from "@/components/login/emailLogin.vue";
import WxLogin from "@/components/login/wxLogin.vue";
import loginMethods from "@/models/loginMethods";
import universities from "@/config/universities";
const language: "zh-Hans" | "en" = uni.getStorageSync("lang");

const { t } = useI18n();

const wxLogin = loginMethods.WX;
const emailLogin = loginMethods.Email;

const login = ref(wxLogin);

const loginSuccess = (res: any) => {
  uni.setStorageSync("aueduSession", res.data.data.auedu_session);
  uni.setStorageSync("username", res.data.data.username);
  uni.setStorageSync("schoolId", res.data.data.school);
  uni.setStorageSync(
  "schoolName",
  Object.keys((universities[language] as { [key: string]: string })).find(key => (universities[language] as { [key: string]: string })[key] === res.data.data.school)
);
  uni.showToast({
    title: t("登陆成功"),
    icon: "success",
    duration: 2000,
  });
  uni.reLaunch({
    url: RouteConfig.my.url,
  });
};

const loginFail = (res: any) => {
  if (res.status === 404) {
    uni.showToast({
      title: t("微信登录失败，请先注册"),
      icon: "none",
      duration: 2000,
    });
    navTo(RouteConfig.my.login.wxRegister.url);
  } else {
    uni.showToast({
      title: t("微信登录失败，请重试"),
      icon: "none",
      duration: 2000,
    });
  }
};

const toggleLogin = (method: loginMethods) => {
  login.value = method;
};

const navTo = (url: string) => {
  uni.navigateTo({
    url,
  });
};
</script>
