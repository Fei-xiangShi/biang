<template>
  <view class="wx-login-container">
    <view class="wx-login-title">{{ t("微信登录标题") }}</view>
    <view class="wx-login-button" @tap="login">
      {{ t("微信一键登录按钮") }}
    </view>
    <view class="toggle-to-email" @click="$emit('toggleLogin', email)">
      <view class="toggle-to-email-text">{{ t("使用邮箱登录") }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import loginMethods from "@/models/loginMethods";
import { useI18n } from "vue-i18n";
import { ref, onMounted } from "vue";
import Api from "@/api/api";
import RouteConfig from "@/config/routes";

const { t } = useI18n();

const wxLogin = loginMethods.WX;
const email = loginMethods.Email;
const code = ref("");

const login = () => {
  Api.wxLogin(code.value).then((res: any) => {
    if (res.data.success === true) {
      emit("loginSuccess", res);
    } else {
      emit("loginFail", res);
      if (res.statusCode === 400 && res.data.errors[0].code === "blank") {
        navTo(RouteConfig.my.login.wxRegister.url);
      }
    }
  });
};

const navTo = (url: string) => {
  uni.navigateTo({
    url: url,
  });
};

onMounted(() => {
  uni.login({
    provider: "weixin",
    success: (res) => {
      uni.getUserInfo({
        provider: "weixin",
        success: (infoRes) => {
          code.value = res.code;
        },
      });
    },
  });
});

const emit = defineEmits(["loginSuccess", "loginFail", "toggleLogin"]);
</script>

<style lang="scss" scoped>

</style>
