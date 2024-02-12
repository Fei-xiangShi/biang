<template>
  <view class="folder">
    <view class="folded" :class="{ unfolded: unfolding }">
      <view class="content-area">
        <slot />
      </view>
      <view class="folded-overlay" :class="{ 'unfolded-overlay': unfolding }" />
      <view class="toggle" @tap="toggleStatus">
        <view class="title">{{ unfolding ? $t("textfolder.收起") : $t("textfolder.展开") }}</view>
        <view class="toggle-button">
          <view
            class="folded-button-icon"
            :class="{ 'unfolded-button-icon': unfolding }"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, watchEffect } from "vue";

const instance = getCurrentInstance();
const unfolding = ref(true);
const contentHeight = ref(0);
const contentHeightCSS = ref("auto");

const props = defineProps({
  height: {
    type: String,
    default: "200px",
  },
  load: {
    type: Boolean,
    default: false,
  },
});

watchEffect(() => {
  if (props.load) {
    const query = uni.createSelectorQuery().in(instance);
    query
      .select(".folded")
      .boundingClientRect((res: any) => {
        contentHeight.value = res.height;
        contentHeightCSS.value = contentHeight.value + "px";
        unfolding.value = false;
      })
      .exec();
  }
});

const toggleStatus = () => {
  unfolding.value = !unfolding.value;
};
</script>

<style scoped lang="scss">
.folder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.folded {
  height: v-bind(height);
  overflow: hidden;
  position: relative;
  transition: height 1s ease;
  .content-area {
    width: 100%;
    height: auto;
    overflow: hidden;
  }
  .folded-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    z-index: 1;
    opacity: 1;
    top: 0;
    transition: opacity 1s ease;
  }
  .toggle {
    position: absolute;
    z-index: 2;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #303133;
    .title {
      margin-right: 10px;
    }
    .toggle-button {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      .folded-button-icon {
        width: 20px;
        height: 20px;
        border: 1px solid #303133;
        border-radius: 50%;
      }
      .unfolded-button-icon {
        width: 20px;
        height: 20px;
        border: 1px solid #303133;
        background: #303133;
        border-radius: 50%;
        transform: rotate(180deg);
      }
    }
  }
}

.unfolded {
  height: v-bind(contentHeightCSS);
  .folded-overlay {
    opacity: 0;
  }
  .toggle {
    position: relative;
  }
}
</style>
