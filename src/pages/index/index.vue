<template>
  <u-swiper
    :list="list2"
    keyName="image"
    showTitle
    :autoplay="true"
    circular
    indicator
    indicatorMode="line"
    previousMargin="30"
    nextMargin="30"
    radius="5"
    bgColor="#ffffff"
  ></u-swiper>
</template>

<script setup lang="ts">
let list2 = [
  {
    image: "https://cdn.uviewui.com/uview/swiper/swiper2.png",
    title: "昨夜星辰昨夜风，画楼西畔桂堂东",
  },
  {
    image: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
    title: "身无彩凤双飞翼，心有灵犀一点通",
  },
  {
    image: "https://cdn.uviewui.com/uview/swiper/swiper3.png",
    title: "谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳",
  },
];
</script>

<style></style>
