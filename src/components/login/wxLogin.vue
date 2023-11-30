<template>
  <navbar :title="t('一键登录')" />
  <view class="wx-login-container">
    <img src="../../static/icons/logo.png" class="icon" />
    <view class="wx-login-title">{{ $t("微信登录标题") }}</view>
    <view class="wx-login-content">{{ $t("微信登录提示") }}</view>
    <view class="wx-login-button" @tap="login">
      {{ t("微信一键登录按钮") }}
    </view>
    <view class="toggle-to-email" @tap="emit('toggleLogin', email)">
      <view class="toggle-to-email-text">{{ t("使用邮箱登录") }}</view>
    </view>
    <view class="user-agreement">
      <view class="user-agreement-text">
        {{ $t("登录即代表同意") }}
        <text class="user-agreement-text-highlight">
          {{ $t("服务条款") }}
          <text class="and">{{ $t("和") }}</text>
          {{ $t("用户协议") }}
        </text>
        {{ $t("并使用微信登录") }}
      </view>
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
import { ErrorHandler, RequestErrorCode } from "@/utils/requestErrors";

const language: "zh-Hans" | "en" = uni.getStorageSync("lang");

const { t } = useI18n();

const email = loginMethods.Email;
const code = ref("");

const login = () => {
  if (!code.value || code.value.length == 0) return;
  Api.wxLogin(code.value)
    .then((res: any) => {
      if (res.data.success === true) {
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
      }
    })
    .catch((err) => {
      if (err.code === RequestErrorCode.UserNotFoundError) {
        navTo(RouteConfig.my.login.wxRegister.url);
      } else {
        uni.showToast({
          title: t(err.message),
          icon: "none",
        });
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
        success: () => {
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
