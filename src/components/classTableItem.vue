<template>
  <view class="container">
    <navbar :show-change-school-button="false">
      <view class="name" @tap="open">
        <view class="time-name">{{ nameTime }}</view>
        <view class="name-arrow" :class="{ open: showPop }">
          <u-icon name="arrow-right" :size="20" />
        </view>
      </view>
    </navbar>
    <view class="pop">
      <u-popup
        :show="showPop"
        @close="close"
        :overlay="true"
        mode="bottom"
        :round="10"
        :closeOnClickOverlay="true"
        :duration="200"
      >
        <view class="popup-content">
          <view class="weeks">
            <view
              class="week"
              v-for="(week, index) in weeks"
              :key="index"
              @click="
                toggleWeek(week);
                close();
              "
              :style="{
                background:
                  week.id == curretWeekNum
                    ? '#f56c6c'
                    : week.id == calcWeekNum(nameTime)
                    ? '#f56c6c7a'
                    : '',
                color: week.id == curretWeekNum ? '#fff' : '',
              }"
            >
              {{ week.name }}
            </view>
          </view>
        </view>
      </u-popup>
    </view>
    <view class="tab">
      <u-tabs
        :list="weeks"
        @click="toggleWeek"
        lineWidth="30"
        lineColor="#f56c6c"
        :activeStyle="{
          color: '#303133',
          fontWeight: 'bold',
          transform: 'scale(1.05)',
        }"
        :inactiveStyle="{
          color: '#606266',
          transform: 'scale(1)',
        }"
        :current="curretWeekNum - 1"
      />
    </view>

    <view
      class="classtable-chart"
      @touchstart="touchStart"
      @touchend="touchEnd"
    >
      <view class="date-list">
        <view class="month-and-monthname">
          <view class="month">{{ calcMonthNum() }}月</view>
        </view>
        <view
          class="weekday-and-date"
          :class="[dayItem.weekday == weekdays[today] ? 'today' : '']"
          v-for="(dayItem, index) in dayItems"
          :key="index"
        >
          <view class="weekday">{{ dayItem.weekday }}</view>
          <view class="date">{{ dayItem.date }}</view>
        </view>
      </view>
      <view class="arrangement">
        <view class="time-table">
          <view
            class="time-table-item"
            v-for="(item, index) in timeTable"
            :key="index"
            >{{ item }}</view
          >
        </view>
        <view class="courses">
          <view
            class="course"
            v-for="course in courses"
            :style="{
              left: ((course.weekday - 1) * 100) / 7 + '%',
              top: ((course.startTime - 8) * 100) / 14 + '%',
              maxHeight: (course.duration * 100) / 14 + '%',
              height: (course.duration * 100) / 14 + '%',
            }"
            @tap="show(course)"
          >
            <view
              class="course-item"
              :style="{
                background:
                  colorList[course.location.length % colorList.length],
              }"
            >
              <view class="course-name">{{ course.summary }}</view>
              <view class="course-location">{{ course.location }}</view>
              <view class="course-time">
                {{ course.start }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="details">
      <modal
        :show="showDetail"
        @close="hide"
        :showConfirmButton="false"
        :showCancelButton="false"
        :closeOnClickOverlay="true"
      >
        <view class="modal-header">
          <view class="modal-title">{{ $t("课程详情标题") }}</view>
          <view class="class-name">{{ showCourse.summary }}</view>
        </view>
        <view class="block-line" />
        <view class="modal-body">
          <view class="course-id">
            <view class="course-id-title">{{ $t("课程号") }}</view>
            <view class="course-id-content">
              {{ showCourse.description.slice(0, 8) }}
            </view>
          </view>
          <view class="unit-id">
            <view class="unit-id-title">{{ $t("单元号") }}</view>
            <view class="unit-id-content">
              {{ showCourse.description.split(",")[0].slice(9) }}
            </view>
          </view>
          <view class="classroom">
            <view class="classroom-title">{{ $t("教室") }}</view>
            <view class="classroom-content">{{ showCourse.location }}</view>
          </view>
        </view>
      </modal>
    </view>
  </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar.vue";
import semester from "@/config/semester";
import timeTable from "@/config/timeTable";
import { onMounted, ref } from "vue";
import Course from "@/models/course";
import modal from "@/components/modal.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const todayDate = date.getDate();
const today = date.getDay();
const nameTime = `${year}/${month}/${todayDate}`;
const showPop = ref(false);
const courses = ref<any>([]);
const showDetail = ref(false);
const showCourse = ref(new Course());

const show = (course: any) => {
  showDetail.value = true;
  showCourse.value = course;
  console.log(showCourse.value);
};

const hide = () => {
  showDetail.value = false;
};

const close = () => {
  showPop.value = false;
};

const open = () => {
  showPop.value = true;
};

const calcWeekNum = (date: Date | string) => {
  return Math.max(
    0,
    Math.min(
      20,
      Math.floor(
        (Number(new Date(date)) - Number(new Date(semester.start))) /
          (7 * 24 * 3600 * 1000)
      ) + 1
    )
  );
};

const calcMonthNum = () => {
  const currentWeekStartDate = new Date(
    new Date(semester.start).getTime() +
      (curretWeekNum.value - 1) * 7 * 24 * 3600 * 1000
  );
  return currentWeekStartDate.getMonth() + 1;
};

const curretWeekNum = ref(calcWeekNum(date));
const dayItems = ref([{ date: 0, weekday: "", data: new Date() }]);
const weekdays = [
  t("星期日"),
  t("星期一"),
  t("星期二"),
  t("星期三"),
  t("星期四"),
  t("星期五"),
  t("星期六"),
];
var weeks: any = [];

const calcWeekList = () => {
  const orientationWeek1 = calcWeekNum(semester.orientationWeek1);
  const orientationWeek2 = calcWeekNum(semester.orientationWeek2);
  const mosVactionWeek = calcWeekNum(semester.mosVaction);
  const exam1 = calcWeekNum(semester.examWeek1);
  const exam2 = calcWeekNum(semester.examWeek2);
  for (let i = 1, j = 1; i <= 20; i++) {
    if (i === orientationWeek1) {
      weeks.push({
        name: t("迎新第一周"),
        id: i,
      });
    } else if (i === orientationWeek2) {
      weeks.push({
        name: t("迎新第二周"),
        id: i,
      });
    } else if (i === mosVactionWeek) {
      weeks.push({
        name: t("期中假期"),
        id: i,
      });
    } else if (i === exam1) {
      weeks.push({
        name: t("期末第一周"),
        id: i,
      });
    } else if (i === exam2) {
      weeks.push({
        name: t("期末第二周"),
        id: i,
      });
    } else {
      weeks.push({
        name: t(`第${j}周`),
        id: i,
      });
      j++;
    }
  }
};

const toggleWeek = (e: any) => {
  curretWeekNum.value = Number(e.id);
  generateWeekDateRange();
  updateClassTable();
};

const calcMondayOfWeek = (date: Date) => {
  const dayOfWeek = date.getDay();
  const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
};

const generateWeekDateRange = () => {
  const start = new Date(semester.start);
  dayItems.value = [];
  const mondayOfWeek = calcMondayOfWeek(start);
  const currentWeekStartDate = new Date(
    mondayOfWeek.getTime() + (curretWeekNum.value - 1) * 7 * 24 * 3600 * 1000
  );
  const end = new Date(currentWeekStartDate.getTime() + 7 * 24 * 3600 * 1000);
  for (
    let current = new Date(currentWeekStartDate);
    current < end;
    current.setDate(current.getDate() + 1)
  ) {
    const data = new Date(current);
    const date = current.getDate();
    const weekday = weekdays[current.getDay()];
    dayItems.value.push({ date, weekday, data });
  }
};

const updateClassTable = () => {
  courses.value = [];
  const allClasses = uni.getStorageSync("classTableContent");
  allClasses.events.forEach((course: Course) => {
    if (
      new Date(course.start) >= dayItems.value[0].data &&
      new Date(course.end) <= dayItems.value[dayItems.value.length - 1].data
    ) {
      const icourse = JSON.parse(JSON.stringify(course));
      icourse.duration =
        (Number(new Date(course.end)) - Number(new Date(course.start))) /
        (3600 * 1000);

      icourse.weekday = new Date(course.start).getDay();
      const timeParts = course.start.split("T")[1].split(":");
      const hour = parseInt(timeParts[0], 10);
      const minutes = parseInt(timeParts[1], 10);
      icourse.startTime = hour + minutes / 60;
      courses.value.push(icourse);
    }
  });
};

onMounted(() => {
  generateWeekDateRange();
  calcWeekList();
  updateClassTable();
});

const colorList = [
  // 浅色系
  "rgba(255, 99, 71, 0.5)",
  "#FFA07A",
  "#FFD700",
  "#FFDEAD",
  "#FFE4E1",
  "#FFEFD5",
  "#AFEEEE",
  "#00FFFF",
  "#00BFFF",
  "#7FFFD4",
  "#FFB6C1",
  "rgba(255, 192, 203, 0.5)",
  "rgba(255, 0, 0, 0.2)",
  "rgba(0, 255, 255, 0.2)",
  "rgba(0, 191, 255, 0.2)",
  "rgba(127, 255, 212, 0.2)",
  "rgba(0, 255, 127, 0.2)",
  "rgba(0, 250, 154, 0.2)",
  "rgba(0, 255, 0, 0.2)",
  "rgba(173, 255, 47, 0.2)",
  "rgba(50, 205, 50, 0.2)",
  "rgba(255, 255, 0, 0.2)",
  "rgba(255, 215, 0, 0.2)",
  "rgba(255, 165, 0, 0.2)",
  "rgba(255, 140, 0, 0.2)",
  "rgba(255, 127, 80, 0.2)",
  "rgba(255, 99, 71, 0.2)",
  "rgba(255, 69, 0, 0.2)",
];

let startX = 0;
let startY = 0;

const touchStart = (e: any) => {
  const touch = e.touches[0];
  startX = touch.clientX;
  startY = touch.clientY;
};

const touchEnd = (e: any) => {
  const touch = e.changedTouches[0];
  const deltaX = touch.clientX - startX;
  const deltaY = touch.clientY - startY;
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 0) {
      if (curretWeekNum.value > 1) {
        curretWeekNum.value--;
        generateWeekDateRange();
        updateClassTable();
      }
    } else {
      if (curretWeekNum.value < 20) {
        curretWeekNum.value++;
        generateWeekDateRange();
        updateClassTable();
      }
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    135deg,
    #a6eeee7a 10%,
    #91d8c84d 40%,
    #fcfcd491 60%
  );
}

