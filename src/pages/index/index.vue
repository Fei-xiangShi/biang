<template>
  <view class="container">
    <view class="navbar">
      <navbar />
    </view>

    <view class="swiper">
      <u-swiper
        :list="swiperList"
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
    </view>
    <view class="toolbox">
      <view class="toolbox-item" v-for="tool in toolbox">
        <u-icon :name="tool.icon" size="20" color="#606266"></u-icon>
        <view class="toolbox-item-text">{{ tool.text }}</view>
      </view>
    </view>
    <view class="popular-functions">
      <view
        class="popular-functions-item"
        v-for="popularFunction in popularFunctions"
      >
        <u-icon :name="popularFunction.icon" size="20" color="#606266"></u-icon>
        <view class="popular-functions-item-text">{{
          popularFunction.text
        }}</view>
      </view>
    </view>
    <view class="class-query-card">
      <view class="title">
        <view class="title-text">输入课程链接课程查询</view>
      </view>
      <view class="content">
        <view class="content-text">课表查询, 点击就送</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar.vue";

const swiperList = [
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

const toolbox = [
  {
    icon: "home",
    text: "首页",
  },
  {
    icon: "search",
    text: "搜索",
  },
  {
    icon: "cart",
    text: "购物车",
  },
  {
    icon: "account",
    text: "我的",
  },
];

const popularFunctions = [
  {
    icon: "home",
    text: "首页",
  },
  {
    icon: "search",
    text: "搜索",
  },
  {
    icon: "cart",
    text: "购物车",
  },
  {
    icon: "account",
    text: "我的",
  },
  {
    icon: "home",
    text: "首页",
  },
  {
    icon: "search",
    text: "搜索",
  },
  {
    icon: "cart",
    text: "购物车",
  },
  {
    icon: "account",
    text: "我的",
  },
  {
    icon: "account",
    text: "我的",
  },
  {
    icon: "account",
    text: "我的",
  },
];
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(135deg, #a6eeeea3 10%, #ecb4ee70 40%, #fff 50%);
  overflow: hidden;
}

.toolbox {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
}

.toolbox .toolbox-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25%;
}

.toolbox .toolbox-item .toolbox-item-text {
  font-size: 12px;
  color: #606266;
  margin-top: 5px;
}

.popular-functions {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  margin: 5px 20px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: var(--borderRadius-medium, 0.375rem);
}

.popular-functions .popular-functions-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
}

.popular-functions .popular-functions-item .popular-functions-item-text {
  font-size: 12px;
  color: #606266;
  margin-top: 5px;
}

.class-query-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: url("https://tse2-mm.cn.bing.net/th/id/OIP-C.Z-6u2XCDv8rybJg_Cf0wYwHaD3?pid=ImgDet&rs=1");
  height: 100px;
  margin: 5px 20px;
  padding: 10px;
  border-radius: var(--borderRadius-medium, 0.375rem);
}

.class-query-card .title {
  display: flex;
  align-items: center;
  height: 1.5rem;
  border-radius: var(--borderRadius-medium, 0.375rem);
}

.class-query-card .title .title-text {
  margin-left: 10px;
  font-size: 1.5rem;
  color: cornflowerblue;
  font-family: "LXGW WenKai";
}

.class-query-card .content {
  display: flex;
  align-items: center;
  height: 1.5rem;
  border-radius: var(--borderRadius-medium, 0.375rem);
}

.class-query-card .content .content-text {
  margin-left: 4rem;
  font-size: 1rem;
  color: gray;
  font-family: "LXGW WenKai";
}
</style>
