<template>
  <view class="container">
    <navbar :showChangeSchoolButton="true" />
    <view class="head" @tap="navToChangeAvatar">
      <view class="avatar">
        <u-avatar icon="star-fill" />
      </view>
      <view class="username">
        <view class="username-text">User_name</view>
        <view class="username-arrow">
          <u-icon name="arrow-right" :size="20"></u-icon>
        </view>
      </view>
    </view>
    <view class="myFunction">
      <view class="myFunctionItem" v-for="item in itemList">
        <view class="myFunctionItemBorder">
          <u-icon :name="item.icon" size="30"></u-icon>
          <view class="myFunctionItemText">
            {{ item.text }}
          </view>
        </view>
      </view>
    </view>
    <view class="swiperContainer">
      <view class="swiper">
        <u-swiper
          :list="swiperList"
          keyName="image"
          showTitle
          :autoplay="true"
          circular
          indicator
          indicatorMode="line"
          radius="5"
          bgColor="rgba(0,0,0,0)"
          interval="10000"
        />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar.vue";
import RouteConfig from "@/config/routes";
const itemList = RouteConfig.myItemList;
const navToChangeAvatar = () => {
  uni.navigateTo({
    url: RouteConfig.changeAvator.url,
  });
};

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
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(
    135deg,
    #a6eeee7a 10%,
    #91d8c84d 40%,
    #fcfcd491 60%
  );
}

.head {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  .avatar {
    margin-left: 10px;
  }
  .username {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 20px;
    .username-text {
      font-size: 1.5rem;
    }
    .username-arrow {
      margin-top: 5px;
      margin-left: 10px;
    }
  }
}

.myFunction {
  margin-left: 15px;
  margin-right: 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  .myFunctionItem {
    z-index: 100;
    background-color: rgba(255, 255, 255, 0.324); /* 透明度设置以提高效果 */
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30%;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    .myFunctionItemBorder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 5px;
    }
  }
}

.swiperContainer {
  display: flex;
  justify-content: center;
  align-items: center; 
  .swiper {
    margin-top: 40px;
    width: 350px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  }
}
</style>
