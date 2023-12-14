<template>
  <navbar />
  <view class="login-container">
    <view class="title-text">{{ $t("wxRegister.微信注册新账号") }}</view>
    <view class="sub-title-text">{{
      $t("wxRegister.微信注册副标题提示")
    }}</view>
    <view class="avatar">
      <view class="avatar-title">
        <view class="avatar-title-text">{{
          $t("wxRegister.头像选择框标题")
        }}</view>
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
          {{ $t("wxRegister.用户名输入框标题") }}*
        </view>
      </view>
      <view class="username-input">
        <u-input
          v-model="username.content"
          :placeholder="t('wxRegister.用户名输入框占位符')"
          @blur="checkUsername(username)"
        />
      </view>
      <view class="username-input-warning">
        <view
          class="username-input-warning-text"
          v-if="username.valid === false"
        >
          {{ $t(username.warning) }}
        </view>
      </view>
    </view>
    <view class="email">
      <view class="email-input-title">
        <view class="email-input-title-text">{{
          $t("wxRegister.邮箱输入框标题")
        }}</view>
      </view>
      <view class="email-input">
        <u-input
          v-model="email.content"
          :placeholder="t('wxRegister.邮箱输入框占位符')"
          @blur="checkEmail(email)"
        />
      </view>
      <view class="email-input-warning">
        <view
          class="email-input-warning-text"
          v-if="email.valid === false"
          :style="{ color: 'rgb(167, 167, 167)' }"
        >
          {{ $t(email.warning) }}
        </view>
      </view>
    </view>
    <view class="school-select-input">
      <u-form>
        <u-form-item
          :label="t('wxRegister.学校选择框标题') + '*'"
          @click="hideKeyboard"
        >
          <u-input
            v-model="school"
            disabled
            disabledColor="rgb(0,0,0,0)"
            :placeholder="t('wxRegister.学校选择框占位符')"
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
        :title="t('wxRegister.学校选择')"
      />
    </view>
    <view class="next">
      <view class="next-step">
        <view class="next-step-text" @tap="commitRegister">{{
          $t("wxRegister.下一步")
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
import Api from "@/api/api";
import RouteConfig from "@/config/routes";
import { ErrorHandler, RequestErrorCode } from "@/utils/requestErrors";
import { userWxCode, userInitFromRequest } from "@/utils/userManager";
import { InputContent } from "@/types/inputContent";
import { checkUsername, checkEmail } from "@/utils/checker";

const { t } = useI18n();

const school = ref("");
const showSchoolPicker = ref(false);
const schools = [
  Object.keys(
    universities[uni.getStorageSync("lang") as keyof typeof universities]
  ),
];
const pickerLoading = ref(false);
const username = ref(new InputContent());
const schoolId = ref("1");
const email = ref(new InputContent());
const userAvatarUrl = ref(
  "https://img.ixintu.com/download/jpg/20201201/653c62f6204ba19a0c630206bee5923f_512_512.jpg!ys"
);
let size = "8192";

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
  checkEmail(email.value);
  if (!email.value.valid && email.value.content) {
    uni.showToast({
      title: t(email.value.warning),
      icon: "none",
      duration: 2000,
    });
    return;
  }
  checkUsername(username.value);
  if (!username.value.valid) {
    uni.showToast({
      title: t(username.value.warning),
      icon: "none",
      duration: 2000,
    });
    return;
  }
  userWxCode().then((code: string) => {
    Api.wxRegister(
      code,
      username.value.content,
      schoolId.value,
      size,
      email.value.content ? email.value.content : undefined
    )
      .then((res: any) => {
        if (res.data.success === true) {
          uni.showToast({
            title: t("wxRegister.注册成功"),
            icon: "success",
            duration: 2000,
          });
          userInitFromRequest(res);
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
                  uni.reLaunch({
                    url: RouteConfig.my.url,
                  });
                } else {
                  ErrorHandler(res);
                }
              });
            },
          });
        } else {
          ErrorHandler(res);
        }
      })
      .catch((err: any) => {
        if (err.code === RequestErrorCode.UserExistsError) {
          username.value.valid = false;
          username.value.warning = t(err.message);
        } else if (err.code === RequestErrorCode.EmailExistsError) {
          email.value.valid = false;
          email.value.warning = t(err.message);
        } else {
          uni.showToast({
            title: t(err.message),
            icon: "none",
          });
        }
      });
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
@/types/InputContent
