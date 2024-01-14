<template>
  <view class="container">
    <view class="await">
      <navbar :show-change-school-button="true" returnButtonIconColor="white" />
      <image src="../../static/images/4k.webp" class="background" />
      <view class="beautiful-sence">
        <view class="acrylic">
          <view class="gaussian-blur">
            <view class="luminosity-blend">
              <view class="color-blend">
                <view class="noise-texture" />
              </view>
            </view>
          </view>

          <view class="acrylic-content">
            <view class="acrylic-content-Title">
              {{ $t("classTable.导入课表") }}
            </view>
            <view class="input">
              <u-input
                class="url"
                placeholder="请输入内容"
                border="bottom"
                clearable
                color="#d6d6d6"
                v-model="classTableUrl"
                placeholderStyle="color: #d6d6d6"
                confirmType="done"
                @confirm="getNewClassTable"
              />
            </view>
          </view>
        </view>
      </view>
      <view class="submit-btn">
        <button
          class="confirm-btn"
          @click="getNewClassTable"
          :class="[
            classTableUrl == '' || classTableUrl == null ? 'hidden' : 'show',
          ]"
          :style="{
            transform:
              classTableUrl == '' || classTableUrl == null
                ? 'scale(0)'
                : 'scale(1)',
            display: isLoading ? 'none' : 'block',
          }"
        />
        <u-loading-icon mode="semicircle" size="45" v-if="isLoading" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Route from "@/config/routes";
import Api from "@/api/api";
import { ref } from "vue";
import navbar from "@/components/navbar.vue";
import { ErrorHandler } from "@/utils/requestErrors";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const classTableUrl = ref("");
const classTableContent = ref("");
const content = ref(uni.getStorageSync("classTableContent"));
const haveClassTable = ref(
  !(content.value == "" || content.value == null || content.value == undefined)
);
const isLoading = ref(false);

const getNewClassTable = () => {
  if (isLoading.value) return;
  isLoading.value = true;
  Api.receiveCalendar(classTableUrl.value, uni.getStorageSync("aueduSession"))
    .then((res: any) => {
      if (res.data.success) {
        classTableContent.value = res.data.data;
        uni.setStorageSync("classTableContent", classTableContent.value);
        uni.setStorageSync("classTableUrl", classTableUrl.value);
        haveClassTable.value = true;
        uni.reLaunch({
          url: Route.classTablePage.url,
        });
      } else {
        ErrorHandler(res);
      }
    })
    .catch((err: any) => {
      console.log(err);
      uni.showToast({
        title: t(err.message),
        icon: "none",
      });
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>

<style scoped lang="scss">
.await {
  overflow: hidden;
  width: 100%;
  height: 100vh;
  .background {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    z-index: -1;
    overflow: hidden;
  }
  .beautiful-sence {
    position: relative;
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    .acrylic {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 100;
      height: 40vh;
      width: 35vh;
      box-shadow: rgba(0, 0, 0, 0.34) 0px 9px 20px;

      .acrylic-content {
        position: absolute;
        width: 100%;
        .acrylic-content-Title {
          font-size: 1.5rem;
          margin-left: 2rem;
          color: #ededed;
        }
        .input {
          margin: 2rem 2rem;
        }
      }
    }
  }
  .submit-btn {
    position: absolute;
    right: 5.5rem;
    bottom: 15.5rem;
    z-index: 999;
    .confirm-btn {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #4caf50; /* 或其他你喜欢的颜色 */
      border: none;
      position: relative;
      cursor: pointer;
      outline: none;
      transition: transform 0.5s;
    }

    /* 制作勾的两条线段 */
    .confirm-btn::before,
    .confirm-btn::after {
      content: "";
      position: absolute;
      background-color: white;
      border-radius: 6px; /* 让勾稍微圆润一点 */
      border: none;
    }

    /* 勾的短线段 */
    .confirm-btn::before {
      width: 15px;
      height: 2px;
      bottom: 15px;
      left: 10px;
      transform: rotate(45deg);
    }

    /* 勾的长线段 */
    .confirm-btn::after {
      width: 25px;
      height: 2px;
      left: 21px;
      top: 39px;
      transform: rotate(-45deg);
    }
    .hidden {
      animation: rotateToHide 0.5s forwards;
    }
    .show {
      animation: rotateToShow 0.5s forwards;
    }
  }
}

.gaussian-blur {
  height: 100%;
  width: 100%;
  backdrop-filter: blur(30px);
  border-radius: 0.5rem;
}

.luminosity-blend {
  height: 100%;
  width: 100%;
  backdrop-filter: brightness(120%);
  border-radius: 0.5rem;
}

.color-blend {
  height: 100%;
  width: 100%;
  backdrop-filter: saturate(80%);
  background-color: rgb(255, 255, 255);
  opacity: 0.2;
  border-radius: 0.5rem;
}

.noise-texture {
  opacity: 0.8;
  background-size: 30px;
  border-radius: 0.5rem;
}

@keyframes rotateToShow {
  0% {
    transform: rotateY(90deg);
  }
  80% {
    transform: rotateY(-10deg);
  }
  100% {
    transform: rotateY(0deg);
  }
}

@keyframes rotateToHide {
  0% {
    transform: rotateY(0deg);
  }
  80% {
    transform: rotateY(100deg);
  }
  100% {
    transform: rotateY(90deg);
  }
}
</style>
