<template>
    <navbar />
    <view class="login-container">
      <view class="icon"></view>
      <view class="title-text">{{ $t("注册新账号") }}</view>
      <view class="sub-title-text">{{ $t("登录副标题提示") }}</view>
      <view class="school-select-input">
        <u-form>
          <u-form-item
            :label="t('学校选择框标题')"
            borderBottom
            @click="hideKeyboard"
          >
            <u-input
              v-model="schoolName"
              disabled
              disabledColor="rgb(0,0,0,0)"
              :placeholder="t('学校选择框占位符')"
              border="none"
            />
            <u-icon slot="right" name="arrow-right" />
          </u-form-item>
        </u-form>
        <u-picker
          :show="showSchoolPicker"
          :columns="schools"
          closeOnClickOverlay
          @cancel="cancelPick"
          @confirm="confirmPick"
          @close="closePick"
          :loading="pickerLoading"
          :title="pickerTitle"
        />
      </view>
      <view class="next">
        <view class="create-account">{{ $t("创建账号") }}</view>
        <view class="next-step">
          <view class="next-step-text">{{ $t("下一步") }}</view>
        </view>
      </view>
      <view class="wx-login">
        <view class="wx-login-text">{{ $t("微信一键登录") }}</view>
      </view>
    </view>
  </template>
  
  <script setup lang="ts">
  import universities from "@/config/universities";
  import { useI18n } from "vue-i18n";
  import { ref } from "vue";
  import navbar from "@/components/navbar.vue";
  
  const { t } = useI18n();
  
  const schoolName = ref("");
  const showSchoolPicker = ref(false);
  const schools = [Object.keys(universities)];
  const pickerLoading = ref(false);
  const pickerTitle = ref(t("学校选择"));
  
  const cancelPick = () => {
    showSchoolPicker.value = false;
  };
  
  const confirmPick = (selection: any) => {
    schoolName.value = selection.value;
    showSchoolPicker.value = false;
  };
  
  const closePick = () => {
    showSchoolPicker.value = false;
  };
  
  const hideKeyboard = () => {
    showSchoolPicker.value = true;
    uni.hideKeyboard();
  };
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
      .next-step {
        width: 80px;
        height: 40px;
        background-color: #f5f5f5;
        border-radius: 20px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .next-step-text {
          font-size: 14px;
          color: #333;
        }
      }
    }
    .wx-login {
      width: 100%;
      margin-top: 40px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .wx-login-text {
        font-size: 14px;
        color: #999999;
      }
    }
  }
  </style>
  