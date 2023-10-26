<template>
  <view class="navBarBox">
    <!-- 状态栏占位 -->
    <view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }" />
    <!-- 真正的导航栏内容 -->
    <view class="navBar">
      <view class="return-button" @tap="goBack" v-if="!isRootPage">
        <i class="fal fa-chevron-left" />
      </view>
    </view>
      
  </view>

  
</template>

<script setup lang="ts">
import routes from "@/config/routes";

const isRootPage = () => {
  const pages = getCurrentPages();
  return pages.length === 1;
};

const statusBarHeight = uni.getSystemInfoSync().statusBarHeight;

const goBack = () => {
  uni.navigateBack({
    delta: 1,
  });
};
</script>

<style lang="scss">
.statusBar {
  width: 100%;
  height: 0;
  background: rgba($color: #000000, $alpha: 0.0);
}

.navBarBox .navBar {
  display: flex;
  align-items: center;
  background-color: rgba($color: #000000, $alpha: 0.0);
  color: #fff;
  height: 44px;
}

.navBarBox .navBar .return-button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: awesome font;
  width: 44px;
  height: 44px;
}
</style>
