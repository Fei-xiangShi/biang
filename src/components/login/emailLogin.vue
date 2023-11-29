<template>
    <view class="toggle-to-wx" @click="$emit('toggleLogin', wxLogin)">
        <view class="toggle-to-wx-text">使用微信登录</view>
    </view>
</template>

<script setup lang="ts">
import loginMethods from "@/models/loginMethods";

const wxLogin = loginMethods.WX;
const email = loginMethods.Email;

defineEmits(["loginSuccess", "loginFail", "toggleLogin"]);
</script>