<template>
  <navbar />
  <view class="class-detail">
    <u-read-more :toggle="true">
      <view class="class-name">
        <view class="class-name-title"></view>
        <view class="class-name-content"></view>
      </view>
      <view class="class-details">
        <view class="contactDetails-coordinator"></view>
        <view class="course-code"></view>
        <view class="unit-name"></view>
        <view class="session"></view>
        <view class="academic-unit"></view>
        <view class="overview"></view>
        <view class="assessment-summary-notes"></view>
        <view class="assessment-details"></view>
      </view>
    </u-read-more>
  </view>
  <view class="class-discussion">
    <ReplyItem
      v-for="(reply, index) in replyList.list"
      :key="reply.id"
      :reply="reply"
      :articleId="Number(articleId)"
      :index="index"
    />
  </view>
  <view class="comment">
    <form>
      <u-textarea
        placeholder="请输入评论内容"
        v-model="reply.content"
        count
        autoHeight
        maxlength="1000"
      />
      <view class="submit" @tap="commitReply">提交</view>
    </form>
  </view>
</template>

<script setup lang="ts">
import Api from "@/api/api";
import navbar from "@/components/navbar.vue";
import { onMounted, reactive, ref } from "vue";
import ReplyList from "@/models/replyList";
import ReplyItem from "@/components/replyItem.vue";
import Reply from "@/models/reply";

const replyList = reactive(new ReplyList());
const reply = ref(new Reply());

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

const getReplyList = () => {
  let res = Api.getReplyList(articleId, replyList.page);
  concatenatingReplyList(res);
};

const concatenatingReplyList = (response: any) => {
  response.then((res: any) => {
    uni.stopPullDownRefresh();
    if (res.data && res.data.length > 0) {
      //每次请求页数加一
      replyList.page++;
      replyList.list = [...replyList.list, ...res.data];
      return;
    }
    uni.showToast({
      title: "没有更多评论了",
      icon: "none",
    });
  });
};

const commitReply = () => {
  Api.reply(articleId, reply.value).then((res: any) => {
    if (res.statusCode === 200) {
      uni.showToast({
        title: "评论成功",
        icon: "none",
      });
      replyList.list = [];
      replyList.page = 1;
      getReplyList();
      reply.value.content = "";
    } else {
      uni.showToast({
        title: "评论失败: " + res.errMsg,
        icon: "none",
      });
    }
  });
};

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
