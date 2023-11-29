<template>
  <navbar />
  <view class="login-container">
    <view class="title-text">{{ $t("注册新账号") }}</view>
    <view class="sub-title-text">{{ $t("注册副标题提示") }}</view>
    <view class="email">
      <view class="email-input-title">
        <view class="email-input-title-text">{{ $t("邮箱输入框标题") }}</view>
      </view>
      <view class="email-input">
        <u-input
          v-model="email"
          :placeholder="t('邮箱输入框占位符')"
          @change="checkEmail"
        />
      </view>
      <view class="email-input-warning">
        <view class="email-input-warning-text" v-if="emailValid === false">
          {{ $t("邮箱格式错误提醒") }}
        </view>
      </view>
    </view>
    <view class="username">
      <view class="username-input-title">
        <view class="username-input-title-text">{{
          $t("用户名输入框标题")
        }}</view>
      </view>
      <view class="username-input">
        <u-input
          v-model="username"
          :placeholder="t('用户名输入框占位符')"
          @change="checkUsername"
        />
      </view>
      <view class="username-input-warning">
        <view
          class="username-input-warning-text"
          v-if="usernameValid === false"
        >
          {{ $t("用户名格式错误警告") }}
        </view>
      </view>
    </view>
    <view class="password">
      <view class="password-input-title">
        <view class="password-input-title-text">
          {{ $t("密码输入框标题") }}
        </view>
      </view>
      <view class="password-input">
        <u-input
          v-model="password"
          :placeholder="t('密码输入框占位符')"
          @change="checkPasswordValid"
          type="password"
        />
      </view>
      <view class="password-input-warning">
        <view
          class="password-input-warning-text"
          v-if="passwordValid === false"
        >
          {{ $t("密码格式错误警告") }}
        </view>
      </view>
    </view>
    <view class="password-confirm">
      <view class="password-confirm-input-title">
        <view class="password-confirm-input-title-text">
          {{ $t("确认密码输入框标题") }}
        </view>
      </view>
      <view class="password-input">
        <u-input
          v-model="confrimedPassword"
          :placeholder="t('确认密码输入框占位符')"
          @change="checkPasswordSame"
          type="password"
        />
      </view>
      <view class="password-confirm-input-warning">
        <view
          class="password-input-warning-text"
          v-if="passwordIsSame === false"
        >
          {{ $t("确认密码输入框警告") }}
        </view>
      </view>
    </view>
    <view class="school-select-input">
      <u-form>
        <u-form-item :label="t('学校选择框标题')" @click="hideKeyboard">
          <u-input
            v-model="schoolName"
            disabled
            disabledColor="rgb(0,0,0,0)"
            :placeholder="t('学校选择框占位符')"
            shape="circle"
          />
          <u-icon slot="right" name="arrow-right" />
        </u-form-item>
      </u-form>
      <u-picker
        :show="showSchoolPicker"
        :columns="schools"
        closeOnClickOverlay
        @cancel="cancelPick"
        @confirm="confirmPick"
        @close="closePick"
        :loading="pickerLoading"
        :title="t('学校选择')"
      />
    </view>
    <view class="next">
      <view class="next-step" @tap="commitRegister">
        <view class="next-step-text">{{ $t("下一步") }}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import universities from "@/config/universities";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import navbar from "@/components/navbar.vue";
import Checker from "@/utils/checker";
import Api from "@/api/api";
import RouteConfig from "@/config/routes";

const { t } = useI18n();

const schoolName = ref("");
const schoolId = ref("1");
const showSchoolPicker = ref(false);
const schools = [
  Object.keys(
    universities[uni.getStorageSync("lang") as keyof typeof universities]
  ),
];
const pickerLoading = ref(false);
const email = ref("");
const password = ref("");
const confrimedPassword = ref("");
const passwordValid = ref();
const passwordIsSame = ref();
const emailValid = ref();
const username = ref("");
const usernameValid = ref();

