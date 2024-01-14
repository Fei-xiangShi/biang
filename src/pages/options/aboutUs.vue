<template>
  <navbar :title="t('aboutUs.关于与帮助')" />
  <view class="content">
    <view class="head">
      <view class="logo" />
      <view class="list">
        <view class="version">
          <view class="left">
            <view class="icon">
              <u-icon name="info-circle" :size="20" />
            </view>
            <view class="text">
              {{ $t("aboutUs.当前版本") }}
            </view>
          </view>
          <view class="desc">
            {{ consts.version }}
          </view>
        </view>
        <view class="update" @tap="checkUpdate">
          <view class="left">
            <view class="icon">
              <u-icon name="reload" :size="20" />
            </view>
            <view class="text">
              {{ $t("aboutUs.检查更新") }}
            </view>
          </view>
          <view class="right">
            <view class="desc"></view>
            <view class="arrow">
              <u-icon name="arrow-right" :size="20" />
            </view>
          </view>
        </view>
        <view class="functionsIntro">
          <view class="left">
            <view class="icon">
              <u-icon name="coupon" :size="20" />
            </view>
            <view class="text">
              {{ $t("aboutUs.功能介绍") }}
            </view>
          </view>
          <view class="right">
            <view class="desc"></view>
            <view class="arrow">
              <u-icon name="arrow-right" :size="20" />
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="tail">
      <view class="PP-UA">
        <span class="PP">{{ $t("aboutUs.隐私政策") }}</span>
        <span class="block"> | </span>
        <span class="UA">{{ $t("aboutUs.用户协议") }}</span>
      </view>
      <view class="copyright"> Copyright © 2024. All Rights Reserved. </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar.vue";
import consts from "@/config/constant";

import { useI18n } from "vue-i18n";

const { t } = useI18n();

const checkUpdate = () => {
  uni.getUpdateManager().onCheckForUpdate((res) => {
    if (res.hasUpdate) {
      uni.showModal({
        title: t("aboutUs.更新提示"),
        content: t("aboutUs.新版本已经准备好，是否重启应用？"),
        confirmText: t("aboutUs.重启应用"),
        cancelText: t("aboutUs.下次再说"),
        success(res) {
          if (res.confirm) {
            uni.getUpdateManager().applyUpdate();
          }
        },
      });
    } else {
      uni.showToast({
        title: t("aboutUs.已经是最新版本"),
        icon: "none",
      });
    }
  });
};
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 80vh;
  .head {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  .logo {
    width: 100px;
    height: 100px;
    background: url("https://ts3.cn.mm.bing.net/th?id=OIP-C.eRYzlCa3_4jy3sI1QTuY7gAAAA&w=212&h=141&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2");
    background-size: cover;
    background-position: center;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  .list {
    width: 90%;
    background-color: #f0f0f034;
    border-radius: 10px;
    .version,
    .update,
    .functionsIntro {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      .left {
        display: flex;
        flex-direction: row;
        .icon {
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }
        .text {
          margin-left: 5px;
          font-size: 16px;
          font-weight: 500;
        }
      }
      .right {
        .desc {
          font-size: 14px;
          color: #999;
        }
        .arrow {
          width: 20px;
          height: 20px;
        }
      }
    }
    .version {
      border-bottom: 1px solid #eee;
    }
    .update {
      border-bottom: 1px solid #eee;
    }
  }
}

.tail {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .PP-UA {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .block {
      margin: 0 10px;
    }
  }
  .PP,
  .UA,
  .block {
    color: #0011ff;
    font-size: 12px;
  }
  .copyright{
    color: #999;
    font-size: 12px;
  }
}
</style>
