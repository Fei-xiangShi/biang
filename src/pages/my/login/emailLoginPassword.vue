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
const language: "zh-Hans" | "en" = uni.getStorageSync("lang");

const { t } = useI18n();

const password = ref("");

const EmailLogin = () => {
  Api.emailLogin(props.email, password.value).then((res: any) => {
    if (res.data.success === true) {
      uni.setStorageSync("email", res.data.data.email)
      uni.setStorageSync("aueduSession", res.data.data.auedu_session);
      uni.setStorageSync("username", res.data.data.username);
      uni.setStorageSync("schoolId", String(res.data.data.university));
      uni.setStorageSync("classTableUrl", res.data.data.ics_url);
      uni.setStorageSync(
        "school",
        Object.keys(universities[language] as { [key: string]: string }).find(
          (key) =>
            (universities[language] as { [key: string]: string })[key] ===
            String(res.data.data.university)
        )
      );
      uni.reLaunch({
        url: RouteConfig.my.url,
      });
    }
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
