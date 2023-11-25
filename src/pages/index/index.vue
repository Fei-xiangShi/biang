<template>
  <u-notify ref="Notify" />
  <view class="changeLanguageModal">
    <changeLanguageModal
      :show="showChooseLangualge"
      @confirm="confirmLang"
      @cancel="cancelLang"
    />
  </view>
  <view class="container">
    <view class="navbar">
      <navbar :showChangeSchoolButton="true" />
    </view>

    <view class="swiper">
      <u-swiper
        :list="swiperList"
        keyName="image"
        showTitle
        :autoplay="true"
        circular
        indicator
        indicatorMode="line"
        previousMargin="30"
        nextMargin="30"
        radius="5"
        bgColor="rgba(0,0,0,0)"
      />
    </view>
    <view class="search-class white-blur">
      <view class="search-title">
        {{ $t("课程查找标题") }}
      </view>
      <view class="search-input-area">
        <view class="course_code">
          <u-input
            :placeholder="t('课程代码输入框提示')"
            border="bottom"
            clearable
            v-model="courseCode"
          />
        </view>
        <view class="unit_code">
          <u-form>
            <u-form-item
              :label="t('单元')"
              borderBottom
              @click="
                loadUnits();
                hideKeyboard();
              "
            >
              <u-input
                v-model="unitCode"
                disabled
                disabledColor="rgb(0,0,0,0)"
                :placeholder="t('单元号选择框提示')"
                border="none"
              />
              <u-icon slot="right" name="arrow-right"/>
            </u-form-item>
          </u-form>
          <u-picker
            :show="showUnitsPicker"
            :columns="unitCodes"
            closeOnClickOverlay
            @cancel="cancelPick"
            @confirm="confirmPick"
            @close="closePick"
            @change="changePick"
            :loading="pickerLoading"
            :title="pickerTitle"
            :confirmText="t('确认')"
            :cancelText="t('取消')"
          />
        </view>
      </view>
      <view class="search-button" @tap="searchClass">
        {{ $t("课表查询按钮") }}
      </view>
      <view class="search-text">
        <view class="search-text-title">{{ $t("课程逐层查找提示") }}</view>
        <view class="search-nav-icon">
          <u-icon name="arrow-right" :size="14" color="black" />
        </view>
      </view>
    </view>
    <view class="roll-notice">
      <u-notice-bar
        :text="notices.text"
        mode="link"
        direction="row"
        :step="true"
      />
    </view>
    <view class="cards">
      <view class="class-query-card" @tap="redirectToClassTable">
        <view class="title">
          <view class="title-text">{{ $t("课表查询按钮标题") }}</view>
        </view>
        <view class="content">
          <view class="content-text">{{ $t("课表查询按钮内容") }}</view>
        </view>
      </view>

      <view class="three-cards">
        <view class="swipe-card">
          <u-swiper
            :list="swipeCard"
            keyName="image"
            radius="5"
            bgColor="rgba(0,0,0,0)"
            :autoplay="true"
            circular
            indicator
            indicatorMode="line"
          />
        </view>
        <view class="column-two">
          <view class="todo">
            <view class="todo-title">{{ $t("待办按钮标题") }}</view>
            <view class="todo-content">
              <u-notice-bar
                :text="todoList"
                direction="column"
                color="black"
                bgColor="rgba(0,0,0,0)"
                icon=""
              />
            </view>
          </view>
          <view class="kit">
            <view class="kit-title">{{ $t("校园好礼按钮标题") }}</view>
            <view class="kit-content">{{ $t("校园好礼按钮内容") }}</view>
          </view>
        </view>
      </view>

      <view class="two-cards">
        <view class="purchase-card">
          <view class="title">
            <view class="title-text">{{ $t("特惠按钮标题") }}</view>
          </view>
          <view class="content">
            <view class="content-text">{{ $t("特惠按钮内容") }}</view>
            <u-icon name="arrow-right" :size="8" color="black" />
          </view>
        </view>
        <view class="store-card">
          <view class="title">
            <view class="title-text">{{ $t("商店按钮标题") }}</view>
          </view>
          <view class="content">
            <view class="content-text">{{ $t("商店按钮内容") }}</view>
            <u-icon name="arrow-right" :size="8" color="black" />
          </view>
        </view>
      </view>
    </view>
    <view class="tail">
      <view class="pic" />
    </view>
  </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar.vue";
import RouteConfig from "@/config/routes";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import changeLanguageModal from "@/components/changeLanguageModal.vue";
import Api from "@/api/api";

const { t, locale } = useI18n();

const todoList = [
  "今日待办1",
  "今日待办2",
  "今日待办3",
  "今日待办4",
  "今日待办5",
  "今日待办6",
  "今日待办7",
  "今日待办8",
  "今日待办9",
  "今日待办10",
  "今日待办11",
  "今日待办12",
  "今日待办13",
  "今日待办14",
  "今日待办15",
  "今日待办16",
  "今日待办17",
  "今日待办18",
  "今日待办19",
  "今日待办20",
  "今日待办21",
  "今日待办22",
  "今日待办23",
  "今日待办24",
  "今日待办25",
  "今日待办26",
  "今日待办27",
  "今日待办28",
  "今日待办29",
  "今日待办30",
  "今日待办31",
  "今日待办32",
  "今日待办33",
  "今日待办34",
  "今日待办35",
  "今日待办36",
  "今日待办37",
  "今日待办38",
  "今日待办39",
  "今日待办40",
  "今日待办41",
];

