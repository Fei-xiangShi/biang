<template>
  <navbar />
  <view class="login-container">
    <view class="email-login" v-if="!wxLogin">
      <view class="icon"></view>
      <view class="title-text">{{ $t("登录") }}</view>
      <view class="sub-title-text">{{ $t("登录副标题提示") }}</view>
      <view class="school-select-input">
        <u-input
          v-model="email"
          :placeholder="t('邮箱输入框占位符')"
        />
      </view>
      <view class="next">
        <view
          class="create-account"
          @tap="navTo(RouteConfig.my.login.register.url)"
          >{{ $t("创建账号") }}</view
        >
        <view class="next-step">
          <view
            class="next-step-text"
            @tap="navTo(RouteConfig.my.login.welcome.url)"
            >{{ $t("下一步") }}</view
          >
        </view>
      </view>
      <view class="wx-login">
        <view class="wx-login-text" @tap="onWxLogin">{{
          $t("微信一键登录")
        }}</view>
      </view>
    </view>
    <view class="wx-login-container" v-if="wxLogin">
      <view class="wx-login-title">{{ $t("微信登录") }}</view>
      <view class="wx-login-sub-title">{{ $t("微信登录副标题") }}</view>
      <view class="wx-login-btn">
        <view class="wx-login-btn-text">{{ $t("微信登录按钮") }}</view>
      </view>
      <view class="wx-login-cancel" @tap="wxLogin = false">
        {{ $t("微信登录取消") }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import navbar from "@/components/navbar.vue";
import RouteConfig from "@/config/routes";

const { t } = useI18n();

const email = ref("");
const wxLogin = ref(false);

const navTo = (url: any) => {
  uni.navigateTo({
    url: url,
  });
};

const onWxLogin = () => {
  wxLogin.value = true;
};

const checkWxStatus = () => {};
</script>

<style lang="scss">
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 50px;
  .email-login {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      width: 100px;
      height: 100px;
      background-color: #f5f5f5;
      border-radius: 50%;
    }
    .title-text {
      font-size: 24px;
      font-weight: bold;
      margin-top: 20px;
    }
    .sub-title-text {
      font-size: 14px;
      color: #999;
      margin-top: 10px;
    }
    .school-select-input {
      width: 100%;
      margin-top: 40px;
      u-form {
        width: 100%;
        u-form-item {
          width: 100%;
          u-input {
            width: 100%;
            height: 40px;
            font-size: 14px;
            color: #333;
            background-color: #f5f5f5;
            border-radius: 20px;
            padding: 0 20px;
            margin-top: 10px;
          }
        }
      }
    }
    .next {
      width: 100%;
      margin-top: 40px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .create-account {
        font-size: 14px;
        color: #999999;
      }
      .next-step {
        width: 80px;
        height: 40px;
        background-color: #f5f5f5;
        border-radius: 20px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .next-step-text {
          font-size: 14px;
          color: #333;
        }
      }
    }
    .wx-login {
      width: 100%;
      margin-top: 40px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .wx-login-text {
        font-size: 14px;
        color: #999999;
      }
    }
  }
}
</style>