.popup-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  .weeks {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    .week {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 25%;
      height: 40px;
      font-size: 1rem;
      font-weight: bold;
      color: black;
      border-radius: 5px;
      margin: 5px;
      background: rgba($color: #fff, $alpha: 0.4);
      box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
        rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    }
  }
}

.name {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .time-name {
    display: flex;
    text-align: center;
    font-weight: bold;
    color: black;
    margin-left: 1rem;
    font-size: 1.5rem;
  }
  .name-arrow {
    display: flex;
    margin-top: 3px;
    margin-left: 0.5rem;
    transition: transform 0.3s ease-in-out;
  }
  .open {
    transform: rotate(90deg);
  }
}

.classtable-chart {
  display: flex;
  flex-direction: column;
  flex-flow: column;
  margin: 0 5px;
  border-radius: 5px 5px 0 0;
  flex: 1;
  background: rgba($color: #fff, $alpha: 0.4);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  .date-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .month-and-monthname {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 12%;
      .month {
        font-size: 1rem;
        font-weight: bold;
        color: black;
      }
    }
    .weekday-and-date {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      width: 12.5%;
      .weekday {
        font-size: 1rem;
        font-weight: bold;
        color: black;
      }
      .date {
        font-size: 1rem;
        font-weight: bold;
        color: black;
      }
    }
    .today {
      .weekday {
        color: #f56c6c;
      }
      .date {
        color: #f56c6c;
      }
    }
  }

  .arrangement {
    display: flex;
    flex-direction: row;
    flex: 1;
    .time-table {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      min-width: 12%;
      .time-table-item {
        height: 7.142%;
        display: flex;
        align-items: center;
        font-size: 0.8rem;
      }
    }
    .courses {
      position: relative;
      flex: 1;
      overflow: hidden;
      .course {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 13.5%;
        .course-item {
          border-radius: 5px;
          height: 85%;
          display: flex;
          flex-direction: column;
          flex: 1;
          overflow: hidden;
          border: 3px solid #f0e8e8;
          .course-name {
            font-size: 0.8rem;
            font-weight: bold;
            color: black;
          }
          .course-location {
            font-size: 0.8rem;
            font-weight: bold;
            color: black;
          }
          .course-time {
            font-size: 0.8rem;
            font-weight: bold;
            color: black;
          }
        }
      }
    }
  }
}

.modal-header {
  display: flex;
  flex-direction: column;
  align-items: normal;
  .modal-title {
    font-size: 1rem;
    font-weight: lighter;
    color: grey;
    text-align: left;
  }
  .class-name {
    font-size: 1rem;
    font-weight: bold;
    color: black;
    text-align: left;
  }
}

.block-line {
  width: 100%;
  height: 1px;
  background: rgba($color: #000, $alpha: 0.2);
  margin: 10px 0;
}

.modal-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  .classroom {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px;
    .classroom-title {
      font-size: 1rem;
      font-weight: bold;
      color: black;
    }
    .classroom-content {
      font-size: 1rem;
      font-weight: bold;
      color: black;
      text-align: right;
      max-width: 80%;
    }
  }
  .course-id {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .course-id-title {
      font-size: 1rem;
      font-weight: bold;
      color: black;
    }
    .course-id-content {
      font-size: 1rem;
      font-weight: bold;
      color: black;
    }
  }
  .unit-id {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .unit-id-title {
      font-size: 1rem;
      font-weight: bold;
      color: black;
    }
    .unit-id-content {
      font-size: 1rem;
      font-weight: bold;
      color: black;
    }
  }
}
</style>
