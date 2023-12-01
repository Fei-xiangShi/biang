<template>
  <view class="container">
    <navbar />
    <view class="verifyEmail">
      <view class="notice">
        <text class="notice-text">{{ $t("verifyEmail.请输入邮箱提示") }}</text>
      </view>
      <view class="title">
        <text class="title-text">{{ $t("verifyEmail.验证您的身份") }}</text>
      </view>
      <view class="email-input">
        <u-input v-model="email.content" clearable @blur="checkEmail(email)" />
      </view>
      <view class="email.value.warning" v-if="email.warning">
        <text class="email.value.warning-text">{{
          $t("verifyEmail.邮箱格式错误提示")
        }}</text>
      </view>
      <view class="tab-notice">
        <text class="tab-notice-text">{{
          $t("verifyEmail.邮箱验证详细信息")
        }}</text>
      </view>
      <view class="confirm-button">
        <view class="button-text" @tap="confirm">{{
          $t("verifyEmail.确认")
        }}</view>
      </view>
      <view class="bottom">
        <text class="bottom-text">{{
          $t("verifyEmail.邮箱验证底部提示")
        }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Api from "@/api/api";
import navbar from "@/components/navbar.vue";
import RouteConfig from "@/config/routes";
import { ErrorHandler, RequestErrorCode } from "@/utils/requestErrors";
import { useI18n } from "vue-i18n";
import { InputContent } from "@/types/inputContent";
import { checkEmail } from "@/utils/checker";

const { t } = useI18n();

const email = ref<InputContent>(new InputContent());
const loading = ref<boolean>(false);

const confirm = () => {
  if (loading.value) return;
  loading.value = true;
  checkEmail(email.value);
  if (!email.value.valid) return;
  Api.sendEmail(
    email.value.content,
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
  .email.value.warning {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    .email.value.warning-text {
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
@/types/InputContent
