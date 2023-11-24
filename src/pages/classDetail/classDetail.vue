<template>
  <navbar />
  <view class="class-detail">
    <view class="class-name">
      <view class="class-name-title">{{ details["Academic unit"] }}</view>
      <view class="class-name-content">{{ details["Attendance mode"] }}</view>
    </view>
    <view class="read-more-details">
      <view class="class-details">
        <view class="contactDetails-coordinator">
          <view class="contactDetails-coordinator-title">
            {{ $t("contactDetails-coordinator") }}
          </view>
          <view class="contactDetails-coordinator-content">
            {{ details["ContactDetails"]["Coordinator"] }}
          </view>
        </view>
        <view class="course-code">
          <view class="course-code-title">{{ $t("courseCode") }}:</view>
          <view class="course-code-content">{{ details["Course code"] }}</view>
        </view>
        <view class="unit-name">
          <view class="unit-name-title">{{ $t("unitName") }}:</view>
          <view class="unit-name-content">{{ details["Unit name"] }}</view>
        </view>
        <view class="session">
          <view class="session-title">{{ $t("session") }}:</view>
          <view class="session-content">{{ details["Session"] }}</view>
        </view>
        <view class="academic-unit">
          <view class="academic-unit-title">{{ $t("academicUnit") }}:</view>
          <view class="academic-unit-content">
            {{ details["Academic unit"] }}
          </view>
        </view>
        <view class="overview">
          <view class="overview-title">{{ $t("overview") }}:</view>
          <view class="overview-content">{{ details["Overview"] }}</view>
        </view>
        <view class="assessment-summary-notes">
          <view class="assessment-summary-notes-title">
            {{ $t("AssessmentSummaryNotes") }}:
          </view>
          <view class="assessment-summary-notes-content">
            {{ details["AssessmentSummaryNotes"] }}
          </view>
        </view>
        <view class="assessment-details">
          <view class="assessment-details-title">
            {{ $t("AssessmentDetails") }}:
          </view>
          <view class="assessment-details-content">
            {{ details["AssessmentDetails"] }}
          </view>
        </view>
      </view>
    </view>
  </view>
  
  <view class="class-discussion">
    <Comment
      v-for="(reply, index) in replyList.results"
      :key="reply.id"
      :reply="reply"
      :index="index"
      replyType="root"
    />
  </view>
  <view class="comment">
    <form>
      <u-textarea
        placeholder="请输入评论内容"
        v-model="replyContent"
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
import Comment from "@/components/comment.vue";
import { onMounted, ref } from "vue";
import ReplyList from "@/models/replyList";
import Reply from "@/models/reply";
import { onReachBottom } from "@dcloudio/uni-app";

const replyList = ref(new ReplyList());
const reply = ref(new Reply());
const details = ref();
const noMore = ref(false);
const replyContent = ref("");

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
  if (noMore.value) {
    return;
  }
  let res = Api.getComments(
    uni.getStorageSync("schoolId"),
    props.courseCode,
    replyList.value.page
  );
  concatenatingReplyList(res);
};

const concatenatingReplyList = (response: any) => {
  response.then((res: any) => {
    uni.stopPullDownRefresh();
    if (res.data.results && res.data.results.length > 0) {
      //每次请求页数加一
      replyList.value.page++;
      replyList.value.results = [
        ...replyList.value.results,
        ...res.data.results,
      ];
      replyList.value.count = res.data.count;
      replyList.value.previous = res.data.previous;
      replyList.value.next = res.data.next;
      console.log(replyList.value.results);
      return;
    }
    noMore.value = true;
    uni.showToast({
      title: "没有更多评论了",
      icon: "none",
    });
  });
};

const commitReply = () => {
  reply.value.content[
    uni.getStorageSync("lang") as keyof typeof reply.value.content
  ] = replyContent.value;
  reply.value.course = props.courseCode;
  Api.postComment(uni.getStorageSync("aueduSession"), reply.value).then(
    (res: any) => {
      if (res.statusCode === 200) {
        uni.showToast({
          title: "评论成功",
          icon: "none",
        });
        replyList.value.results = [];
        replyList.value.page = 1;
        getReplyList();
        replyContent.value = "";
      } else {
        uni.showToast({
          title: "评论失败: " + res.errMsg,
          icon: "none",
        });
      }
    }
  );
};

onMounted(() => {
  Api.getCourseDetail(
    props.courseCode,
    props.unitCode,
    uni.getStorageSync("lang"),
    uni.getStorageSync("schoolId")
  )
    .then((res: any) => {
      console.log(res.data);
      details.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  getReplyList();
});

onReachBottom(() => {
  getReplyList();
});
</script>

<style lang="scss" scoped>
.article {
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  .title-content {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    .title {
      text-align: center;
      font-size: 2rem;
      font-weight: bold;
      color: #303133;
    }
    .author {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: medium;
      color: rgb(131, 129, 126);
      .avatar {
        margin-right: 10px;
      }
    }
    .view-count {
      margin-left: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .content {
    margin: 10px;
    font-size: large;
  }
  .time {
    margin: 10px;
    font-size: small;
    color: rgb(131, 129, 126);
  }
}

.class-detail {
  padding: 1rem;
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.1);
  .class-name {
    display: flex;
    flex-direction: column;
    .class-name-title {
      font-size: 1.5rem;
      font-weight: bold;
    }
    .class-name-content {
      font-size: 1rem;
      color: #979191;
    }
  }
  .read-more-details {
    margin-top: 1rem;
  }
}

.class-discussion {
  margin: 1rem;
}

.comment {
  position: sticky;
  bottom: 0;
  padding: 1rem;
  background: white;
  margin-top: 0.5rem;
  .submit {
    margin: 1rem;
    text-align: center;
    color: #979191;
    border: 1px solid #c9c5c5;
    border-radius: 20px;
    padding: 10px;
  }
}
</style>
