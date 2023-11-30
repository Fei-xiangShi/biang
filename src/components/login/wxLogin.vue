<template>
  <navbar :title="t('一键登录')" />
  <view class="wx-login-container">
    <view class="icon"></view>
    <view class="wx-login-title">{{ $t("微信登录标题") }}</view>
    <view class="wx-login-content">{{ $t("微信登录提示") }}</view>
    <view class="wx-login-button" @tap="login">
      {{ t("微信一键登录按钮") }}
    </view>
    <view class="toggle-to-email" @tap="emit('toggleLogin', email)">
      <view class="toggle-to-email-text">{{ t("使用邮箱登录") }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar.vue";
import loginMethods from "@/models/loginMethods";
import { useI18n } from "vue-i18n";
import { ref, onMounted } from "vue";
import Api from "@/api/api";
import RouteConfig from "@/config/routes";
import universities from "@/config/universities";
const language: "zh-Hans" | "en" = uni.getStorageSync("lang");

const { t } = useI18n();

const email = loginMethods.Email;
const code = ref("");

const login = () => {
  Api.wxLogin(code.value).then((res: any) => {
    if (res.data.success === true) {
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
      if (res.statusCode === 400 && res.data.errors[0].code === "blank") {
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
      uni.getUserInfo({
        provider: "weixin",
        success: (infoRes) => {
          code.value = res.code;
        },
      });
    },
  });
});

const emit = defineEmits(["toggleLogin"]);
</script>

<style lang="scss" scoped>
.wx-login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 2rem;
  .icon {
    height: 70px;
    width: 70px;
    border-radius: 50%;
    margin-top: 5rem;
    // background: url("/static/images/login/wxLogin.png") no-repeat center;
    background-size: contain;
  }
  .wx-login-title {
    font-size: 24px;
    font-weight: bold;
    margin-top: 40px;
  }
  .wx-login-content {
    font-size: 14px;
    color: #999;
  }
  .wx-login-button {
    width: 100%;
    height: 40px;
    font-size: 14px;
    color: #fff;
    background-color: #007aff;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
  }
  .toggle-to-email {
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    .toggle-to-email-text {
      font-size: 14px;
      color: #007aff;
    }
  }
}
</style>
