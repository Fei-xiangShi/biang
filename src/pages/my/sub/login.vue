<template>
  <button
    class="avatar-wrapper"
    open-type="chooseAvatar"
    @chooseavatar="onChooseAvatar"
  >
    <image class="avatar" :src="userAvatarUrl"></image>
  </button>
  <input
    class="username"
    type="nickname"
    placeholder="请输入昵称"
    v-model="nickname"
  />
  <view class="login-btn" @click="onLogin">
    <text class="login-btn-text">登录</text>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Api from "@/api/api";

const userAvatarUrl = ref(
  "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0"
);
const nickname = ref("");
const onChooseAvatar = (e: any) => {
  userAvatarUrl.value = e.detail.avatarUrl;
};
const code = ref("");
const username = ref();

const onLogin = () => {
  console.log(username.value);
  uni.setStorageSync("userAvatarUrl", userAvatarUrl.value);
  uni.setStorageSync("nickname", nickname.value);
  uni.setStorageSync("isLogin", true);
  Api.wxLogin(code.value, nickname.value, userAvatarUrl.value);
  console.log("success");
};

onMounted(() => {
  uni.login({
    provider: "weixin",
    success: (res) => {
      console.log("微信登录成功" + JSON.stringify(res));
      uni.getUserInfo({
        provider: "weixin",
        success: (infoRes) => {
          console.log("获取用户信息成功" + JSON.stringify(infoRes));
          code.value = JSON.parse(JSON.stringify(res)).code;
        },
      });
    },
  });
});
</script>

<style scoped lang="scss"></style>
