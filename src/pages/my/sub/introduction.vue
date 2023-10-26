<template>
  <view class="container">
    <navbar />
    <view>hello</view>
    <view>1212</view>
  </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar.vue";
const navBack = () => {
  console.log("test");
  uni.navigateBack({
    delta: 1,
  });
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(
    135deg,
    #a6eeee7a 10%,
    #91d8c84d 40%,
    #fcfcd491 60%
  );
}

</style>
