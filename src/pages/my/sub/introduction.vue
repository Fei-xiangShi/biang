<template>

  <u-navbar 
  @left-click="navBack"
  title="introduction"
  ></u-navbar>

  <view>hello</view>
  <view>1212</view>
</template>

<script setup lang="ts">

const navBack = () => {
  console.log("test")
  uni.navigateBack(
    {
      delta:1
    }
  )
};

</script>