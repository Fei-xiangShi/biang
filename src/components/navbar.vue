<template>
  <view class="navBarBox">
    <!-- 状态栏占位 -->
    <view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }" />
    <!-- 真正的导航栏内容 -->
    <view class="navBar">
      <view class="return-button" @tap="goBack" v-if="!isRootPage()">
        <u-icon
          name="arrow-left"
          :size="20"
          :color="returnButtonColor"
        ></u-icon>
      </view>
      <view v-else>
        <view class="brand" @tap="changeSchool">
          <view class="brand-content"> 悉哈大学 </view>
          <view class="change-school">
            <u-icon name="arrow-right" :size="10" color="black"></u-icon>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps({
  returnButtonColor: {
    type: String,
    default: "black",
  },
});

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

const changeSchool = () => {
  uni.navigateTo({
    url: "/pages/schools/index",
  });
};
</script>

<style lang="scss">
.statusBar {
  width: 100%;
  height: 0;
  background: rgba($color: #000000, $alpha: 0);
}

.navBarBox .navBar {
  display: flex;
  align-items: center;
  background-color: rgba($color: #000000, $alpha: 0);
  color: #fff;
  height: 44px;
}

.return-button {
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand {
  margin-left: 1rem;
  width: 6rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0000009d;
  border-radius: 1rem;
  background: rgba($color: #ffffff, $alpha: 0.5);
  border: 1px solid #fff;
}

.brand-content {
  font-size: 1rem;
  font-weight: bold;
  padding: 0.2rem 0.5rem;
}
</style>