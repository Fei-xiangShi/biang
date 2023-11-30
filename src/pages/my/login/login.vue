<template>
  <view class="login-container">
    <view class="wx-login" v-if="login === wxLogin">
      <WxLogin @toggleLogin="toggleLogin" />
    </view>
    <view class="email-login" v-else-if="login === emailLogin">
      <EmailLogin @toggleLogin="toggleLogin" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import RouteConfig from "@/config/routes";
import EmailLogin from "@/components/login/emailLogin.vue";
import WxLogin from "@/components/login/wxLogin.vue";
import loginMethods from "@/models/loginMethods";

const { t } = useI18n();

const wxLogin = loginMethods.WX;
const emailLogin = loginMethods.Email;

const login = ref(wxLogin);

const toggleLogin = (method: loginMethods) => {
  login.value = method;
};

const navTo = (url: string) => {
  uni.navigateTo({
    url,
  });
};
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
}
</style>
