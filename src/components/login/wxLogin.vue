<template>
    <view class="toggle-to-email" @click="$emit('toggleLogin', email)">
        <view class="toggle-to-email-text">使用邮箱登录</view>
    </view>
</template>

<script setup lang="ts">
import loginMethods from "@/models/loginMethods";

const wxLogin = loginMethods.WX;
const email = loginMethods.Email;

defineEmits(["loginSuccess", "loginFail", "toggleLogin"]);
</script>