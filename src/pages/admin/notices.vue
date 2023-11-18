<template>
  <navbar />
  <view class="notice-list">
    <view class="title">
      <view class="title-text">公告列表</view>
      <view class="funtions">
        <view class="select">
          <view class="select-text">选择</view>
          <view class="select-icon">
            <u-icon name="arrow-down" :size="20" />
          </view>
        </view>
        <view class="add" @tap="navTo(RouteConfig.admin.notices.add.url)">
          <view class="add-text">添加</view>
          <view class="add-icon">
            <u-icon name="plus" :size="20" />
          </view>
        </view>
      </view>
    </view>
    <u-list>
      <u-list-item v-for="(contents, index) in notices" :key="index">
        <view class="notice-item">
          <view class="notice-item-title">
            <view class="notice-item-title-text">公告 {{ index + 1 }}</view>
            <view class="modify-icon">
              <u-icon name="edit-pen" :size="20" />
            </view>
          </view>
          <u-cell
            :title="`${key}: ${text}`"
            v-for="(text, key, index_lang) in contents"
            :key="index_lang"
          />
        </view>
      </u-list-item>
    </u-list>
  </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar.vue";
import Api from "@/api/api";
import { onMounted, ref } from "vue";
import RouteConfig from "@/config/routes";

const notices = ref();

onMounted(() => {
  Api.notices().then((res: any) => {
    if (res.statusCode === 200) {
      console.log(res.data);
      notices.value = res.data;
    }
  });
});
</script>

<style scoped lang="scss">
.notice-list {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 50px;
    background-color: #fff;
    .title-text {
      font-size: 18px;
      font-weight: bold;
    }
    .funtions {
      display: flex;
      .select {
        display: flex;
        align-items: center;
        margin-right: 20px;
        .select-text {
          font-size: 16px;
          margin-right: 5px;
        }
        .select-icon {
          color: #1cd29b;
        }
      }
      .add {
        display: flex;
        align-items: center;
        .add-text {
          font-size: 16px;
          margin-right: 5px;
        }
        .add-icon {
          color: #1cd29b;
        }
      }
    }
  }
  .notice-item {
    padding: 20px;
    background-color: #fff;
    .notice-item-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .notice-item-title-text {
        font-size: 18px;
        font-weight: bold;
      }
      .modify-icon {
        color: #1cd29b;
      }
    }
  }
}
</style>