const checkPasswordSame = () => {
  if (password.value !== confrimedPassword.value) {
    passwordIsSame.value = false;
    return false;
  }
  passwordIsSame.value = true;
  return true;
};

const checkEmail = () => {
  if (!Checker.checkEmail(email.value)) {
    emailValid.value = false;
    return false;
  }
  emailValid.value = true;
  return true;
};

const checkPasswordValid = () => {
  if (!Checker.checkPassword(password.value)) {
    passwordValid.value = false;
    return false;
  }
  passwordValid.value = true;
  return true;
};

const checkUsername = () => {
  if (!Checker.checkUsername(username.value)) {
    usernameValid.value = false;
    return false;
  }
  usernameValid.value = true;
  return true;
};

const cancelPick = () => {
  showSchoolPicker.value = false;
};

const confirmPick = (selection: any) => {
  schoolName.value = selection.value[0];
  schoolId.value = (
    universities[uni.getStorageSync("lang") as keyof typeof universities] as any
  )[schoolName.value];
  showSchoolPicker.value = false;
};

const closePick = () => {
  showSchoolPicker.value = false;
};

const hideKeyboard = () => {
  showSchoolPicker.value = true;
  uni.hideKeyboard();
};

const commitRegister = () => {
  if (
    checkEmail() &&
    checkPasswordValid() &&
    checkPasswordSame() &&
    checkUsername()
  ) {
    Api.emailRegister(
      email.value,
      username.value,
      password.value,
      schoolId.value
    )
      .then((res: any) => {
        if (res.data.success === true) {
          uni.showToast({
            title: t("注册成功"),
            icon: "success",
            duration: 2000,
          });
          uni.setStorageSync("aueduSession", res.data.data.auedu_session);
          uni.setStorageSync("username", username.value);
          uni.setStorageSync("school", schoolName.value);
          uni.setStorageSync("schoolId", schoolId.value);
          const presignedUrl = res.data.presigned_url;
          console.log(presignedUrl);
          uni.reLaunch({
            url: RouteConfig.my.url,
          });
        } else {
          uni.showToast({
            title: t("注册失败"),
            icon: "none",
            duration: 2000,
          });
        }
      })
      .catch((err) => {
        uni.showToast({
          title: t("注册失败"),
          icon: "none",
          duration: 2000,
        });
      });
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 2rem;
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

.email {
  width: 100%;
  margin-top: 20px;
  .email-input-title {
    width: 100%;
    .email-input-title-text {
      font-size: 14px;
      color: #999;
    }
  }
  .email-input {
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
  .email-input-warning {
    width: 100%;
    .email-input-warning-text {
      font-size: 12px;
      color: #ff0000;
      margin-top: 5px;
    }
  }
}

.username {
  width: 100%;
  margin-top: 20px;
  .username-input-title {
    width: 100%;
    .username-input-title-text {
      font-size: 14px;
      color: #999;
    }
  }
  .username-input {
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
  .username-input-warning {
    width: 100%;
    .username-input-warning-text {
      font-size: 12px;
      color: #ff0000;
      margin-top: 5px;
    }
  }
}

.password {
  width: 100%;
  margin-top: 20px;
  .password-input-title {
    width: 100%;
    .password-input-title-text {
      font-size: 14px;
      color: #999;
    }
  }
  .password-input {
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
  .password-input-warning {
    width: 100%;
    .password-input-warning-text {
      font-size: 12px;
      color: #ff0000;
      margin-top: 5px;
    }
  }
}

.password-confirm {
  width: 100%;
  margin-top: 20px;
  .password-confirm-input-title {
    width: 100%;
    .password-confirm-input-title-text {
      font-size: 14px;
      color: #999;
    }
  }
  .password-input {
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
  .password-confirm-input-warning {
    width: 100%;
    .password-input-warning-text {
      font-size: 12px;
      color: #ff0000;
      margin-top: 5px;
    }
  }
}

.school-select-input {
  width: 100%;
  margin-top: 10px;
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
  flex-direction: row-reverse;
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
</style>
