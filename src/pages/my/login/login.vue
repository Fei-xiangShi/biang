<template>
  <navbar />
  <view class="login-container">
    <view class="wx-login" v-if="login===wxLogin">
      <WxLogin
      @login-success="loginSuccess"
      @login-fail="loginFail"
      @toggleLogin="toggleLogin"
      />
    </view>
    <view class="email-login" v-else-if="login===emailLogin">
      <EmailLogin
      @login-success="loginSuccess"
      @login-fail="loginFail"
      @toggleLogin="toggleLogin"
      />
    </view>
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

const { t } = useI18n();

const wxLogin = loginMethods.WX;
const emailLogin = loginMethods.Email;

const login = ref(wxLogin);

const loginSuccess = () => {
  uni.showToast({
    title: t("登陆成功"),
    icon: "success",
    duration: 2000,
  });
  uni.switchTab({
    url: RouteConfig.my.url,
  });
};

const loginFail = () => {
  uni.showToast({
    title: t("登陆失败"),
    icon: "none",
    duration: 2000,
  });
};

const toggleLogin = (method: loginMethods) => {
  login.value = method;
};

</script>

