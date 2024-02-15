<template>
  <view class="body">
    <view class="container">
      <navbar />
      <scroll-view
        :scroll-y="true"
        :scroll-with-animation="true"
        style="height: 100%"
      >
        <view class="verifyCode" :style="{ display: success ? 'none' : '' }">
          <view class="notice">
            <text class="notice-text">{{
              $t("verifyCode.请输入验证码提示")
            }}</text>
          </view>
          <view class="title">
            <text class="title-text">{{
              $t("verifyCode.输入验证码提示")
            }}</text>
          </view>
          <view class="code-inputs">
            <input
              class="code-input"
              adjust-position="false"
              auto-blur="true"
              @blur="confirm(code)"
              :focus="focus"
              v-model="code"
              type="number"
              maxlength="6"
            />
            <view
              class="code-input-block"
              v-for="i in 6"
              :key="i"
              @tap="focusToInput"
            >
              <view
                class="single-code"
                :class="{ inputing: code.length == i - 1 }"
              >
                {{ code[i - 1] }}
              </view>
            </view>
          </view>
          <view class="warning" v-if="warning">
            <text class="warning-text">{{ $t("verifyCode.验证码错误") }}</text>
          </view>
          <view class="tab-notice">
            <text class="tab-notice-text">{{ $t("verifyCode.遇到问题") }}</text>
          </view>
          <view
            class="resend-button"
            :class="{ available: timeleft <= 0 }"
            @tap="resendEmail"
          >
            <view class="resend-text">
              {{ showTime }} {{ $t("verifyCode.重新发送") }}
            </view>
          </view>
          <view class="confirm-button" :class="{ available: code.length == 6 }">
            <view class="button-text" @tap="confirm(code)">
              {{ $t("verifyCode.验证") }}
            </view>
          </view>
          <view class="bottom">
            <text class="bottom-text">{{
              $t("verifyCode.验证码底部提示")
            }}</text>
          </view>
        </view>
        <view class="successPage" :style="{ display: success ? '' : 'none' }">
          <view class="successPage-title">
            <text class="successPage-title-text">
              {{ $t("verifyCode.验证成功") }}
            </text>
          </view>
          <view class="successPage-notice">
            <view class="icon" :class="{ 'choose-icon-animation': animeShow }">
              <u-icon
                :name="animeShow ? 'checkmark-circle' : ''"
                size="30"
                color="#606266"
              />
            </view>
            <text :class="['successPage-notice-text', 'textFadeInRight']">
              {{ $t("verifyCode.验证成功提示") }}
            </text>
          </view>
          <view class="successPage-button">
            <view class="successPage-button-text" @tap="redirect">
              {{ $t("verifyCode.返回") }}
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Api from "@/api/api";
import navbar from "@/components/navbar.vue";
import { ErrorHandler } from "@/utils/requestErrors";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const warning = ref(false);
const disabled = ref(false);
const timeleft = ref(60);
const success = ref(false);
const animeShow = ref(false);
const showTime = ref(timeleft.value + "s");
const code = ref("");
const focus = ref(true);

const props = defineProps({
  email: {
    type: String,
    default: "",
  },
  redirctTo: {
    type: String,
    default: "",
  },
});

const resetTime = () => {
  timeleft.value = 60;
  const intervalId = setInterval(() => {
    timeleft.value--;
    showTime.value = timeleft.value + "s";
    if (timeleft.value === 0) {
      clearInterval(intervalId);
      showTime.value = "";
    }
  }, 1000);
};

resetTime();

const resendEmail = () => {
  if (timeleft.value > 0) return;
  Api.sendEmail(
    props.email,
    uni.getStorageSync("aueduSession"),
    uni.getStorageSync("lang")
  )
    .then((res: any) => {
      if (res.data.success) {
        timeleft.value = 60;
      } else {
        ErrorHandler(res);
      }
    })
    .catch((err: any) => {
      uni.showToast({
        title: t(err.message),
        icon: "none",
      });
    });
  resetTime();
};

const focusToInput = () => {
  focus.value = true;
};

const confirm = (code: string) => {
  focus.value = false;
  if (code.length < 6) {
    return;
  }
  disabled.value = true;
  Api.verifyEmail(uni.getStorageSync("aueduSession"), code)
    .then((res: any) => {
      if (res.data.success) {
        success.value = true;
        uni.setStorageSync("email", props.email);
        setTimeout(() => {
          animeShow.value = true;
        }, 100);
      } else {
        ErrorHandler(res);
      }
    })
    .catch((err: any) => {
      warning.value = true;
      uni.showToast({
        title: t(err.message),
        icon: "none",
      });
    })
    .finally(() => {
      disabled.value = false;
    });
};

const redirect = () => {
  uni.reLaunch({
    url: props.redirctTo,
  });
};
</script>

<style scoped lang="scss">
.body {
  height: 100vh;
  width: 100vw;
  top: 0;
}

.container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  background: rgba(166, 238, 238, 0.4235294118);
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
    height: 15%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    .code-input {
      position: absolute;
      color: transparent;
      width: 0;
    }
    .code-input-block {
      width: 13%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .single-code {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        background: rgba(177, 177, 177, 0.556);
        border-radius: 5px;
        transition: all 0.3s;
        &.inputing {
          background: rgb(124, 124, 124);
        }
      }
    }
  }

  .warning {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
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
  }
  .confirm-button {
    width: 80px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    float: right;
    background: rgba(177, 177, 177, 0.556);
    transition: all 0.3s;
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
  .available {
    background: rgba(16, 153, 255);
    color: white;
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
