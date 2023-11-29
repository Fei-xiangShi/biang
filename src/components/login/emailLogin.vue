<template>
  <view class="email-login-container">
    <view class="toggle-to-wx" @click="$emit('toggleLogin', wxLogin)">
      <view class="toggle-to-wx-text">{{ t("使用微信登录") }}</view>
    </view>
    <view class="email-login-title">{{ t("邮箱登录") }}</view>
    <view class="email-login-input-container">
      <view class="email-login-input-title">{{ t("邮箱") }}</view>
      <input
        class="email-login-input"
        :placeholder="t('请输入邮箱')"
        type="text"
        v-model="emailID"
      />
    </view>
    <view class="email-login-input-container">
      <view class="email-login-input-title">{{ t("密码") }}</view>
      <input
        class="email-login-input"
        :placeholder="t('请输入密码')"
        type="password"
        v-model="password"
      />
    </view>
    <view class="email-login-button-container">
      <view class="email-login-button" @tap="EmailLogin()">{{
        t("登录")
      }}</view>
    </view>
    <view class="email-register" @tap="navTo(RouteConfig.my.url)">
      {{ t("使用邮箱注册") }}
    </view>
  </view>
</template>

<script setup lang="ts">
import loginMethods from "@/models/loginMethods";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import Api from "@/api/api";
import { defineEmits } from "vue";
import RouteConfig from "@/config/routes";

const { t } = useI18n();

const password = ref("");
const emailID = ref("");
const wxLogin = loginMethods.WX;
const email = loginMethods.Email;

const EmailLogin = () => {
  Api.emailLogin(emailID.value, password.value).then((res: any) => {
    if (res.success === "登录成功") {
      emit("loginSuccess");
    }
  });
};

const navTo = (url: string) => {
  uni.navigateTo({
    url: url,
  });
};

const emit = defineEmits(["loginSuccess", "loginFail", "toggleLogin"]);
</script>
