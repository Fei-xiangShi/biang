<template>
  <view class="login-container">
    <view class="icon"></view>
    <view class="title-text">{{ $t("登录") }}</view>
    <view class="sub-title-text">{{ $t("微信登录副标题提示") }}</view>
    <view class="school-select-input">
      <view class="wx-login-container">
        <view class="wx-login" @tap="WxLogin">
          <view class="wx-login-text">
            {{ $t("微信登录") }}
          </view>
        </view>
      </view>
      <view class="next">
        <view
          class="create-account"
          @tap="navTo(RouteConfig.my.login.register.url)"
          >{{ $t("创建账号") }}</view
        >
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref, onMounted } from "vue";
import RouteConfig from "@/config/routes";
import Api from "@/api/api";
const { t } = useI18n();

const code = ref("");

const navTo = (url: any) => {
  uni.navigateTo({
    url: url,
  });
};

const WxLogin =()=> (Api.wxLogin(code.value).then((res:any) => {
  console.log(res);
  if (res.success === "登录成功") {
    uni.setStorageSync('auedu_session', res.auedu_session);
    uni.showToast({
      title: t('登录成功'),
      icon: 'none',
      duration: 2000
    });
    setTimeout(() => {
      uni.reLaunch({
        url: "/pages/my/my"
      });
    }, 3000); // 延迟3秒后跳转
  } else {
    if(false){}//这个地方判断状态码，决定是要补全登录信息还是直接报错
    uni.showToast({
      title: t('登录失败，请先注册'),
      icon: 'none',
      duration: 2000
    });
  }
}));


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

<style lang="scss">
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 50px;
  .icon {
    width: 100px;
    height: 100px;
    background-color: #f5f5f5;
    border-radius: 50%;
  }
  .title-text {
    font-size: 24px;
    font-weight: bold;
    margin-top: 20px;
  }
  .sub-title-text {
    font-size: 14px;
    color: #999;
    margin-top: 10px;
  }
  .school-select-input {
    width: 100%;
    margin-top: 40px;
    u-form {
      width: 100%;
      u-form-item {
        width: 100%;
        u-input {
          width: 100%;
          height: 40px;
          font-size: 14px;
          color: #333;
          background-color: #f5f5f5;
          border-radius: 20px;
          padding: 0 20px;
          margin-top: 10px;
        }
      }
    }
    .next {
      width: 100%;
      margin-top: 40px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .create-account {
        font-size: 14px;
        color: #999999;
      }
    }
  }
  .wx-login-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: rgb(24, 236, 115);
    border-radius: 10px;
    box-shadow: 0px 0px 10px gray;
    .wx-login {
      width: 100%;
      height: 40px;
      font-size: 14px;
      color: #333;
      border-radius: 20px;
      padding: 0 20px;
      margin-top: 10px;
      .wx-login-text {
        font-size: 20px;
        color: #333;
        text-align: center;
      }
    }
  }
}
</style>
