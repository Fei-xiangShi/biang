<template>
  <navbar />
  <view class="container">
    <view class="account"></view>
    <view class="clean"></view>
    <view class="about"></view>
    <view class="logoutButton">
      <u-button type="error" text="logout" @tap="logout" />
    </view>
  </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar.vue";
import RouteConfig from "@/config/routes";
import { userLogout } from "@/utils/userManager";

const logout = () => {
  uni.showModal({
    title: "提示",
    content: "确定要退出登录吗？",
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
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 0 2rem;
}

.logoutButton {
  margin-top: 20px;
}
</style>
