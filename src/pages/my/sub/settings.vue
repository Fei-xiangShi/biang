<template>
  <view class="container">
    <view class="background">
      <navbar />
      <view class="head" enable-background=""> </view>
      <view class="functions">
        <view class="first-area area">
          <u-cell-group>
            <view v-for="item in itemList" class="funtion">
              <u-cell :title="item.text" :isLink="true" :url="item.url" />
            </view>
          </u-cell-group>
        </view>
        <view class="first-gap">
          <view class="gap">
            <view class="gap-line-top" />
            <view class="gap-text">个人工具</view>
            <view class="gap-line-bottom" />
          </view>
        </view>
        <view class="second-area area">
          <u-cell-group>
            <view v-for="item in itemList">
              <u-cell :title="item.text" :isLink="true" :url="item.url" />
            </view>
          </u-cell-group>
        </view>
      </view>
      <view class="logoutButton">
        <u-button type="primary" text="logout" color="red" @tap="logout" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar.vue";
import RouteConfig from "@/config/routes";
const itemList = RouteConfig.my.myItemList;

const logout = () => {
  uni.showModal({
    title: "提示",
    content: "确定要退出登录吗？",
    success: (res) => {
      if (res.confirm) {
        uni.removeStorageSync("classTableUrl");
        uni.removeStorageSync("aueduSession");
        uni.removeStorageSync("classTableContent");
        uni.removeStorageSync("nickname");
        uni.removeStorageSync("userAvatarUrl");
        uni.removeStorageSync("isLogin");
        uni.reLaunch({
          url: "/pages/index/index",
        });
      }
    },
  });
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  .background {
    height: auto;
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(
      135deg,
      #a6eeee7a 10%,
      #91d8c84d 40%,
      #fcfcd491 60%
    );
  }
}

.head {
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
}

.functions {
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  .area {
    display: flex;
    flex-direction: column;
    border: 1px solid #b6b6b690;
    border-radius: var(--borderRadius-medium, 0.375rem);
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    background: rgba(255, 243, 243, 0.23);
  }
  .gap {
    display: flex;
    flex-direction: column;
    margin: 10px;
    .gap-line-bottom {
      height: 1px;
      background-color: #00000016;
      margin-top: 10px;
    }
    .gap-text {
      margin: 0 10px;
    }
  }
}
.logoutButton {
  margin-top: 10px;
  padding: 30px;
}
</style>
