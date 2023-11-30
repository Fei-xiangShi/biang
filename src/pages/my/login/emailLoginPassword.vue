<template>
  <navbar :title="t('邮箱登录')" />
  <view class="email-login-container">
    <img src="../../static/icons/logo.png" class="icon" />
    <view class="email-login-title">{{ t("邮箱登录") }}</view>
    <view class="email-login-input-container">
      <view class="email-login-input-title">{{ t("密码") }}</view>
      <input
        class="email-login-input"
        :placeholder="t('请输入密码')"
        type="password"
        v-model="password"
      />
      <view class="password-wrong-warning-text" v-if="passwordWrong">
        {{ $t("密码错误提醒") }}
      </view>
    </view>
    <view class="email-login-button-container">
      <view class="email-login-button" @tap="EmailLogin()">
        {{ t("登录") }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import Api from "@/api/api";
import RouteConfig from "@/config/routes";
import universities from "@/config/universities";
import navbar from "@/components/navbar.vue";
import { ErrorHandler } from "@/utils/requestErrors";
const language: "zh-Hans" | "en" = uni.getStorageSync("lang");

const { t } = useI18n();

const password = ref("");
const passwordWrong = ref(false);

const EmailLogin = () => {
  Api.emailLogin(props.email, password.value)
    .then((res: any) => {
      if (res.statusCode === 200) {
        uni.setStorageSync("email", res.data.data.email);
        uni.setStorageSync("aueduSession", res.data.data.auedu_session);
        uni.setStorageSync("username", res.data.data.username);
        uni.setStorageSync("schoolId", res.data.data.university);
        uni.setStorageSync("classTableUrl", res.data.data.ics_url);
        uni.setStorageSync(
          "school",
          Object.keys(universities[language] as { [key: string]: string }).find(
            (key) =>
              (universities[language] as { [key: string]: string })[key] ===
              res.data.data.university
          )
        );
        uni.reLaunch({
          url: RouteConfig.my.url,
        });
      } else {
        ErrorHandler(res);
        passwordWrong.value = true;
      }
    })
    .catch((err: any) => {
      uni.showToast({
        title: err.message,
        icon: "none",
      });
    });
};

const props = defineProps({
  email: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.email-login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
  .icon {
    height: 70px;
    width: 70px;
    border-radius: 50%;
    margin-top: 5rem;
    background-size: contain;
  }
  .email-login-title {
    font-size: 24px;
    font-weight: bold;
    margin-top: 40px;
  }
  .email-login-input-container {
    width: 100%;
    margin-top: 40px;
    .email-login-input-title {
      font-size: 14px;
      color: #999;
    }
    .email-login-input {
      width: 100%;
      border-bottom: 1px solid #999;
      padding: 10px 0;
      font-size: 16px;
    }
    .password-wrong-warning-text {
      font-size: 14px;
      color: #f00;
      margin-top: 10px;
    }
  }
  .email-login-button-container {
    width: 100%;
    margin-top: 40px;
    .email-login-button {
      width: 100%;
      height: 40px;
      font-size: 16px;
      color: #fff;
      background-color: #000;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>