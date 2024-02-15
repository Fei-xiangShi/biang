<template>
  <view class="body">
    <scroll-view
      :scroll-y="true"
      :scroll-with-animation="true"
      style="height: 100vh"
    >
      <navbar background-color="white"/>
      <view class="login-container">
        <view class="title-text">{{ $t("emailRegister.注册新账号") }}</view>
        <view class="sub-title-text">
          {{ $t("emailRegister.注册副标题提示") }}
        </view>
        <view class="avatar">
          <view class="avatar-title">
            <view class="avatar-title-text">
              {{ $t("emailRegister.头像选择框标题") }}
            </view>
          </view>
          <view class="upload-avatar">
            <button
              class="avatar-wrapper"
              open-type="chooseAvatar"
              @chooseavatar="onChooseAvatar"
            >
              <view class="avatarShow">
                <image class="avatar-image" :src="avatarUrl" />
              </view>
            </button>
          </view>
        </view>
        <view class="email">
          <view class="email-input-title">
            <view class="email-input-title-text">
              {{ $t("emailRegister.邮箱输入框标题") }}*
            </view>
          </view>
          <view class="email-input">
            <u-input
              v-model="email.content"
              :placeholder="t('emailRegister.邮箱输入框占位符')"
              @blur="checkEmail(email)"
            />
          </view>
          <view class="email-input-warning">
            <view class="email-input-warning-text" v-if="email.valid === false">
              {{ $t(email.warning) }}
            </view>
          </view>
        </view>
        <view class="username">
          <view class="username-input-title">
            <view class="username-input-title-text">
              {{ $t("emailRegister.用户名输入框标题") }}*
            </view>
          </view>
          <view class="username-input">
            <u-input
              v-model="username.content"
              :placeholder="t('emailRegister.用户名输入框占位符')"
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
        <view class="password">
          <view class="password-input-title">
            <view class="password-input-title-text">
              {{ $t("emailRegister.密码输入框标题") }}*
            </view>
          </view>
          <view class="password-input">
            <u-input
              v-model="password.content"
              :placeholder="t('emailRegister.密码输入框占位符')"
              @blur="password.checkPasswordAll()"
              type="password"
            />
          </view>
          <view class="password-input-warning">
            <view
              class="password-input-warning-text"
              :class="{
                ok: password.checkPasswordAll() || password.content === '',
                green: password.letter,
              }"
            >
              · {{ $t("emailRegister.密码包含字母") }}
            </view>
            <view
              class="password-input-warning-text"
              :class="{
                ok: password.checkPasswordAll() || password.content === '',
                green: password.number,
              }"
            >
              · {{ $t("emailRegister.密码包含数字") }}
            </view>
            <view
              class="password-input-warning-text"
              :class="{
                ok: password.checkPasswordAll() || password.content === '',
                green: password.symbol,
              }"
            >
              · {{ $t("emailRegister.密码包含特殊符号") }}
            </view>
            <view
              class="password-input-warning-text"
              :class="{
                ok: password.checkPasswordAll() || password.content === '',
                green: password.length,
              }"
            >
              · {{ $t("emailRegister.密码长度必须在6-20之间") }}
            </view>
          </view>
        </view>
        <view class="password-confirm">
          <view class="password-confirm-input-title">
            <view class="password-confirm-input-title-text">
              {{ $t("emailRegister.确认密码输入框标题") }}*
            </view>
          </view>
          <view class="password-input">
            <u-input
              v-model="password.again"
              :placeholder="t('emailRegister.确认密码输入框占位符')"
              @blur="password.checkPasswordAgain()"
              type="password"
            />
          </view>
          <view class="password-confirm-input-warning">
            <view
              class="password-input-warning-text"
              v-if="!password.checkPasswordAgain() && password.again !== ''"
            >
              {{ $t("emailRegister.确认密码输入框警告") }}
            </view>
          </view>
        </view>
        <view class="code">
          <view class="code-input-title">
            <view class="code-input-title-text">
              {{ $t("emailRegister.验证码输入框标题") }}*
            </view>
          </view>
          <view class="code-input">
            <u-input
              v-model="code.content"
              :placeholder="t('emailRegister.验证码输入框占位符')"
            >
              <template v-slot:suffix>
                <u-code
                  :seconds="60"
                  :start-text="t('emailRegister.获取验证码')"
                  :changeText="t('emailRegister.等待重新获取验证码')"
                  @end="end"
                  @start="start"
                  @change="codeChange"
                  keep-running
                  ref="Code"
                />
                <view class="tips" @tap="getCode">{{ $t(tips) }}</view>
              </template>
            </u-input>
          </view>
          <view class="code-input-warning">
            <view class="code-input-warning-text" v-if="code.valid === false">
              {{ $t(code.warning) }}
            </view>
          </view>
        </view>
        <view class="school-select-input">
          <u-form>
            <u-form-item
              :label="t('emailRegister.学校选择框标题') + '*'"
              @click="hideKeyboard"
            >
              <u-input
                v-model="school"
                disabled
                disabledColor="rgb(0,0,0,0)"
                :placeholder="t('emailRegister.学校选择框占位符')"
                shape="circle"
              />
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
            :title="t('emailRegister.学校选择')"
          />
        </view>
        <view class="next">
          <view class="next-step" @tap="commitRegister">
            <view class="next-step-text">{{ $t("emailRegister.下一步") }}</view>
          </view>
        </view>
      </view>
    </scroll-view>
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
import { InputContent } from "@/types/inputContent";
import { checkEmail, checkUsername } from "@/utils/checker";
import { Password } from "@/types/password";
import { userInitFromRequest } from "@/utils/userManager";

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
const password = ref(new Password());
const username = ref(new InputContent());
const email = ref(new InputContent());
const avatarUrl = ref(
  "https://img.ixintu.com/download/jpg/20201201/653c62f6204ba19a0c630206bee5923f_512_512.jpg!ys"
);
let size = "8192";
const tips = ref("emailRegister.获取验证码");
const code = ref(new InputContent());
const Code = ref();

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
  avatarUrl.value = e.detail.avatarUrl;
  uni.getFileInfo({
    filePath: avatarUrl.value,
    success: (res) => {
      size = String(res.size);
    },
  });
};

