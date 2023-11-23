<template>
  <navbar />
  <view class="class-detail">
    <u-read-more :toggle="true">
      <view class="class-name">
        <view class="class-name-title">1{{ details["Academic unit"] }}</view>
        <view class="class-name-content">2{{ details["AdditionalInformation"] }}</view>
      </view>
      <view class="class-details">
        <view class="contactDetails-coordinator">3{{ details["ContactDetails"]["Coordinator"] }}</view>
        <view class="course-code">4{{ courseCode }}</view>
        <view class="unit-name">5{{ unitCode }}</view>
        <view class="session">6{{ details["Session"] }}</view>
        <view class="academic-unit">7{{ details["Academic unit"] }}</view>
        <view class="overview">8{{ details["Overview"] }}</view>
        <view class="assessment-summary-notes">9{{ details["AssessmentSummary"]["Notes"] }}</view>
        <view class="assessment-details">0{{ details["AssessmentDetails"] }}</view>
      </view>
    </u-read-more>
  </view>
  <view class="class-discussion">
    <!-- <ReplyItem
      v-for="(reply, index) in replyList.list"
      :key="reply.id"
      :reply="reply"
      :articleId="Number(articleId)"
      :index="index"
    /> -->
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
import { onReachBottom } from "@dcloudio/uni-app";

const replyList = reactive(new ReplyList());
const reply = ref(new Reply());
const details = ref();

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
  let res = Api.getComments(
    uni.getStorageSync("schoolId"),
    props.courseCode,
    replyList.page
  );
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
  Api.postComment(
    uni.getStorageSync("aueduSession"),
    props.courseCode,
    reply.value
  ).then((res: any) => {
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
    uni.getStorageSync("lang"),
    uni.getStorageSync("schoolId")
  )
    .then((res: any) => {
      details.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
    getReplyList()
});

onReachBottom(() => {
  // getReplyList();
});
</script>

<style scoped></style>
