<template>
  <view class="container">
    <navbar />
    <view class="verifyCode" :style="{ display: success ? 'none' : '' }">
      <view class="notice">
        <text class="notice-text">{{ $t("请输入验证码提示") }}</text>
      </view>
      <view class="title">
        <text class="title-text">{{ $t("输入验证码提示") }}</text>
      </view>
      <view class="code-inputs">
        <u-code-input :focus="true" :bold="true" />
      </view>
      <view class="warning" v-if="warning">
        <text class="warning-text">{{ $t("验证码错误") }}</text>
      </view>
      <view class="tab-notice">
        <text class="tab-notice-text">{{ $t("遇到问题") }}</text>
      </view>
      <view
        class="resend-button"
        :class="[timeleft < 0 ? 'available' : '']"
        @tap="resendEmail"
      >
        <view class="number" v-if="timeleft > -1">
          <u-count-down
            :time="60 * 1000"
            format="ss"
            autoStart
            @change="timeChange"
          />
          <view class="s">s</view>
        </view>
        <view class="resend-text">{{ $t("重新发送") }}</view>
      </view>
      <view class="confirm-button">
        <view class="button-text" @tap="confirm">{{ $t("验证") }}</view>
      </view>
      <view class="bottom">
        <text class="bottom-text">{{ $t("验证码底部提示") }}</text>
      </view>
    </view>
    <view class="successPage" :style="{ display: success ? '' : 'none' }">
      <view class="successPage-title">
        <text class="successPage-title-text">{{ $t("验证成功") }}</text>
      </view>
      <view class="successPage-notice">
        <view class="icon" :class="{ 'choose-icon-animation': animeShow }">
          <u-icon
            :name="animeShow ? 'checkmark-circle' : ''"
            size="30"
            color="#606266"
          />
        </view>
        <text :class="['successPage-notice-text', 'textFadeInRight']">{{
          $t("验证成功提示")
        }}</text>
      </view>
      <view class="successPage-button">
        <view class="successPage-button-text" @tap="goToMy">{{
          $t("返回")
        }}</view>
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

const first = ref("");
const second = ref("");
const third = ref("");
const fourth = ref("");
const fifth = ref("");
const sixth = ref("");
const firstInputFocus = ref(true);
const secondInputFocus = ref(false);
const thirdInputFocus = ref(false);
const fourthInputFocus = ref(false);
const fifthInputFocus = ref(false);
const sixthInputFocus = ref(false);
const warning = ref(false);
const disabled = ref(false);
const timeleft = ref(60);
const success = ref(false);
const animeShow = ref(false);

const timeChange = () => {
  timeleft.value -= 1;
};

const resendEmail = () => {
  if (timeleft.value > -1) return;
  Api.sendEmail(
    uni.getStorageSync("email"),
    uni.getStorageSync("aueduSession"),
    uni.getStorageSync("lang")
  )
    .then((res: any) => {
      if (res.data.success === true) {
        timeleft.value = 60;
      } else {
        ErrorHandler(res);
      }
    })
    .catch((err: any) => {
      uni.showToast({
        title: err.message,
        icon: "none",
      });
    });
  timeleft.value = 60;
};

const confirm = () => {
  disabled.value = true;
  Api.verifyEmail(
    uni.getStorageSync("aueduSession"),
    first.value +
      second.value +
      third.value +
      fourth.value +
      fifth.value +
      sixth.value
  ).then((res: any) => {
    if (res.statusCode === 200) {
      success.value = true;
      uni.setStorageSync("emailVerified", true);
      setTimeout(() => {
        animeShow.value = true;
      }, 100);
    } else {
      warning.value = true;
    }
    disabled.value = false;
  });
};

const goToMy = () => {
  uni.reLaunch({
    url: RouteConfig.my.url,
  });
};

const firstChange = () => {
  if (first.value.length === 1) {
    secondInputFocus.value = true;
    firstInputFocus.value = false;
  }
  if (first.value.length === 0) {
    firstInputFocus.value = true;
    secondInputFocus.value = false;
  }
};

const secondChange = () => {
  if (second.value.length === 1) {
    thirdInputFocus.value = true;
    secondInputFocus.value = false;
  }
  if (second.value.length === 0) {
    firstInputFocus.value = true;
    secondInputFocus.value = false;
  }
};

const thirdChange = () => {
  if (third.value.length === 1) {
    fourthInputFocus.value = true;
    thirdInputFocus.value = false;
  }
  if (third.value.length === 0) {
    secondInputFocus.value = true;
    thirdInputFocus.value = false;
  }
};

const forthChange = () => {
  if (fourth.value.length === 1) {
    fifthInputFocus.value = true;
    fourthInputFocus.value = false;
  }
  if (fourth.value.length === 0) {
    thirdInputFocus.value = true;
    fourthInputFocus.value = false;
  }
};

const fifthChange = () => {
  if (fifth.value.length === 1) {
    sixthInputFocus.value = true;
    fifthInputFocus.value = false;
  }
  if (fifth.value.length === 0) {
    fourthInputFocus.value = true;
    fifthInputFocus.value = false;
  }
};

const sixChange = () => {
  if (sixth.value.length === 1) {
    sixthInputFocus.value = false;
    confirm();
  }
  if (sixth.value.length === 0) {
    fifthInputFocus.value = true;
    sixthInputFocus.value = false;
  }
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

.verifyCode {
  transition: all 0.5s;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 50%;
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
  .code-inputs {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .code-input {
      width: 15%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      u-input {
        width: 100%;
        height: 100%;
        text-align: center;
      }
    }
  }

  .warning {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    margin-top: 1rem;
    .warning-text {
      font-size: 15px;
      color: rgb(255, 16, 68);
    }
  }

  .tab-notice {
    margin-top: 0.5rem;
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    .tab-notice-text {
      font-size: 15px;
      color: rgb(16, 163, 255);
    }
  }

  .resend-button {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    float: left;
    background: rgba(177, 177, 177, 0.556);
    transition: all 0.3s;
    padding: 0 10px;
    .number {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .s {
        margin-right: 0.5rem;
      }
    }
  }

  .available {
    background: rgb(16, 153, 255);
    color: white;
  }

  .confirm-button {
    width: 80px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    float: right;
    background: rgb(16, 153, 255);
    color: white;
  }
  .bottom {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 6rem;
    .bottom-text {
      font-size: 15px;
      color: #666;
    }
  }
}

.successPage {
  transition: all 0.5s;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 30%;
  padding: 5%;
  background: white;
  .successPage-title {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    .successPage-title-text {
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
  .successPage-notice {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    .successPage-notice-text {
      font-size: 15px;
      color: #666;
    }
  }
  .successPage-button {
    width: 80px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    float: right;
    background: rgb(16, 153, 255);
    color: white;
  }
}

.choose-icon-animation {
  animation: scaleAnimation 0.8s cubic-bezier(0.2, -0.2, 0.27, 1.55) forwards;
}

@keyframes scaleAnimation {
  from {
    transform: rotate(0deg) scale(0.5);
  }
  to {
    transform: rotate(360deg) scale(1);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.textFadeInRight {
  animation: fadeInRight 1s ease forwards;
}
</style>
