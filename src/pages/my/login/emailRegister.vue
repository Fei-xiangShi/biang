<template>
  <navbar />
  <view class="login-container">
    <view class="title-text">{{ $t("注册新账号") }}</view>
    <view class="sub-title-text">{{ $t("注册副标题提示") }}</view>
    <view class="avatar">
      <view class="avatar-title">
        <view class="avatar-title-text">{{ $t("头像选择框标题") }}</view>
      </view>
      <view class="upload-avatar">
        <button
          class="avatar-wrapper"
          open-type="chooseAvatar"
          @chooseavatar="onChooseAvatar"
        >
          <view class="avatarShow">
            <image class="avatar-image" :src="userAvatarUrl" />
          </view>
        </button>
      </view>
    </view>
    <view class="email">
      <view class="email-input-title">
        <view class="email-input-title-text">{{ $t("邮箱输入框标题") }}*</view>
      </view>
      <view class="email-input">
        <u-input
          v-model="email"
          :placeholder="t('邮箱输入框占位符')"
          @blur="checkEmail"
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
        <view class="username-input-title-text">
          {{ $t("用户名输入框标题") }}*
        </view>
      </view>
      <view class="username-input">
        <u-input
          v-model="username"
          :placeholder="t('用户名输入框占位符')"
          @blur="checkUsername"
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
          {{ $t("密码输入框标题") }}*
        </view>
      </view>
      <view class="password-input">
        <u-input
          v-model="password"
          :placeholder="t('密码输入框占位符')"
          @blur="checkPasswordValid"
          type="password"
        />
      </view>
      <view class="password-input-warning">
        <view
          class="password-input-warning-text"
          :class="{
            ok: checkPasswordValid() || password === '',
            green: Checker.checkPassword(password)[0] === true,
          }"
        >
          · {{ $t("密码包含字母") }}
        </view>
        <view
          class="password-input-warning-text"
          :class="{
            ok: checkPasswordValid() || password === '',
            green: Checker.checkPassword(password)[1] === true,
          }"
        >
          · {{ $t("密码包含数字") }}
        </view>
        <view
          class="password-input-warning-text"
          :class="{
            ok: checkPasswordValid() || password === '',
            green: Checker.checkPassword(password)[2] === true,
          }"
        >
          · {{ $t("密码包含特殊符号") }}
        </view>
        <view
          class="password-input-warning-text"
          :class="{
            ok: checkPasswordValid() || password === '',
            green: Checker.checkPassword(password)[3] === true,
          }"
        >
          · {{ $t("密码长度必须在6-20之间") }}
        </view>
      </view>
    </view>
    <view class="password-confirm">
      <view class="password-confirm-input-title">
        <view class="password-confirm-input-title-text">
          {{ $t("确认密码输入框标题") }}*
        </view>
      </view>
      <view class="password-input">
        <u-input
          v-model="confrimedPassword"
          :placeholder="t('确认密码输入框占位符')"
          @blur="checkPasswordSame"
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
        <u-form-item :label="t('学校选择框标题') + '*'" @click="hideKeyboard">
          <u-input
            v-model="school"
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

const school = ref("");
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
const passwordIsSame = ref();
const emailValid = ref();
const username = ref("");
const usernameValid = ref();
const userAvatarUrl = ref(
  "https://img.ixintu.com/download/jpg/20201201/653c62f6204ba19a0c630206bee5923f_512_512.jpg!ys"
);
let size = "8192";

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
  let cnt = 0;
  if (Checker.checkPassword(password.value)[0]) {
    cnt++;
  }
  if (Checker.checkPassword(password.value)[1]) {
    cnt++;
  }
  if (Checker.checkPassword(password.value)[2]) {
    cnt++;
  }
  if (!Checker.checkPassword(password.value)[3]) {
    cnt = 0;
  }
  if (cnt < 1) {
    return false;
  }
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
  school.value = selection.value[0];
  schoolId.value = (
    universities[uni.getStorageSync("lang") as keyof typeof universities] as any
  )[school.value];
  showSchoolPicker.value = false;
};

const closePick = () => {
  showSchoolPicker.value = false;
};

const hideKeyboard = () => {
  showSchoolPicker.value = true;
  uni.hideKeyboard();
};

const onChooseAvatar = (e: any) => {
  userAvatarUrl.value = e.detail.avatarUrl;
  uni.getFileInfo({
    filePath: userAvatarUrl.value,
    success: (res) => {
      size = String(res.size);
    },
  });
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
      schoolId.value,
      size
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
          uni.setStorageSync("school", school.value);
          uni.setStorageSync("schoolId", schoolId.value);
          uni.getFileSystemManager().readFile({
            filePath: userAvatarUrl.value,
            success: (result) => {
              const headers = {
                "Content-Type": "image/jpeg",
                "Content-Length": size,
              };
              Api.uploadAvatar(
                res.data.presigned_url,
                result.data,
                headers
              ).then((res: any) => {
                if (res.statusCode === 200) {
                  console.log(res);
                  Api.updateAvatarUrl(
                    userAvatarUrl.value,
                    uni.getStorageSync("aueduSession")
                  ).then((res: any) => {
                    if (res.data.success === true) {
                      uni.setStorageSync("userAvatarUrl", userAvatarUrl.value);
                    }
                  });
                }
              });
            },
          });

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
  padding: 0 2rem;
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

.avatar {
  width: 100%;
  margin-top: 20px;
  .avatar-title {
    width: 100%;
    .avatar-title-text {
      font-size: 14px;
      color: #999;
    }
  }
  .upload-avatar {
    width: 5rem;
    height: 5rem;
    margin-top: 10px;
    button {
      width: 100%;
      height: 100%;
      padding: 0;
      border-radius: 50%;
    }
    .avatar-wrapper {
      width: 100%;
      height: 100%;
      .avatarShow {
        width: 100%;
        height: 100%;
        .avatar-image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
  }
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
      transition: all 0.5s;
    }
    .ok {
      color: rgb(167, 167, 167);
    }
    .green {
      color: #00ca00;
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
  margin-top: 20px;
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
