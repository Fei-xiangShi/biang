<template>
  <navbar />
  <view class="email-login-container">
    <view class="email-login-title">{{ t("邮箱登录") }}</view>
    <view class="email-login-input-container">
      <view class="email-login-input-container">
        <view class="email-login-input-title">{{ t("密码") }}</view>
        <input
          class="email-login-input"
          :placeholder="t('请输入密码')"
          type="password"
          v-model="password"
        />
      </view>
    </view>
    <view class="email-login-button-container">
      <view class="email-login-button" @tap="EmailLogin()">{{
        t("登录")
      }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref, onMounted } from "vue";
import Api from "@/api/api";
import RouteConfig from "@/config/routes";
import universities from "@/config/universities";
import navbar from "@/components/navbar.vue";
const language: "zh-Hans" | "en" = uni.getStorageSync("lang");

const { t } = useI18n();

const password = ref("");
const emailID = ref("");

const EmailLogin = () => {
  emailID.value = uni.getStorageSync("email");
  Api.emailLogin(emailID.value, password.value).then((res: any) => {
    if (res.data.success === true) {
      console.log("登录成功");
      uni.setStorageSync("aueduSession", res.data.data.auedu_session);
      uni.setStorageSync("username", res.data.data.username);
      uni.setStorageSync("schoolId", res.data.data.school);
      uni.setStorageSync(
        "schoolName",
        Object.keys(universities[language] as { [key: string]: string }).find(
          (key) =>
            (universities[language] as { [key: string]: string })[key] ===
            res.data.data.school
        )
      );
      uni.showToast({
        title: t("登陆成功"),
        icon: "success",
        duration: 2000,
      });
      uni.reLaunch({
        url: RouteConfig.my.url,
      });
    } else {
    }
  });
};


</script>