const start = () => {
  tips.value = t("emailRegister.正在获取验证码");
};

const end = () => {
  tips.value = t("emailRegister.重新获取验证码");
};

const codeChange = (text: string) => {
  tips.value = text;
};

const getCode = () => {
  checkEmail(email.value);
  if (email.value.valid) {
    if (Code.value.canGetCode) {
      uni.showLoading({
        title: t("emailRegister.正在获取验证码"),
      });
      Api.sendEmailVerificationCode(
        email.value.content,
        uni.getStorageSync("lang")
      )
        .then((res: any) => {
          if (res.data.success) {
            setTimeout(() => {
              uni.hideLoading();
              uni.showToast({
                title: t("emailRegister.验证码已发送"),
                icon: "none",
                duration: 2000,
              });
            }, 2000);
            Code.value.start();
          } else {
            uni.hideLoading();
            ErrorHandler(res);
          }
        })
        .catch((err: any) => {
          uni.showToast({
            title: t(err.message),
            icon: "none",
            duration: 2000,
          });
        });
    }
  } else {
    email.value.valid = false;
    email.value.warning = t("emailRegister.请输入邮箱警告");
  }
};

const commitRegister = () => {
  checkEmail(email.value);
  checkUsername(username.value);
  if (
    password.value.checkPasswordAgain() &&
    password.value.checkPasswordAll() &&
    email.value.valid &&
    username.value.valid
  ) {
    Api.codeVertify(email.value.content, code.value.content, "email")
      .then((res: any) => {
        if (res.data.success) {
          code.value.valid = true;
        } else {
          code.value.valid = false;
          code.value.warning = t("emailRegister.验证码错误");
          ErrorHandler(res);
          return;
        }
      })
      .catch((err: any) => {
        uni.showToast({
          title: t(err.message),
          icon: "none",
          duration: 2000,
        });
      });
    Api.emailRegister(
      email.value.content,
      username.value.content,
      password.value.content,
      schoolId.value,
      size,
      uni.getStorageSync("lang")
    )
      .then((res: any) => {
        if (res.data.success === true) {
          uni.showToast({
            title: t("emailRegister.注册成功"),
            icon: "success",
            duration: 2000,
          });
          userInitFromRequest(res);
          uni.getFileSystemManager().readFile({
            filePath: avatarUrl.value,
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
        if (err.code === RequestErrorCode.EmailExistsError) {
          email.value.valid = false;
          email.value.warning = t(err.message);
        } else if (err.code === RequestErrorCode.UsernameExistsError) {
          username.value.valid = false;
          username.value.warning = t(err.message);
        } else {
          uni.showToast({
            title: t(err.message),
            icon: "none",
            duration: 2000,
          });
        }
      });
  }
};
</script>

<style lang="scss" scoped>
.body {
  height: 100vh;
  width: 100vw;
  top: 0;
}

.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
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

.code {
  width: 100%;
  margin-top: 20px;
  .code-input-title {
    width: 100%;
    .code-input-title-text {
      font-size: 14px;
      color: #999;
    }
  }
  .code-input {
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
    .tips {
      font-size: 12px;
      color: #007aff;
      margin-left: 10px;
    }
  }
  .code-input-warning {
    width: 100%;
    .code-input-warning-text {
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
  margin: 40px 0 60px 0;
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
