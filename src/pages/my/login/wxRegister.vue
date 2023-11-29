<template>
  <navbar />
  <view class="login-container">
    <view class="title-text">{{ $t("微信注册新账号") }}</view>
    <view class="sub-title-text">{{ $t("微信注册副标题提示") }}</view>
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
    <view class="school-select-input">
      <u-form>
        <u-form-item :label="t('学校选择框标题') + '*'" @click="hideKeyboard">
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
      <view class="next-step">
        <view class="next-step-text" @tap="commitRegister">{{
          $t("下一步")
        }}</view>
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
const showSchoolPicker = ref(false);
const schools = [
  Object.keys(
    universities[uni.getStorageSync("lang") as keyof typeof universities]
  ),
];
const pickerLoading = ref(false);
const username = ref("");
const usernameValid = ref();
const schoolId = ref("1");
const email = ref("");
const emailValid = ref();
const userAvatarUrl = ref("");
let size = "0";

const checkUsername = () => {
  usernameValid.value = Checker.checkUsername(username.value);
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

const checkEmail = () => {
  if (!Checker.checkEmail(email.value)) {
    emailValid.value = false;
    return false;
  }
  emailValid.value = true;
  return true;
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
    !username.value ||
    !email.value ||
    !schoolId.value ||
    !userAvatarUrl.value
  ) {
    uni.showToast({
      title: t("请填写完整信息"),
      icon: "none",
      duration: 2000,
    });
    return;
  }
  if (!usernameValid.value || !emailValid.value) {
    uni.showToast({
      title: t("请填写正确信息"),
      icon: "none",
      duration: 2000,
    });
    return;
  }
  Api.wxRegister(
    username.value,
    email.value,
    schoolId.value,
    userAvatarUrl.value,
    size
  ).then((res: any) => {
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
      uni.getFileSystemManager().readFile({
        filePath: userAvatarUrl.value,
        success: (result) => {
          const headers = {
            "Content-Type": "image/jpeg",
            "Content-Length": size,
          };
          Api.uploadAvatar(res.data.presigned_url, result.data, headers).then(
            (res: any) => {
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
            }
          );
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
  });
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2rem;
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
</style>
