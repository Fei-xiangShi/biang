<template>
  <navbar :title="t('邮箱登录')" />
  <view class="email-login-container">
    <img src="../../static/icons/logo.png" class="icon" />
    <view class="email-login-title">{{ t("邮箱登录") }}</view>
    <view class="email-login-input-container">
      <view class="email-login-input-title">{{ t("邮箱") }}</view>
      <input
        class="email-login-input"
        :placeholder="t('请输入邮箱')"
        type="text"
        v-model="email"
        @blur="Checker.checkEmail(email)"
      />
      <view class="email-login-input-warning">
        <view
          class="email-login-input-warning-text"
          v-if="emailValid === false || emailExists === false"
        >
          {{ t(emailWarning) }}
        </view>
      </view>
    </view>
    <view class="email-login-button-container">
      <view class="email-login-button" @tap="login">
        {{ t("下一步") }}
      </view>
    </view>
    <view
      class="nav-to-register"
      @click="navTo(RouteConfig.my.login.emailRegister.url)"
    >
      <view class="nav-to-register-text">{{ $t("没有账号？去注册") }}</view>
    </view>
    <view class="toggle-to-wx" @tap="emit('toggleLogin', wxLogin)">
      <view class="toggle-to-wx-text">{{ t("使用微信登录") }}</view>
    </view>
    <view class="user-agreement">
      <view class="user-agreement-text">
        {{ $t("登录即代表同意") }}
        <text class="user-agreement-text-highlight">
          {{ $t("服务条款") }}
          <text class="and">{{ $t("和") }}</text>
          {{ $t("用户协议") }}
        </text>
        {{ $t("并使用邮箱登录") }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import loginMethods from "@/models/loginMethods";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import Api from "@/api/api";
import RouteConfig from "@/config/routes";
import navbar from "@/components/navbar.vue";
import Checker from "@/utils/checker";

const { t } = useI18n();

const email = ref("");
const wxLogin = loginMethods.WX;
const emailValid = ref(true);
const emailExists = ref(true);
const emailWarning = ref("");

const login = () => {
  if (!Checker.checkEmail(email.value)) {
    emailValid.value = false;
    emailWarning.value = "邮箱格式错误";
    return;
  }
  Api.emailExists(email.value).then((res: any) => {
    if (res.data.success === true) {
      navTo(
        `${RouteConfig.my.login.emailLoginPassword.url}?email=${email.value}`
      );
    } else {
      emailExists.value = false;
      emailWarning.value = "邮箱不存在";
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
    .email-login-input-warning {
      width: 100%;
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .email-login-input-warning-text {
        font-size: 12px;
        color: #ff0000;
      }
    }
  }
  .email-login-button-container {
    width: 100%;
    margin-top: 40px;
    .email-login-button {
      width: 100%;
      height: 40px;
      font-size: 14px;
      color: #fff;
      background-color: #007aff;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .nav-to-register {
    width: 100%;
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    .nav-to-register-text {
      font-size: 14px;
      color: #999;
    }
  }
  .toggle-to-wx {
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    .toggle-to-wx-text {
      font-size: 14px;
      color: #007aff;
    }
  }
  .nav-to-register {
    width: 100%;
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    .nav-to-register-text {
      font-size: 14px;
      color: #999;
    }
  }
  .user-agreement {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 50px;
    .user-agreement-text {
      font-size: 12px;
      color: #999;
      text-align: center;
      .user-agreement-text-highlight {
        color: #007aff;
        .and {
          color: #999;
        }
      }
    }
  }
}
</style>
