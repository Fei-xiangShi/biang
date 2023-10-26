<template>
    <u-navbar
    class="id_navbar"
    @left-click="navBack"
    title="upload"
    ></u-navbar>

    <u-input
    class="id"
    placeholder="请输入内容"
    border="surround"
    v-model="id_value"
    clearable
  ></u-input>
</template>

<script setup lang="ts">
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