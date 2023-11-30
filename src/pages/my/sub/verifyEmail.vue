<template>
  <view class="container">
    <navbar />
    <view class="verifyEmail">
      <view class="notice">
        <text class="notice-text">{{ $t("请输入邮箱提示") }}</text>
      </view>
      <view class="title">
        <text class="title-text">{{ $t("验证您的身份") }}</text>
      </view>
      <view class="email-input">
        <u-input v-model="email" clearable />
      </view>
      <view class="warning" v-if="warning">
        <text class="warning-text">{{ $t("邮箱格式错误提示") }}</text>
      </view>
      <view class="tab-notice">
        <text class="tab-notice-text">{{ $t("邮箱验证详细信息") }}</text>
      </view>
      <view class="confirm-button">
        <view class="button-text" @tap="confirm">{{ $t("确认") }}</view>
      </view>
      <view class="bottom">
        <text class="bottom-text">{{ $t("邮箱验证底部提示") }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Api from "@/api/api";
import navbar from "@/components/navbar.vue";
import RouteConfig from "@/config/routes";
import { ErrorHandler } from "@/utils/requestErrors";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const email = ref("");
const warning = ref(false);
const loading = ref(false);

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

const confirm = () => {
  if (loading.value) return;
  loading.value = true;
  if (!validateEmail(email.value)) {
    warning.value = true;
    return;
  }
  Api.sendEmail(
    email.value,
    uni.getStorageSync("aueduSession"),
    uni.getStorageSync("lang")
  )
    .then((res: any) => {
      if (res.statusCode === 200) {
        uni.navigateTo({
          url: `${RouteConfig.my.verifyCode.url}?email=${email.value}&redirectTo=${RouteConfig.my.url}`,
        });
      } else {
        ErrorHandler(res);
      }
    })
    .catch((err: any) => {
      uni.showToast({
        title: t(err.message),
        icon: "none",
      });
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  background: rgb(243, 147, 147);
}

.verifyEmail {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 40%;
  padding: 5%;
  background: white;
  .title {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    .title-text {
      font-size: 20px;
      font-weight: bold;
    }
  }
  .notice {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    .notice-text {
      font-size: 15px;
      color: #666;
    }
  }
  .email-input {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
  }
  .warning {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    .warning-text {
      font-size: 15px;
      color: rgb(255, 16, 68);
    }
  }
  .tab-notice {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    margin-top: 1rem;
    .tab-notice-text {
      font-size: 15px;
      color: rgb(16, 163, 255);
    }
  }
  .confirm-button {
    width: 80px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    float: right;
    background: rgb(177, 177, 177);
  }
  .bottom {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    margin-top: 1rem;
    .bottom-text {
      font-size: 15px;
      color: #666;
    }
  }
}
</style>
