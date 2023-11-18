<template>
  <navbar />
  <view> {{ courseCode }} {{ unitCode }} </view>
</template>

<script setup lang="ts">
import Api from "@/api/api";
import navbar from "@/components/navbar.vue";
import { onMounted } from "vue";

const props = defineProps({
  courseCode: {
    type: String,
    default: "",
  },
  unitCode: {
    type: String,
    default: "",
  },
});

onMounted(() => {
  Api.getCourseDetail(
    props.courseCode,
    props.unitCode,
    uni.getStorageSync("lang")
  )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>

<style scoped></style>
