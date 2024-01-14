<template>
  <navbar :title="t('account.账户资料')" />
  <view class="container">
    <view class="list">
      <view class="avatar" @tap="changeAvatar">
        <view class="title">
          {{ $t("account.头像") }}
        </view>
        <view class="right">
          <view class="avatar-img">
            <u-avatar :src="avatarUrl" />
          </view>
          <view class="arrow">
            <u-icon name="arrow-right" :size="20" />
          </view>
        </view>
      </view>
      <view class="username" @tap="changeUsername">
        <view class="title">
          {{ $t("account.昵称") }}
        </view>
        <view class="right">
          <view class="username-text">
            {{ username }}
          </view>
          <view class="arrow">
            <u-icon name="arrow-right" :size="20" />
          </view>
        </view>
      </view>
      <view class="email">
        <view class="title">
          {{ $t("account.邮箱") }}
        </view>
        <view class="right">
          <view class="email-text" @tap="changeEmail">
            {{ email }}
          </view>
          <view class="arrow">
            <u-icon name="arrow-right" :size="20" />
          </view>
        </view>
      </view>
      <view class="school">
        <view class="title">
          {{ $t("account.学校") }}
        </view>
        <view class="right">
          <view class="school-text">
            {{ school }}
          </view>
        </view>
      </view>
      <view class="change-password" @tap="changePassword">
        <view class="title">
          {{ $t("account.修改密码") }}
        </view>
        <view class="right">
          <view class="arrow">
            <u-icon name="arrow-right" :size="20" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar.vue";
import Api from "@/api/api";
import RouteConfig from "@/config/routes";
import { ErrorHandler } from "@/utils/requestErrors";

import { useI18n } from "vue-i18n";

const { t } = useI18n();
const avatarUrl = uni.getStorageSync("avatarUrl");
const username = uni.getStorageSync("username");
const email = uni.getStorageSync("email");
const school = uni.getStorageSync("school");

const changeAvatar = () => {
  uni.chooseImage({
    count: 1,
    success: (chooseImageResult) => {
      uni.getFileInfo({
        filePath: chooseImageResult.tempFilePaths[0],
        success: (getFileInfoResult) => {
          uni.getFileSystemManager().readFile({
            filePath: chooseImageResult.tempFilePaths[0],
            success: (result) => {
              Api.changeAvatar(
                uni.getStorageSync("aueduSession"),
                String(getFileInfoResult.size)
              ).then((changeAvatarResult: any) => {
                if (changeAvatarResult.data.success) {
                  const headers = {
                    "Content-Type": "image/jpeg",
                    "Content-Length": String(getFileInfoResult.size),
                  };
                  Api.uploadAvatar(
                    changeAvatarResult.data.presigned_url,
                    result.data,
                    headers
                  ).then((res: any) => {
                    if (res.statusCode === 200) {
                      uni.showToast({
                        title: t("account.修改成功"),
                        icon: "success",
                      });
                    } else {
                      ErrorHandler(res);
                    }
                  });
                } else {
                  ErrorHandler(changeAvatarResult);
                }
              }).catch((err) => {
                uni.showToast({
                  title: t("account.修改失败"),
                  icon: "none",
                });
              });
            },
          });
        },
      });
    },
  });
};

const changeUsername = () => {
  uni.navigateTo({
    url: "/pages/options/change-username.vue",
  });
};

const changeEmail = () => {
  uni.navigateTo({
    url: RouteConfig.my.myItemList[2].url
  });
};

const changePassword = () => {
  uni.navigateTo({
    url: RouteConfig.my.myItemList[3].url
  });
};
</script>

<style scoped lang="scss">
.container {
  background-color: #f5f5f5;
  height: 100vh;
  .list {
    margin-top: 10px;
    background-color: #fff;
    .avatar,
    .username,
    .email,
    .school,
    .change-password {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 15px;
      border-bottom: 1px solid #f5f5f5;
      .title {
        font-size: 16px;
        color: #333;
      }
      .right {
        display: flex;
        align-items: center;
        .arrow {
          margin-left: 10px;
        }
      }
    }
    .avatar {
      .avatar-img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #f5f5f5;
      }
    }
    .username,
    .email,
    .school {
      .username-text,
      .email-text,
      .school-text {
        color: #999;
      }
    }
  }
}
</style>
