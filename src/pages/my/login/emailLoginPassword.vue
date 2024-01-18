<template>
  <navbar :title="t('emailLoginPassword.邮箱登录')" />
  <view class="email-login-container">
    <img src="../../static/icons/logo.png" class="icon" />
    <view class="email-login-title">
      {{ $t("emailLoginPassword.邮箱登录") }}
    </view>
    <view class="email-login-input-container">
      <view class="email-login-input-title">
        {{ $t("emailLoginPassword.密码") }}
      </view>
      <input
        class="email-login-input"
        :placeholder="t('emailLoginPassword.请输入密码')"
        type="password"
        v-model="password"
      />
      <view class="password-wrong-warning-text" v-if="passwordWrong">
        {{ $t("emailLoginPassword.密码错误提醒") }}
      </view>
    </view>
    <view class="email-login-button-container">
      <view class="email-login-button" @tap="login()">
        {{ $t("emailLoginPassword.登录") }}
      </view>
    </view>
  </view>
  <u-overlay :show="loggingin">
    <view class="overlay-container">
      <view class="login-notice" @tap.stop>
        <u-loading-icon mode="circle" />
        <view class="login-notice-text">
          {{ $t("emailLoginPassword.登录中") }}
        </view>
      </view>
    </view>
  </u-overlay>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import Api from "@/api/api";
import RouteConfig from "@/config/routes";
import navbar from "@/components/navbar.vue";
import { ErrorHandler } from "@/utils/requestErrors";
import { userInitFromRequest } from "@/utils/userManager";

const { t } = useI18n();

const password = ref("");
const passwordWrong = ref(false);
const loggingin = ref(false);

const login = () => {
  if (password.value === "") {
    uni.showToast({
      title: t("emailLoginPassword.请输入密码"),
      icon: "none",
    });
    return;
  }
  if (loggingin.value) {
    return;
  }
  loggingin.value = true;
  Api.emailLogin(props.email, password.value)
    .then((res: any) => {
      if (res.statusCode === 200) {
        userInitFromRequest(res);
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
        title: t(err.message),
        icon: "none",
      });
    })
    .finally(() => {
      loggingin.value = false;
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

.overlay-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  .login-notice {
    width: 50%;
    height: 10%;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    .login-notice-text {
      margin-left: 10px;
      font-size: 16px;
      color: #000;
    }
  }
}
</style>
