<template>
  <navbar :show-change-school-button="false">
    <view class="title">
      <view class="time-title">{{ titleTime }}</view>
      <view class="title-arrow">
        <u-icon name="arrow-right" :size="20" />
      </view>
    </view>
  </navbar>
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
  <view class="date-list">
    <view class="month-and-monthname">
      <view class="month">{{ month }}月</view>
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
  <view class="classtable-chart"> </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar.vue";
import semester from "@/config/semester";
import { onMounted, ref } from "vue";

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const todayDate = date.getDate();
const today = date.getDay();
const titleTime = `${year}/${month}/${todayDate}`;
const curretWeekNum = ref(
  Math.max(
    0,
    Math.min(
      18,
      Math.floor(
        Math.floor(
          (Number(date) - Number(new Date(semester.start))) /
            (7 * 24 * 60 * 60 * 1000)
        ) / 7
      ) + 1
    )
  )
);

const dayItems = ref([{ date: 0, weekday: "" }]);
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var weeks: any = [];

for (let i = 1; i <= 18; i++) {
  weeks.push({
    name: `WK ${i}`,
    id: i,
  });
}

const toggleWeek = (e: any) => {
  curretWeekNum.value = Number(e.id);
  generateWeekDateRange();
};

const generateWeekDateRange = () => {
  const start = new Date(semester.start);
  dayItems.value = [];
  const dayOfWeek = start.getDay();
  const diff = start.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const mondayOfWeek = new Date(start.setDate(diff));
  const currentWeekStartDate = new Date(
    mondayOfWeek.getTime() + (curretWeekNum.value - 1) * 7 * 24 * 60 * 60 * 1000
  );
  console.log(currentWeekStartDate);
  const end = new Date(
    currentWeekStartDate.getTime() + 7 * 24 * 60 * 60 * 1000
  );
  for (
    let current = currentWeekStartDate;
    current < end;
    current.setDate(current.getDate() + 1)
  ) {
    const date = current.getDate();
    const weekday = weekdays[current.getDay()];
    dayItems.value.push({ date, weekday });
  }
};

onMounted(() => {
  generateWeekDateRange();
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
</script>

<style scoped lang="scss">
.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .time-title {
    display: flex;
    text-align: center;
    font-weight: bold;
    color: black;
    margin-left: 1rem;
    font-size: 1.5rem;
  }
  .title-arrow {
    display: flex;
    margin-top: 3px;
  }
}
</style>
