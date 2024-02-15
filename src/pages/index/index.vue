<template>
  <u-overlay :show="naving">
    <view class="overlay-container">
      <view class="login-notice" @tap.stop>
        <u-loading-icon mode="circle" />
        <view class="login-notice-text">
          {{ $t("index.加载中") }}
        </view>
      </view>
    </view>
  </u-overlay>
  <view class="changeLanguageModal">
    <changeLanguageModal
      :show="showChooseLangualge"
      @confirm="confirmLang"
      @cancel="cancelLang"
    />
  </view>
  <u-notify ref="Notify" />
  <view class="container">
    <scroll-view
      :scroll-y="true"
      :scroll-with-animation="true"
      style="height: 100%"
    >
    <navbar :showChangeSchoolButton="true" />
      <!-- <view class="swiper">
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
      </view> -->
      <view class="search-class white-blur">
        <view class="search-title">
          {{ $t("index.课程查找标题") }}
        </view>
        <view class="search-input-area">
          <view class="course_code">
            <u-input
              :placeholder="t('index.课程代码输入框提示')"
              border="bottom"
              clearable
              v-model="courseCode"
              @change="courseCode = courseCode.toUpperCase();"
            />
          </view>
          <view class="unit_code">
            <u-form>
              <u-form-item
                :label="t('index.单元')"
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
                  :placeholder="t('index.单元号选择框提示')"
                  border="none"
                />
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
              :confirmText="t('index.确认')"
              :cancelText="t('index.取消')"
            />
          </view>
        </view>
        <view class="search-button" @tap="searchClass">
          {{ $t("index.课表查询按钮") }}
        </view>
        <view class="search-text">
          <view class="search-text-title">
            {{ $t("index.课程逐层查找提示") }}
          </view>
          <view class="search-nav-icon">
            <u-icon name="arrow-right" :size="14" color="black" />
          </view>
        </view>
      </view>
      <view class="roll-notice" v-if="notices.text.length != 0">
        <u-notice-bar
          :text="notices.text"
          mode="link"
          direction="row"
          :step="true"
        />
      </view>
      <view class="cards">
        <view class="class-query" v-if="!haveClassTable">
          <view class="class-query-card" @tap="redirectToClassTable">
            <view class="title">
              <view class="title-text">{{ $t("index.课表查询按钮标题") }}</view>
            </view>
            <view class="content">
              <view class="content-text">
                {{ $t("index.课表查询按钮内容") }}</view
              >
            </view>
          </view>
        </view>
        <view class="today-class" v-else>
          <view class="today-class-left">
            <view class="head">
              <view class="date">
                {{ new Date().toLocaleDateString() }}
              </view>
              <view class="progress-line" v-if="classCount">
                <u-line-progress
                  :percentage="classPercentage"
                  activeColor="green"
                />
              </view>
            </view>

            <view class="class-count">
              {{ $t("index.日程数量") + `: ` + classCount }}
            </view>
          </view>
          <view class="today-class-right" @tap="redirectToClassTable">
            <view class="today-class-area">
              <view class="no-class" v-if="todayClass.length <= 0">
                {{ $t("index.今日无课") }}
              </view>
              <view
                class="classes"
                v-for="(course, index) in todayClass"
                :key="index"
                v-else
              >
                <view class="course">
                  <view
                    class="course-status"
                    :class="{ done: course.finised }"
                  />
                  <view class="course-text">
                    <view
                      class="course-name"
                      :class="{ 'done-title': course.finised }"
                    >
                      {{ course.summary[lang] }}
                    </view>
                    <view class="course-time">
                      {{
                        new Date(course.start).toLocaleTimeString("zh-CN", {
                          hour12: false,
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      }}
                      -
                      {{
                        new Date(course.end).toLocaleTimeString("zh-CN", {
                          hour12: false,
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      }}
                    </view>
                  </view>
                </view>
              </view>
            </view>
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
              <view class="todo-title">{{ $t("index.待办按钮标题") }}</view>
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
              <view class="kit-title">
                {{ $t("index.校园好礼按钮标题") }}
              </view>
              <view class="kit-content">
                {{ $t("index.校园好礼按钮内容") }}
              </view>
            </view>
          </view>
        </view>

        <view class="two-cards">
          <view class="purchase-card">
            <view class="title">
              <view class="title-text">{{ $t("index.特惠按钮标题") }}</view>
            </view>
            <view class="content">
              <view class="content-text">{{ $t("index.特惠按钮内容") }}</view>
              <u-icon name="arrow-right" :size="8" color="black" />
            </view>
          </view>
          <view class="store-card">
            <view class="title">
              <view class="title-text">{{ $t("index.商店按钮标题") }}</view>
            </view>
            <view class="content">
              <view class="content-text">{{ $t("index.商店按钮内容") }}</view>
              <u-icon name="arrow-right" :size="8" color="black" />
            </view>
          </view>
        </view>
      </view>
      <view class="tail">
        <!-- <view class="pic" /> -->
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar.vue";
import RouteConfig from "@/config/routes";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import changeLanguageModal from "@/components/changeLanguageModal.vue";
import Api from "@/api/api";
import { ErrorHandler } from "@/utils/requestErrors";

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
const courseCode = ref("");
const unitCodes = ref();
const unitCode = ref("");
const showUnitsPicker = ref(false);
const pickerLoading = ref(false);
const pickerTitle = ref("");
const classes = uni.getStorageSync("classTableContent");
const haveClassTable = ref(classes && classes.length > 0);
const todayClass = ref([]) as any;
const classCount = ref(0);
const classPercentage = ref(100);

if (haveClassTable.value) {
  let done = 0;
  classes.forEach((element: any) => {
    if (new Date(element.start) === new Date()) {
      element.finised = new Date(element.end).getTime() < new Date().getTime();
      if (element.finised) {
        done++;
      }
      todayClass.value.push(element);
      classCount.value++;
      classPercentage.value = Math.round((1 - done / classCount.value) * 100);
    }
  });
}

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
    notify.message = t("index.课程代码为空提示");
    notify.type = "warning";
    Notify.value.show(notify);
    return;
  }
  showUnitsPicker.value = true;
  pickerLoading.value = true;
  Api.getUnits(courseCode.value, uni.getStorageSync("schoolId"))
    .then((res: any) => {
      if (res.data.success) {
        pickerTitle.value = t("index.单元号选择框提示");
        unitCodes.value = [res.data.units];
      } else {
        pickerTitle.value = t("index.无单元号提示");
        unitCodes.value = [];
        ErrorHandler(res);
      }
    })
    .catch((err: any) => {
      console.log(err);
    })
    .finally(() => {
      pickerLoading.value = false;
    });
};

const naving = ref(false);
const searchClass = () => {
  if (naving.value) {
    return;
  }
  naving.value = true;
  if (courseCode.value == "" || courseCode.value == null) {
    notify.message = t("index.课程代码为空提示");
    notify.type = "warning";
    Notify.value.show(notify);
    return;
  }
  if (unitCode.value == "" || unitCode.value == null) {
    notify.message = t("index.单元号为空提示");
    notify.type = "warning";
    Notify.value.show(notify);
    return;
  }
  uni.navigateTo({
    url: `${RouteConfig.classDetail.url}?courseCode=${courseCode.value}&unitCode=${unitCode.value}`,
  });
  naving.value = false;
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
  notify.message = t("index.成功设置语言提示");
  notify.type = "success";
  Notify.value.show(notify);
  showChooseLangualge.value = false;
};

const cancelLang = () => {
  notify.type = "primary";
  uni.setStorageSync("lang", uni.getLocale());
  notify.message = t("index.取消设置语言提示");
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
  height: 100vh;
  width: 100vw;
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
    text-align: center;
    margin: 10px 0px;
    font-size: 1.5rem;
  }
  .search-input-area {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0;
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
    margin: 10px 0 5px 0;
    height: 2rem;
    width: 65%;
    color: rgb(0, 108, 209);
    border: rgb(0, 108, 209) 1px solid;
    border-radius: var(--borderRadius-medium, 0.5rem);
  }
  .search-text {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .search-text-title {
      font-size: 0.8rem;
      color: rgb(116, 116, 116);
    }
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
  margin: 10px 20px;
  border-radius: var(--borderRadius-medium, 0.375rem);
  .class-query-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: url("https://img.zcool.cn/community/01662f554243770000019ae9cb94c1.jpg@1280w_1l_2o_100sh.jpg");
    height: 100px;
    border-radius: var(--borderRadius-medium, 0.375rem);
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      .title-text {
        font-size: 1.5rem;
        color: cornflowerblue;
      }
    }
    .content {
      display: flex;
      align-items: center;
      justify-content: center;
      .content-text {
        font-size: 1rem;
        color: gray;
      }
    }
  }
  .three-cards {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 0px;
    border-radius: var(--borderRadius-medium, 0.375rem);
    height: auto;
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
      background: linear-gradient(
        90deg,
        rgba(255, 92, 92, 0.116) 10%,
        rgba(239, 244, 195, 0.418) 90%
      );
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-radius: var(--borderRadius-medium, 0.375rem);
      position: relative;
      height: auto;
      margin-bottom: 0.5rem;
      .todo-title {
        display: flex;
        align-items: center;
        font-weight: bold;
        margin-left: 1rem;
        margin-top: 0.5rem;
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
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: -webkit-fill-available;
      max-height: 60px;
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
    height: auto;
    .purchase-card {
      background: linear-gradient(60deg, #a6eeee6c 50%, #d6fcc296 90%);
      width: 60%;
      border-radius: var(--borderRadius-medium, 0.375rem);
      display: flex;
      flex-direction: column;
      justify-content: center;
      .title {
        display: flex;
        margin: 0.5rem 1rem 0 1rem;
        .title-text {
          font-size: 1.2rem;
          color: black;
        }
      }
      .content {
        display: flex;
        align-items: center;
        margin: 0 1rem 0.5rem 1rem;
        .content-text {
          font-size: 0.6rem;
          color: rgb(28, 94, 217);
        }
      }
    }
    .store-card {
      background: linear-gradient(300deg, #f0a5a51f 5%, #eeb82f6c 95%);
      width: 38%;
      border-radius: var(--borderRadius-medium, 0.375rem);
      display: flex;
      flex-direction: column;
      justify-content: center;
      .title {
        display: flex;
        margin: 0.5rem 1rem 0 1rem;
        .title-text {
          font-size: 1.2rem;
        }
      }
      .content {
        display: flex;
        align-items: center;
        margin: 0 1rem 0.5rem 1rem;
        .content-text {
          font-size: 0.6rem;
          color: chocolate;
        }
      }
    }
  }
  .today-class::after {
    filter: blur(5px);
  }
  .today-class {
    background: rgba(255, 255, 255, 0.5);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 0px;
    border-radius: var(--borderRadius-medium, 0.375rem);
    min-height: 11.5rem;
    padding: 1rem 0.8rem;
    .today-class-left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 40%;
      border-radius: var(--borderRadius-medium, 0.375rem);
      margin-right: 0.5rem;
      .head {
        display: flex;
        flex-direction: column;
        .date {
          display: flex;
          align-items: center;
          font-size: 1.2rem;
          color: black;
        }
        .progress-line {
          display: flex;
          align-items: center;
          margin-top: 0.8rem;
        }
      }
      .class-count {
        display: flex;
        align-items: center;
        font-size: 0.8rem;
        color: rgba(116, 116, 116);
      }
    }
    .today-class-right {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 65%;
      border-radius: var(--borderRadius-medium, 0.375rem);
      .today-class-area {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        border-radius: var(--borderRadius-medium, 0.375rem);
        .no-class {
          background: rgb(216, 216, 216);
          width: 100%;
          height: 100%;
          border-radius: 1rem;
          display: flex;
          text-align: center;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: black;
        }
        .classes {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: fit-content;
          border-radius: var(--borderRadius-medium, 0.375rem);
          .course {
            display: flex;
            flex-direction: row;
            height: fit-content;
            border-radius: var(--borderRadius-medium, 0.375rem);
            .course-status {
              width: 5px;
              height: auto;
              border-radius: 10px;
              background: rgb(36, 184, 34);
              margin: 0.5rem;
            }
            .done {
              background: rgb(182, 182, 182);
            }

            .course-text {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .course-name {
                display: flex;
                align-items: center;
                font-size: 1rem;
                color: black;

                font-weight: bold;
              }
              .done-title {
                color: rgb(161, 161, 161);
              }
              .course-time {
                display: flex;
                align-items: center;
                font-size: 0.9rem;
                color: rgb(118, 118, 118);
              }
            }
          }
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

.overlay-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  .login-notice {
    width: 50%;
    height: 10%;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    .login-notice-text {
      margin-left: 10px;
      font-size: 16px;
      color: #000;
    }
  }
}
</style>