const swipeCard = [
  {
    image:
      "https://img.zcool.cn/community/011b0e5cc434b2a801208f8b0af332.jpg@1280w_1l_2o_100sh.jpg",
    title: "昨夜星辰昨夜风，画楼西畔桂堂东",
  },
  {
    image:
      "https://th.bing.com/th/id/R.79ecb19a8f95736b29ee62eef2b9c255?rik=eagmh0omAjx0Qg&riu=http%3a%2f%2fpic1.16xx8.com%2fallimg%2fhiobi2%2f4-1ZGGG61HB.jpg&ehk=ZGBYCjbRWAm6ZRlLqaV1QUS1CBA4x%2bg220TcJL%2b53Yg%3d&risl=&pid=ImgRaw&r=0",
    title: "身无彩凤双飞翼，心有灵犀一点通",
  },
  {
    image:
      "https://pic1.zhimg.com/v2-1cbbf2c8ad2fb882586fed4a287106b0_r.jpg?source=1940ef5c",
    title: "谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳",
  },
];

const notices = ref({ text: [] as string[] });

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

const courseCode = ref("");
const unitCodes = ref();
const unitCode = ref("");
const showUnitsPicker = ref(false);
const pickerLoading = ref(false);
const pickerTitle = ref("");

const cancelPick = () => {
  showUnitsPicker.value = false;
};

const confirmPick = (e: any) => {
  unitCode.value = e.value;
  showUnitsPicker.value = false;
};

const closePick = () => {
  showUnitsPicker.value = false;
};

const changePick = (e: any) => {
  unitCode.value = e.value;
};

const loadUnits = () => {
  if (courseCode.value == "" || courseCode.value == null) {
    notify.message = t("课程代码为空提示");
    notify.type = "warning";
    Notify.value.show(notify);
    return;
  }
  showUnitsPicker.value = true;
  pickerLoading.value = true;
  Api.getUnits(courseCode.value, uni.getStorageSync("schoolId")).then((res: any) => {
    if (res.statusCode == 200) {
      pickerTitle.value = t("单元号选择框提示");
      unitCodes.value = [res.data.units];
    } else {
      pickerTitle.value = t("无单元号提示");
    }
    pickerLoading.value = false;
  });
};

const searchClass = () => {
  if (courseCode.value == "" || courseCode.value == null) {
    notify.message = t("课程代码为空提示");
    notify.type = "warning";
    Notify.value.show(notify);
    return;
  }
  if (unitCode.value == "" || unitCode.value == null) {
    notify.message = t("单元号为空提示");
    notify.type = "warning";
    Notify.value.show(notify);
    return;
  }
  uni.navigateTo({
    url: `${RouteConfig.classDetail.url}?courseCode=${courseCode.value}&unitCode=${unitCode.value}`,
  });
};

const redirectToClassTable = () => {
  uni.reLaunch({
    url: RouteConfig.classTablePage.url,
  });
};

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
  notify.type = "primary";
  uni.setStorageSync("lang", uni.getLocale());
  notify.message = t("取消设置语言提示");
  Notify.value.show(notify);
  showChooseLangualge.value = false;
};

let lang = uni.getStorageSync("lang");
onMounted(() => {
  if (!lang || lang.length == 0 || lang == null || lang == undefined) {
    showChooseLangualge.value = true;
  }
  Api.notices().then((res: any) => {
    if (res.statusCode === 200) {
      let noticeList = { text: [] as string[] };
      for (let i = 0; i < res.data.length; i++) {
        const language = uni.getStorageSync("lang");
        const noticeItem = res.data[i][language];
        if (typeof noticeItem === "string" && noticeItem !== "") {
          noticeList.text.push(noticeItem);
        }
      }
      notices.value = noticeList;
    }
  });
});

const hideKeyboard = () => {
  uni.hideKeyboard();
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #a6eeeea3 10%,
    #ecb4ee52 40%,
    #e9f8f883 60%
  );
}

.toolbox {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 20px;
  .toolbox-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 25%;
    .toolbox-item-text {
      font-size: 12px;
      color: #606266;
      margin-top: 5px;
    }
  }
}

.white-blur {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  margin: 5px 20px 0px 20px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: var(--borderRadius-medium, 0.375rem);
  box-shadow: rgba(0, 0, 0, 0.1) 2.4px 2.4px 3.2px;
  .white-blur-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 20%;
    .white-blur-item-text {
      font-size: 12px;
      color: #606266;
      margin-top: 5px;
    }
  }
}

