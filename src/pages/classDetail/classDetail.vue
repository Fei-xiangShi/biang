<template>
  <navbar />
  <view class="class-detail">
    <view class="class-name">
      <view class="class-name-title">{{ details["Academic unit"] }}</view>
      <view class="class-name-content">{{ details["Attendance mode"] }}</view>
    </view>
    <view class="read-more-details">
      <textfolder :load="loadFolder">
        <view class="class-details">
          <view class="contactDetails-coordinator">
            <view class="contactDetails-coordinator-content">
              <span class="contactDetails-coordinator-title">
                {{ $t("contactDetails-coordinator") }}:
              </span>
              {{ details["ContactDetails"]["Coordinator"] }}
            </view>
          </view>
          <view class="course-code">
            <view class="course-code-content">
              <span class="course-code-title">{{ $t("courseCode") }}:</span>
              {{ details["CourseCode"] }}
            </view>
          </view>
          <view class="unit-name">
            <view class="unit-name-content">
              <span class="unit-name-title">{{ $t("unitName") }}:</span>
              {{ details["Unit name"] }}
            </view>
          </view>
          <view class="session">
            <view class="session-content">
              <span class="session-title">{{ $t("session") }}:</span>
              {{ details["Session"] }}
            </view>
          </view>
          <view class="academic-unit">
            <view class="academic-unit-content">
              <span class="academic-unit-title">{{ $t("academicUnit") }}:</span>
              {{ details["Academic unit"] }}
            </view>
          </view>
          <view class="overview">
            <view class="overview-content">
              <span class="overview-title">{{ $t("overview") }}:</span>
              {{ details["Overview"] }}
            </view>
          </view>
          <view class="assessment-summary-notes">
            <view class="assessment-summary-notes-title">
              {{ $t("AssessmentSummaryNotes") }}:
            </view>
            <view
              class="assessment-summary-notes-content"
              v-for="(notes, index) in details['AssessmentSummary']['Notes']"
              :key="index"
            >
              <view class="assessment-summary-note">
                {{ notes }}
              </view>
            </view>
          </view>
          <view class="assessment-details">
            <view class="assessment-details-title">
              {{ $t("AssessmentDetails") }}:
            </view>
            <view
              class="assessment-details-content"
              v-for="(assessment, index) in details['AssessmentDetails']"
              :key="index"
            >
              <view class="assessment-detail-type">
                <view class="assessment-detail-type-title">
                  {{ $t("Assessment Type") }}
                </view>
                <view class="assessment-detail-type-content">
                  {{ assessment["Type"] }}
                </view>
              </view>
              <view class="assessment-detail-description">
                <view class="assessment-detail-description-title">
                  {{ $t("Assessment Description") }}
                </view>
                <view class="assessment-detail-description-content">
                  {{ assessment["Description"] }}
                </view>
              </view>
              <view class="assessment-detail-weight">
                <view class="assessment-detail-weight-title">
                  {{ $t("Assessment Weight") }}
                </view>
                <view class="assessment-detail-weight-content">
                  {{ assessment["Weight"] }}
                </view>
              </view>
              <view class="assessment-detail-due">
                <view class="assessment-detail-due-title">
                  {{ $t("Assessment Due") }}
                </view>
                <view class="assessment-detail-due-content">
                  {{ assessment["Due"] }}
                </view>
              </view>
              <view class="assessment-detail-length">
                <view class="assessment-detail-length-title">
                  {{ $t("Assessment Length") }}
                </view>
                <view class="assessment-detail-length-content">
                  {{ assessment["Length"] }}
                </view>
              </view>
            </view>
          </view>
        </view>
      </textfolder>
    </view>
  </view>

  <view class="class-discussion">
    <Comment
      v-for="(reply, index) in replyList.results"
      :key="reply.id"
      :reply="reply"
      :index="index"
      replyType="root"
      @onReply="inputReply"
    />
  </view>
  <view class="comment">
    <form>
      <u-textarea
        :placeholder="placeholder"
        v-model="replyContent"
        count
        autoHeight
        maxlength="1000"
        :focus="inputingReply"
        @blur="cancelReply"
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
import textfolder from "@/components/textfolder.vue";

const replyList = ref(new ReplyList());
const reply = ref(new Reply());
const details = ref();
const noMore = ref(false);
const replyContent = ref("");
const inputingReply = ref(false);
const placeholder = ref("请输入评论内容");
const loadFolder = ref(false);

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

const inputReply = (parentReplyId: number, parentReplyName: string) => {
  inputingReply.value = true;
  reply.value.parent = parentReplyId;
  placeholder.value = "回复 " + parentReplyName + ": ";
};

const cancelReply = () => {
  inputingReply.value = false;
  reply.value.parent = null;
  placeholder.value = "请输入评论内容";
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
      if (replyList.value.results.length < replyList.value.count) {
        noMore.value = false;
      } else {
        noMore.value = true;
      }
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
  if (replyContent.value.length < 10) {
    uni.showToast({
      title: "评论内容不得小于10个字符",
      icon: "none",
    });
    return;
  }
  reply.value.content[
    uni.getStorageSync("lang") as keyof typeof reply.value.content
  ] = replyContent.value;
  reply.value.course = props.courseCode;
  reply.value.lang = uni.getStorageSync("lang");
  Api.postComment(uni.getStorageSync("aueduSession"), reply.value).then(
    (res: any) => {
      if (res.statusCode === 201) {
        uni.showToast({
          title: "评论成功",
          icon: "none",
        });
        replyList.value.results = [];
        replyList.value.page = 1;
        noMore.value = false;
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
      loadFolder.value = true;
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

.class-details {
  /* 内容块样式 */
  .class-details,
  .contactDetails-coordinator,
  .course-code,
  .unit-name,
  .session,
  .academic-unit,
  .overview,
  .assessment-summary-notes,
  .assessment-details {
    border-bottom: 1px solid #ddd;
    padding: 15px;
    margin-bottom: 10px;
    background-color: #f9f9f9;
  }

  /* 标题样式 */
  .contactDetails-coordinator-title,
  .course-code-title,
  .unit-name-title,
  .session-title,
  .academic-unit-title,
  .overview-title,
  .assessment-summary-notes-title,
  .assessment-details-title {
    font-weight: bold;
    line-height: 1.6;
    color: #000;
  }

  /* 内容细节样式 */
  .contactDetails-coordinator-content,
  .course-code-content,
  .unit-name-content,
  .session-content,
  .academic-unit-content,
  .overview-content,
  .assessment-summary-note {
    font-family: "Arial", sans-serif;
    color: #333;
    line-height: 1.6;
    padding: 10px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .assessment-details-content {
    font-family: "Arial", sans-serif;
    color: #333;
    line-height: 1.6;
    padding: 10px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    .assessment-detail-type,
    .assessment-detail-description,
    .assessment-detail-weight,
    .assessment-detail-due,
    .assessment-detail-length {
      display: flex;
      flex-direction: column;
      .assessment-detail-type-title,
      .assessment-detail-description-title,
      .assessment-detail-weight-title,
      .assessment-detail-due-title,
      .assessment-detail-length-title {
        font-weight: bold;
        line-height: 1.6;
        color: #000;
      }
      .assessment-detail-type-content,
      .assessment-detail-description-content,
      .assessment-detail-weight-content,
      .assessment-detail-due-content,
      .assessment-detail-length-content {
        font-family: "Arial", sans-serif;
        color: #333;
        line-height: 1.6;
        padding: 10px;
        background-color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
    }
  }
}

.class-discussion {
  margin: 1rem;
}

.comment {
  z-index: 233;
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
