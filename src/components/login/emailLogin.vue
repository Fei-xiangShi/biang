<template>
  <view class="email-login-container">
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
    <view class="email-login-button-container">
      <view class="email-login-button" @tap="emailExists">{{
        t("下一步")
      }}</view>
    </view>
    <view class="toggle-to-wx" @tap="$emit('toggleLogin', wxLogin)">
      <view class="toggle-to-wx-text">{{ t("使用微信登录") }}</view>
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


const emailExists = () => {
  Api.emailExists(emailID.value).then((res: any) => {
    if (res.data.success === true) {
      console.log("验证成功");
      navTo(RouteConfig.my.login.emailLoginPassword.url)
    } else {
      emit("loginFail", res.error);
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