.search-class {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 20px 0;
  border-radius: var(--borderRadius-medium, 0.375rem);
  .search-title {
    display: flex;
    align-items: center;
    margin: 10px 0px;
    font-size: 1.5rem;
    color: cornflowerblue;
    font-family: "LXGW WenKai";
  }
  .search-input-area {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0px 0px;
    .course_code {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 40%;
      border-radius: var(--borderRadius-medium, 0.375rem);
    }
    .unit_code {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 40%;
      border-radius: var(--borderRadius-medium, 0.375rem);
    }
  }
  .search-button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    margin: 10px 0;
    height: 2rem;
    width: 65%;
    border-radius: var(--borderRadius-medium, 0.375rem);
    background: linear-gradient(
      90deg,
      rgba(220, 71, 228, 0.442) 40%,
      rgba(220, 71, 228, 0.316) 95%
    );
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
    .search-button-text {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      color: black;
      font-family: "LXGW WenKai";
    }
  }
  .search-text {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
}

.roll-notice {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px 10px;
  padding: 10px;
  border-radius: var(--borderRadius-medium, 0.375rem);
}

.cards {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px 20px;
  border-radius: var(--borderRadius-medium, 0.375rem);
  .class-query-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: url("https://img.zcool.cn/community/01662f554243770000019ae9cb94c1.jpg@1280w_1l_2o_100sh.jpg");
    height: 100px;
    border-radius: var(--borderRadius-medium, 0.375rem);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    .title {
      display: flex;
      align-items: center;
      .title-text {
        margin-left: 10px;
        font-size: 1.5rem;
        color: cornflowerblue;
        font-family: "LXGW WenKai";
      }
    }
    .content {
      display: flex;
      align-items: center;
      .content-text {
        margin-left: 4rem;
        font-size: 1rem;
        color: gray;
        font-family: "LXGW WenKai";
      }
    }
  }
  .three-cards {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 0px;
    border-radius: var(--borderRadius-medium, 0.375rem);
    .swipe-card {
      display: flex;
      width: 35%;
      flex-direction: column;
      justify-content: center;
      border-radius: var(--borderRadius-medium, 0.375rem);
    }
    .column-two {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 60%;
      border-radius: var(--borderRadius-medium, 0.375rem);
    }
    .todo {
      background: linear-gradient(90deg, rgba(255, 0, 0, 0.116) 10%, white 90%);
      box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-radius: var(--borderRadius-medium, 0.375rem);
      .todo-title {
        display: flex;
        align-items: center;
        font-weight: bold;
        height: 0.5rem;
        margin-left: 1rem;
        margin-top: 0.8rem;
        .title-text {
          font-size: 1rem;
          color: black;
        }
      }
      .todo-content {
        display: flex;
        align-items: center;
        margin: 0 0.35rem;
      }
    }
    .kit {
      box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 4.3rem;
      background: linear-gradient(
        90deg,
        rgba(220, 71, 228, 0.442) 40%,
        rgba(220, 71, 228, 0.316) 95%
      );
      border-radius: var(--borderRadius-medium, 0.375rem);
      .kit-title {
        display: flex;
        align-items: center;
        font-weight: bold;
        margin-left: 1rem;
      }
      .kit-content {
        display: flex;
        margin: 0 1rem;
        font-size: 0.6rem;
      }
    }
  }
  .two-cards {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .purchase-card {
      background: linear-gradient(60deg, #a6eeee6c 50%, #ffffff59 90%);
      min-height: 60px;
      width: 60%;
      border-radius: var(--borderRadius-medium, 0.375rem);
      box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
        rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
      .title {
        display: flex;
        height: 1.5rem;
        margin-left: 1rem;
        margin-top: 0.8rem;
        .title-text {
          font-size: 1.2rem;
          color: black;
        }
      }
      .content {
        display: flex;
        align-items: center;
        margin: 0 1rem;
        .content-text {
          font-size: 0.6rem;
          color: rgb(28, 94, 217);
          font-family: "LXGW WenKai";
        }
      }
    }
    .store-card {
      background: linear-gradient(300deg, #ffffff1f 5%, #eeb82f6c 95%);
      min-height: 60px;
      width: 38%;
      border-radius: var(--borderRadius-medium, 0.375rem);
      box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
        rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
      .title {
        display: flex;
        /* align-items: center; */
        height: 1.5rem;
        margin-left: 1rem;
        margin-top: 0.8rem;
        .title-text {
          font-size: 1.2rem;
        }
      }
      .content {
        display: flex;
        align-items: center;
        margin: 0 1rem;
        .content-text {
          font-size: 0.6rem;
          color: chocolate;
          font-family: "LXGW WenKai";
        }
      }
    }
  }
}

.tail {
  margin-top: 1rem;
  height: 30px;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .pic {
    height: 30px;
    width: 100%;
    background: url("https://th.bing.com/th/id/R.79ecb19a8f95736b29ee62eef2b9c255?rik=eagmh0omAjx0Qg&riu=http%3a%2f%2fpic1.16xx8.com%2fallimg%2fhiobi2%2f4-1ZGGG61HB.jpg&ehk=ZGBYCjbRWAm6ZRlLqaV1QUS1CBA4x%2bg220TcJL%2b53Yg%3d&risl=&pid=ImgRaw&r=0");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>
