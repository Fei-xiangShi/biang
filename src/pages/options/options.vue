<template>
  <view class="page">
    <view class="navbar">
      <navbar :title="t('options.设置')" />
    </view>
    <view class="container">
      <view
        class="options-list"
        v-for="(list, index) in RouteConfig.options.optionList"
        :key="index"
      >
        <view
          class="options-list-item"
          v-for="(item, index) in list"
          @tap="navTo(item.url)"
          :key="index"
        >
          <view v-if="index != 0" class="options-list-item-block" />
          <view class="content">
            <view class="options-list-item-text">
              <view class="options-list-item-title">{{ $t(item.title) }}</view>
              <view class="options-list-item-desc" v-if="item.desc">
                {{ $t(item.desc) }}
              </view>
            </view>
            <view class="options-list-item-arrow">
              <u-icon name="arrow-right" :size="20" />
            </view>
          </view>
        </view>
      </view>
      <view class="logoutButton">
        <view class="logoutButton" @tap="logout">
          {{ $t("options.退出登录") }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar.vue";
import RouteConfig from "@/config/routes";
import { userLogout } from "@/utils/userManager";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const navTo = (url: string) => {
  uni.navigateTo({
    url,
  });
};

const logout = () => {
  uni.showModal({
    title: t("options.提示"),
    content: t("options.确定退出登录吗？"),
    confirmText: t("options.确定"),
    cancelText: t("options.取消"),
    success: (res) => {
      if (res.confirm) {
        userLogout();
        uni.reLaunch({
          url: RouteConfig.indexPage.url,
        });
      }
    },
  });
};
</script>

<style scoped lang="scss">
.page {
  background-color: #f0f0f0;
  height: 100vh;
}

.navbar {
  box-shadow: 0 0px 5px rgba(0, 0, 0, 0.2);
  position: relative;
}

.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  .options-list {
    margin-top: 15px;
    .options-list-item {
      display: flex;
      flex-direction: column;
      background-color: #fff;
      .options-list-item-block {
        height: 1px;
        background-color: #f0f0f0;
      }
      .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        .options-list-item-text {
          .options-list-item-title {
            font-size: 16px;
          }
          .options-list-item-desc {
            font-size: 14px;
            color: #999;
          }
        }
        .options-list-item-arrow {
          color: #999;
        }
      }
    }
  }
}

.logoutButton {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  .logoutButton {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    background-color: #fff;
    font-size: 16px;
    color: #f00;
  }
}
</style>
