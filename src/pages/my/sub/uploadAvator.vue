<template>
<view class="container">
  <navbar/>
    <u-input
    class="id"
    placeholder="请输入内容"
    border="surround"
    v-model="id_value"
    clearable
  ></u-input>
</view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar.vue";
let id_value = ""
const navBack = () => {
  console.log("test")
  uni.navigateBack(
    {
      delta:1
    }
  )
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