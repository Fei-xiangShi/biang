<template>
  <view class="navBarBox">
    <!-- 状态栏占位 -->
    <view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }" />
    <!-- 真正的导航栏内容 -->
    <view class="navBar">
      <slot></slot>
      <view class="return-button" @tap="goBack" v-if="!isRootPage()">
        <u-icon name="arrow-left" :size="20" :color="returnButtonIconColor" />
      </view>
      <view v-else-if="showChangeSchoolButton">
        <view class="brand" @tap="changeSchool">
          <view class="brand-content">{{ $t(schoolname) }}</view>
          <view class="change-school">
            <u-icon name="arrow-right" :size="10" color="black" />
          </view>
        </view>
      </view>
    </view>
    <u-picker
      :show="showChangeSchool"
      :columns="schools"
      closeOnClickOverlay
      @cancel="cancelChangeSchool"
      @confirm="confirmChangeSchool"
      @close="closeChangeSchool"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import universities from "@/config/universities";
const schoolname = ref(uni.getStorageSync("school"));
const showChangeSchool = ref(false);
const schools = [Object.keys(universities)];

defineProps({
  returnButtonIconColor: {
    type: String,
    default: "black",
  },
  showChangeSchoolButton: {
    type: Boolean,
    default: false,
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
  showChangeSchool.value = true;
};

const cancelChangeSchool = () => {
  showChangeSchool.value = false;
};

const confirmChangeSchool = (e: any) => {
  uni.setStorageSync("school", e.value[0]);
  showChangeSchool.value = false;
  schoolname.value = e.value[0];
  uni.setStorageSync(
    "schoolId",
    universities[e.value[0] as keyof typeof universities]
  );
};

const closeChangeSchool = () => {
  showChangeSchool.value = false;
};
</script>

<style lang="scss" scoped>
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
  width: 6rem auto;
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
