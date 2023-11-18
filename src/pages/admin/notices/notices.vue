<template>
  <navbar />
  <view class="notice-list">
    <view class="title">
      <view class="title-text">公告列表</view>
      <view class="funtions">
        <view class="delete" v-if="selecting">
          <view class="delete-text" @tap="reconfrimDelete">删除</view>
          <view class="delete-icon" @tap="reconfrimDelete">
            <u-icon name="trash" :size="20" color="red" />
          </view>
          <modal
            title="确认删除"
            :content="`确认删除所选公告吗? 公告 
              '${notices.map((item: any, index: number) => {
                if (selected[index]) {
                  return item.id;
                }
              }).filter((item: any) => item)}' 
            将永久失去!(真的很久!)`"
            :show="confirmingDelete"
            :closeOnClickOverlay="true"
            @confirm="confirmDelete"
            @cancel="cancelDelete"
            @close="cancelDelete"
          >
          </modal>
        </view>
        <view class="select" @tap="onSelect">
          <view class="select-text" v-if="!selecting">选择</view>
          <view class="select-text" v-else>取消选择</view>
          <view class="select-icon">
            <u-icon name="arrow-down" :size="20" />
          </view>
        </view>
        <view
          class="add"
          @tap="navTo(RouteConfig.admin.notices.add.url)"
          v-if="!selecting"
        >
          <view class="add-text">添加</view>
          <view class="add-icon">
            <u-icon name="plus" :size="20" />
          </view>
        </view>
        <view class="select-all" v-else>
          <view class="select-all-text" v-if="!allSelected" @tap="selectAll"
            >全选</view
          >
          <view class="select-all-text" v-else @tap="cancelSelectAll"
            >取消全选</view
          >
        </view>
      </view>
    </view>
    <u-list>
      <u-list-item v-for="(contents, index) in notices" :key="index">
        <view class="notice-item">
          <view class="notice-item-title">
            <view class="select-box" :class="[selecting ? '' : 'none']">
              <u-checkbox-group @change="checkAll(index)">
                <u-checkbox :checked="selected[index]" />
              </u-checkbox-group>
            </view>
            <view class="notice-item-title-text" @tap="checkAll(index)"
              >公告 {{ index + 1 }}</view
            >
            <view
              class="modify-icon"
              @tap="
                navTo(
                  `${RouteConfig.admin.notices.modify.url}?id=${contents.id}`
                )
              "
            >
              <u-icon name="edit-pen" :size="20" />
            </view>
          </view>
          <u-cell
            :title="
              String(key) == 'date'
                ? `启用时间: ${new Date(text).toLocaleString()}`
                : `${key}: ${text}`
            "
            v-for="(text, key, langIndex) in contents"
            :key="langIndex"
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
import { onPullDownRefresh } from "@dcloudio/uni-app";
import modal from "@/components/modal.vue";

const notices = ref();
const selecting = ref(false);
const selected = ref([] as boolean[]);
const allSelected = ref(false);
const confirmingDelete = ref(false);

const navTo = (url: any) => {
  uni.navigateTo({
    url: url,
  });
};

const selectAll = () => {
  selected.value = selected.value.map(() => true);
  allSelected.value = true;
};

const checkAll = (index: number) => {
  if (!selecting.value) {
    return;
  }
  selected.value[index] = !selected.value[index];
  if (selected.value.every((item) => item)) {
    allSelected.value = true;
  } else {
    allSelected.value = false;
  }
};

const cancelSelectAll = () => {
  selected.value = selected.value.map(() => false);
  allSelected.value = false;
};

const onSelect = () => {
  selecting.value = !selecting.value;
  if (!selecting.value) {
    cancelSelectAll();
  }
};

const reconfrimDelete = () => {
  if (!selecting.value) {
    return;
  }
  if (selected.value.every((item) => !item)) {
    uni.showToast({
      title: "请选择要删除的公告",
      icon: "none",
    });
    return;
  }
  confirmingDelete.value = true;
};

const confirmDelete = () => {
  if (!selecting.value) {
    return;
  }
  const ids = notices.value
    .map((item: any, index: number) => {
      if (selected.value[index]) {
        return item.id;
      }
    })
    .filter((item: any) => item);
  if (ids.length === 0) {
    uni.showToast({
      title: "请选择要删除的公告",
      icon: "none",
    });
    return;
  }
  for (let i = 0; i < ids.length; i++) {
    Api.deleteNotice(ids[i], uni.getStorageSync("aueduSession")).then(
      (res: any) => {
        if (res.statusCode === 204) {
          console.log(res.data);
          uni.showToast({
            title: "删除成功",
            icon: "none",
          });
        }
      }
    );
  }
  confirmingDelete.value = false;
  refresh();
};

const cancelDelete = () => {
  confirmingDelete.value = false;
};

const refresh = () => {
  Api.allNotices().then((res: any) => {
    if (res.statusCode === 200) {
      console.log(res.data);
      notices.value = res.data;
      for (let i = 0; i < res.data.length; i++) {
        selected.value.push(false);
      }
    }
    uni.stopPullDownRefresh();
  });
};

onMounted(() => {
  refresh();
});

onPullDownRefresh(() => {
  refresh();
});
</script>

<style scoped lang="scss">
.notice-list {
  transition: all 0.3s ease-in-out;
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
      .delete {
        display: flex;
        align-items: center;
        margin-right: 20px;
        .delete-text {
          font-size: 16px;
          margin-right: 5px;
          color: red;
        }
        .delete-icon {
          color: red;
        }
      }
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
      .select-all {
        display: flex;
        align-items: center;
        .select-all-text {
          font-size: 16px;
          margin-right: 5px;
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
      height: 30px;
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

.none {
  display: none;
}
</style>
