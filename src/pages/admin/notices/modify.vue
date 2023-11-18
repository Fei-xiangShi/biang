<template>
  <navbar />
  <view class="add">
    <view class="title">
      <view class="title-text">修改公告</view>
    </view>
    <view class="form">
      <u-form>
        <u-form-item label="简体中文">
          <u-input placeholder="请输入内容" v-model="hans" />
        </u-form-item>
        <u-form-item label="英文">
          <u-input placeholder="请输入内容" v-model="en" />
        </u-form-item>
        <u-form-item label="繁体中文">
          <u-input placeholder="请输入内容" v-model="hant" />
        </u-form-item>
        <u-form-item label="发布时间" @tap="openDatePicker">
          <u-input
            :placeholder="new Date(date).toLocaleString()"
            disabled
            disabledColor="rgb(0,0,0,0)"
          />
        </u-form-item>
      </u-form>
      <u-datetime-picker
        :show="showDatePicker"
        v-model="date"
        mode="datetime"
        closeOnClickOverlay
        @confirm="confirmDate"
        @close="close"
      />
    </view>
    <view class="buttons">
      <view class="button">
        <u-button type="primary" @tap="modifyNotice">修改</u-button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar.vue";
import Api from "@/api/api";
import { ref, onMounted } from "vue";

const props = defineProps({
  id: {
    type: Number,
    default: 0,
  },
});

const hans = ref("");
const en = ref("");
const hant = ref("");
const date = ref(Number(new Date()));
const session = uni.getStorageSync("aueduSession");

const showDatePicker = ref(false);

const confirmDate = (e: any) => {
  date.value = e.detail;
  showDatePicker.value = false;
};

const close = () => {
  showDatePicker.value = false;
};

const openDatePicker = () => {
  showDatePicker.value = true;
};

const modifyNotice = () => {
  Api.modifyNotice(
    hans.value,
    hant.value,
    en.value,
    session,
    new Date(date.value).toISOString().slice(0, 16),
    props.id
  )
    .then((res: any) => {
      if (res.statusCode === 200) {
        uni.showToast({
          title: "修改成功",
          icon: "success",
          duration: 2000,
        });
        uni.navigateBack();
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
};

onMounted(() => {
  Api.notice(props.id)
    .then((res: any) => {
      if (res.statusCode === 200) {
        hans.value = res.data["zh-Hans"];
        hant.value = res.data["zh-Hant"];
        en.value = res.data.en;
        date.value = Number(new Date(res.data.date));
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
});
</script>

<style scoped lang="scss">
.add {
  display: flex;
  flex-direction: column;
  height: 100%;
  .title {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100px;
    .title-text {
      font-size: 20px;
      font-weight: bold;
    }
  }
  .form {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100px;
    .button {
      width: 80%;
    }
  }
}
</style>
