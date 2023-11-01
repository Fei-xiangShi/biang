<template>
  <view class="container">
    <navbar :showChangeSchoolButton="true" />
    <u-notify ref="Notify" />
    <view class="changeLanguageModal">
      <changeLanguageModal
        :show="showChooseLangualge"
        @confirm="confirmLang"
        @cancel="cancelLang"
      />
    </view>
    <view class="chooseAvatorModal">
      <modal
        :title="t('选择头像')"
        :show="isAvatarChoose"
        :closeOnClickOverlay="true"
        @confirm="onLogin"
        @cancel="cancelAvator"
      >
        <view class="AvatorContainer">
          <view class="uploadAvator">
            <button
              class="avatar-wrapper"
              open-type="chooseAvatar"
              @chooseavatar="onChooseAvatar"
            >
              <image class="avatar" :src="userAvatarUrl"></image>
            </button>
          </view>
          <view class="inputName">
            <input
              class="username"
              type="nickname"
              placeholder="请输入昵称"
              v-model="nickname"
            />
          </view>
          <view class="avatorFill"></view>
        </view>
      </modal>
    </view>
    <view class="head" @tap="navToLogin" v-if="!isLogin">
      <view class="avatar">
        <u-avatar icon="star-fill" />
      </view>
      <view class="username">
        <view class="username-text">{{ $t("未登录提示") }}</view>
        <view class="username-arrow">
          <u-icon name="arrow-right" :size="20" />
        </view>
      </view>
    </view>
    <view class="head" @tap="navToChangeAvatar" v-else>
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
      <view
        class="myFunctionItem"
        v-for="item in itemList"
        @tap="functionMethod(item.func)"
      >
        <view class="myFunctionItemBorder">
          <i :class="item.icon"></i>
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
import changeLanguageModal from "@/components/changeLanguageModal.vue";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import modal from "@/components/modal.vue";
import Api from "@/api/api";

const isLogin = ref(false);
const isAvatarChoose = ref(false);
const userAvatarUrl = ref(
  "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0"
);
const nickname = ref("");
const onChooseAvatar = (e: any) => {
  userAvatarUrl.value = e.detail.avatarUrl;
};
const code = ref("");
const username = ref();

const { t, locale } = useI18n();

const itemList = RouteConfig.my.myItemList;

const functionMethod = (index: any) => {
  if (index === "languageSetting") {
    showChooseLangualge.value = true;
  }
  console.log(index);
};

const navToChangeAvatar = () => {
  uni.navigateTo({
    url: RouteConfig.my.setting.url,
  });
};

const navToLogin = () => {
  // uni.navigateTo({
  //   url: RouteConfig.my.login.url,
  // });
  isAvatarChoose.value = true;
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

const showChooseLangualge = ref(false);
const Notify = ref();
let notify = {
  message: "",
  type: "primary",
  color: "#ffffff",
  top: 85,
};

const confirmLang = (id: any) => {
  switch (Number(id)) {
    case 0:
      uni.setStorageSync("lang", uni.getLocale());
      break;
    case 1:
      uni.setStorageSync("lang", "zh-Hans");
      break;
    case 2:
      uni.setStorageSync("lang", "zh-Hant");
      break;
    case 3:
      uni.setStorageSync("lang", "en");
      break;
  }
  locale.value = uni.getStorageSync("lang");
  notify.message = t("成功设置语言提示");
  notify.type = "success";
  Notify.value.show(notify);
  showChooseLangualge.value = false;
};

const cancelLang = () => {
  showChooseLangualge.value = false;
};

const cancelAvator = () => {
  isAvatarChoose.value = false;
};

let lang = uni.getStorageSync("lang");


const onLogin = () => {
  console.log(username.value);
  uni.setStorageSync("userAvatarUrl", userAvatarUrl.value);
  uni.setStorageSync("nickname", nickname.value);
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
  uni.setStorageSync("isLogin", true);
  Api.wxLogin(code.value, nickname.value, userAvatarUrl.value);
  console.log("success");
  isAvatarChoose.value = false;
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
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
  margin-left: 30px;
  margin-right: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  .myFunctionItem {
    z-index: 100;
    background-color: rgba(255, 255, 255, 0.324); /* 透明度设置以提高效果 */
    border: 1px solid;
    border-color: white;
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30%;
    height: 50px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 5px 6px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    border-radius: 10px;
    .myFunctionItemBorder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 5px;
      .myFunctionItemText {
        font-size: 0.7rem;
      }
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

.AvatorContainer{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .uploadAvator{
    margin-top: 20px;
    display: flex;
    height: 10vh;
    width: 10vh;
  }
  .inputName{
    margin-top: 10px;
    background: rgba(128, 128, 128, 0.123);
    border: 1px solid;
    border-color: white;
    margin-top: 25px;
    border-radius: 10px;
  }
  .avatorFill{
    height: 3vh;
  }
}
</style>
