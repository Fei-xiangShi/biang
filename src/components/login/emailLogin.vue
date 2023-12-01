<template>
  <navbar :title="t('emailLogin.邮箱登录')" />
  <view class="email-login-container">
    <img src="../../static/icons/logo.png" class="icon" />
    <view class="email-login-title">{{ $t("emailLogin.邮箱登录") }}</view>
    <view class="email-login-input-container">
      <view class="email-login-input-title">{{ $t("emailLogin.邮箱") }}</view>
      <input
        class="email-login-input"
        :placeholder="t('emailLogin.请输入邮箱')"
        type="text"
        v-model="email.content"
        @blur="checkEmail(email)"
      />
      <view class="email-login-input-warning">
        <view
          class="email-login-input-warning-text"
          v-if="email.valid === false"
        >
          {{ t(email.warning) }}
        </view>
      </view>
    </view>
    <view class="email-login-button-container">
      <view class="email-login-button" @tap="login">
        {{ $t("emailLogin.下一步") }}
      </view>
    </view>
    <view
      class="nav-to-register"
      @click="navTo(RouteConfig.my.login.emailRegister.url)"
    >
      <view class="nav-to-register-text">{{
        $t("emailLogin.没有账号？去注册")
      }}</view>
    </view>
    <view class="toggle-to-wx" @tap="emit('toggleLogin', wxLogin)">
      <view class="toggle-to-wx-text">{{ $t("emailLogin.使用微信登录") }}</view>
    </view>
    <view class="user-agreement">
      <view class="user-agreement-text">
        {{ $t("emailLogin.登录即代表同意") }}
        <text class="user-agreement-text-highlight">
          {{ $t("emailLogin.服务条款") }}
          <text class="and">{{ $t("emailLogin.和") }}</text>
          {{ $t("emailLogin.用户协议") }}
        </text>
        {{ $t("emailLogin.并使用邮箱登录") }}
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
import { checkEmail } from "@/utils/checker";
import { ErrorHandler, RequestErrorCode } from "@/utils/requestErrors";
import { InputContent } from "@/types/inputContent";

const { t } = useI18n();

const wxLogin = loginMethods.WX;
const email = ref<InputContent>(new InputContent());

const login = () => {
  checkEmail(email.value);
  if (!email.value.valid) return;
  Api.emailExists(email.value.content)
    .then((res: any) => {
      if (res.data.success === true) {
        navTo(
          `${RouteConfig.my.login.emailLoginPassword.url}?email=${email.value.content}`
        );
      } else {
        ErrorHandler(res);
      }
    })
    .catch((err: any) => {
      if (err.code === RequestErrorCode.EmailNotFoundError) {
        email.value.warning = t("emailLogin.邮箱不存在");
      } else {
        email.value.warning = t(err.message);
      }
      email.value.valid = false;
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
@/types/types @/types/InputContent
