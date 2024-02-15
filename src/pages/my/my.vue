<template>
  <view class="body">
    <view class="container">
      <navbar :showChangeSchoolButton="true" />
      <scroll-view
        :scroll-y="true"
        :scroll-with-animation="true"
        style="height: 100%"
      >
        <u-notify ref="Notify" />
        <view class="changeLanguageModal">
          <changeLanguageModal
            :show="showChooseLangualge"
            @confirm="confirmLang"
            @cancel="cancelLang"
          />
        </view>
        <view
          class="head"
          @tap="navTo(RouteConfig.my.login.url)"
          v-if="!isLogin"
        >
          <view class="avatar">
            <u-avatar icon="star-fill" />
          </view>
          <view class="username">
            <view class="username-text">{{ $t("my.未登录用户名") }}</view>
            <view class="username-arrow">
              <u-icon name="arrow-right" :size="20" />
            </view>
          </view>
        </view>
        <view class="head" @tap="navTo(RouteConfig.options.url)" v-else>
          <view class="avatar">
            <up-avatar :src="userAvatarUrl" />
          </view>
          <view class="username">
            <view class="username-text">{{ username }}</view>
            <view class="username-arrow">
              <u-icon name="arrow-right" :size="20" />
            </view>
          </view>
        </view>
        <view class="myFunction">
          <view
            class="myFunctionItems"
            v-for="(item, index) in RouteConfig.my.myItemList"
            @tap="navTo(item.url)"
            :key="index"
          >
            <view class="myFunctionItem">
              <i :class="item.icon" class="item-icon" />
              <view class="myFunctionItemText">
                {{ $t(item.text) }}
              </view>
            </view>
          </view>
        </view>
        <view class="admin-funtions" v-if="isAdmin">
          <u-loadmore
            loadmoreText="管理面板"
            color="#1CD29B"
            lineColor="#1CD29B"
            dashed
            :line="true"
          />
          <view
            class="notices-funtion"
            @tap="navTo(RouteConfig.admin.notices.url)"
          >
            <view class="notices-funtion-text"> 公告管理 </view>
            <view class="notices-funtion-arrow">
              <u-icon name="arrow-right" :size="20" />
            </view>
          </view>
          <view
            class="notices-funtion"
            @tap="navTo(RouteConfig.admin.test.url)"
          >
            <view class="notices-funtion-text"> 测试 </view>
            <view class="notices-funtion-arrow">
              <u-icon name="arrow-right" :size="20" />
            </view>
          </view>
        </view>
        <!-- <view class="swiperContainer">
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
        </view> -->
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar.vue";
import RouteConfig from "@/config/routes";
import changeLanguageModal from "@/components/changeLanguageModal.vue";
import { useI18n } from "vue-i18n";
import { ref, onMounted } from "vue";
import Api from "@/api/api";
import { ErrorHandler, RequestErrorCode } from "@/utils/requestErrors";
import { userLogout } from "@/utils/userManager";

const { t, locale } = useI18n();

const isAdmin = ref(false);
const session = uni.getStorageSync("aueduSession");
const isLogin = ref(session && session.length > 0);
const userAvatarUrl = ref("");
const username = ref(uni.getStorageSync("username"));
const showChooseLangualge = ref(false);
const Notify = ref();

const navTo = (url: any) => {
  if (url === "languageSetting") {
    showChooseLangualge.value = true;
  } else {
    uni.navigateTo({
      url: url,
    });
  }
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
  notify.message = t("my.成功设置语言提示");
  notify.type = "success";
  Notify.value.show(notify);
  showChooseLangualge.value = false;
};

const cancelLang = () => {
  showChooseLangualge.value = false;
};

onMounted(() => {
  if (isLogin.value) {
    Api.getUser(session)
      .then((res: any) => {
        if (res.statusCode === 200) {
          if (res.data.is_staff === true) {
            isAdmin.value = true;
          }
          username.value = res.data.username;
          userAvatarUrl.value = res.data.avatar_url;
          uni.setStorageSync("avatarUrl", res.data.avatar_url);
        } else {
          ErrorHandler(res);
        }
      })
      .catch((err: any) => {
        if (err.code === RequestErrorCode.NotAuthenticatedError) {
          userLogout();
          uni.reLaunch({
            url: RouteConfig.my.url,
          });
          uni.showToast({
            title: t("my.请登录"),
            icon: "none",
          });
        } else {
          uni.showToast({
            title: t(err.message),
            icon: "none",
          });
        }
      });
  }
});
</script>

<style scoped lang="scss">
.body {
  height: 100vh;
  width: 100vw;
  top: 0;
}

.container {
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
  min-height: 100vh;
  background: #a6eeee6c;
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
      margin-left: 10px;
    }
  }
}

.myFunction {
  margin: 0 30px;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  .myFunctionItems {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.324); /* 透明度设置以提高效果 */
    border: 1px solid;
    border-color: rgb(255, 255, 255);
    border-radius: 10px;
    margin: 10px 0;
    .myFunctionItem {
      display: flex;
      align-items: center;
      width: 80%;
      justify-content: space-between;
      padding: 5px;
      height: 50px;
      .item-icon {
        font-size: 1.2rem;
      }
      .myFunctionItemText {
        font-size: 1.2rem;
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

.AvatarContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .uploadAvatar {
    margin-top: 20px;
    display: flex;
    height: 10vh;
    width: 10vh;
    .avatarShow {
      width: 10vh;
      height: 10vh;
    }
  }
  .inputName {
    margin-top: 10px;
    background: rgba(128, 128, 128, 0.123);
    border: 1px solid;
    border-color: white;
    margin-top: 25px;
    border-radius: 10px;
  }
  .avatarFill {
    height: 3vh;
  }
}

.admin-funtions {
  margin: 0 30px;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  .notices-funtion {
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 0.324);
    border: 1px solid;
    border-color: white;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 5px 6px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    border-radius: 10px;
    margin: 10px 0;
    padding: 0 10px;
    .notices-funtion-text {
      font-size: 1.2rem;
    }
    .notices-funtion-arrow {
      margin-left: 10px;
    }
  }
}
</style>
