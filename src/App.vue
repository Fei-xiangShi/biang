<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { useI18n } from "vue-i18n";
import Api from "./api/api";

const { locale } = useI18n();

onLaunch(() => {
  let school = uni.getStorageSync("school");
  if (!school) {
    school = "悉尼大学";
    uni.setStorageSync("school", school);
    uni.setStorageSync("schoolId", 1);
  }
  Api.getProgramList(uni.getStorageSync("schoolId")).then((res: any) => {
    uni.setStorageSync("programList", res.data);
  });
  let safetop = uni.getStorageSync("menuButtonBoundingClientRect");
  if (
    !safetop ||
    safetop.length == 0 ||
    safetop == null ||
    safetop == undefined
  ) {
    safetop = uni.getMenuButtonBoundingClientRect();
    uni.setStorageSync("menuButtonBoundingClientRect", safetop);
  }
  locale.value = uni.getStorageSync("lang") || uni.getLocale();
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>

<style lang="scss">
@import "../node_modules/uview-plus/index.scss";
</style>
