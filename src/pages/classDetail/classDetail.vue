<template>
  <navbar />
  <view class="class-detail">
    <view class="class-name">
      <view class="class-name-title">{{ details["Unit name"] }}</view>
      <view class="class-name-content">{{ details["Attendance mode"] }}</view>
    </view>
    <view class="read-more-details">
      <textfolder :load="loadFolder">
        <view class="class-details">
          <view class="contactDetails-coordinator">
            <view class="contactDetails-coordinator-content">
              <span class="contactDetails-coordinator-title">
                {{ $t("classDetail.contactDetails-coordinator") }}:
              </span>
              {{ details["ContactDetails"]["Coordinator"] }}
              {{ details["ContactDetails"]["Lecturer(s)"] }}
              {{ "\n" + details["ContactDetails"]["Tutor(s)"] }}
            </view>
          </view>
          <view class="course-code">
            <view class="course-code-content">
              <span class="course-code-title">
                {{ $t("classDetail.courseCode") }}:
              </span>
              {{ details["CourseCode"] }}
            </view>
          </view>
          <view class="unit-name">
            <view class="unit-name-content">
              <span class="unit-name-title">
                {{ $t("classDetail.unitName") }}:
              </span>
              {{ details["Unit name"] }}
            </view>
          </view>
          <view class="unit-code">
            <view class="unit-code-content">
              <span class="unit-code-title">
                {{ $t("classDetail.unitCode") }}:
              </span>
              {{ details["UnitCode"] }}
            </view>
          </view>
          <view class="session">
            <view class="session-content">
              <span class="session-title">
                {{ $t("classDetail.session") }}:
              </span>
              {{ details["Session"] }}
            </view>
          </view>
          <view class="academic-unit">
            <view class="academic-unit-content">
              <span class="academic-unit-title">
                {{ $t("classDetail.academicUnit") }}:
              </span>
              {{ details["Academic unit"] }}
            </view>
          </view>
          <view class="overview">
            <view class="overview-content">
              <span class="overview-title">
                {{ $t("classDetail.overview") }}:
              </span>
              {{ details["Overview"] }}
            </view>
          </view>
          <view
            class="assessment-summary-notes"
            v-if="
              details['AssessmentSummary'] &&
              details['AssessmentSummary']['Notes']
            "
          >
            <view class="assessment-summary-notes-title">
              {{ $t("classDetail.AssessmentSummaryNotes") }}:
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
              {{ $t("classDetail.AssessmentDetails") }}:
            </view>
            <view
              class="assessment-details-content"
              v-for="(assessment, index) in details['AssessmentDetails']"
              :key="index"
            >
              <view class="assessment-detail-type">
                <view class="assessment-detail-type-title">
                  {{ $t("classDetail.Assessment Type") }}
                </view>
                <view class="assessment-detail-type-content">
                  {{ assessment["Type"] }}
                </view>
              </view>
              <view
                class="assessment-detail-description"
                v-if="assessment['Description']"
              >
                <view class="assessment-detail-description-title">
                  {{ $t("classDetail.Assessment Description") }}
                </view>
                <view class="assessment-detail-description-content">
                  {{ assessment["Description"] }}
                </view>
              </view>
              <view class="assessment-detail-weight">
                <view class="assessment-detail-weight-title">
                  {{ $t("classDetail.Assessment Weight") }}
                </view>
                <view class="assessment-detail-weight-content">
                  {{ assessment["Weight"] }}
                </view>
              </view>
              <view class="assessment-detail-due" v-if="assessment['Due']">
                <view class="assessment-detail-due-title">
                  {{ $t("classDetail.Assessment Due") }}
                </view>
                <view class="assessment-detail-due-content">
                  {{ assessment["Due"] }}
                </view>
              </view>
              <view
                class="assessment-detail-group-or-individual"
                v-if="assessment['GroupOrIndividual']"
              >
                <view class="assessment-detail-group-or-individual-title">
                  {{ $t("classDetail.GroupOrIndividual") }}
                </view>
                <view class="assessment-detail-group-or-individual-content">
                  {{ assessment["GroupOrIndividual"] }}
                </view>
              </view>
              <view
                class="assessment-detail-length"
                v-if="assessment['Length']"
              >
                <view class="assessment-detail-length-title">
                  {{ $t("classDetail.Assessment Length") }}
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
    <view class="reply-notify-box">
        <view
          class="reply-notify"
          :class="{ 'reply-notify-inactive': reply.parent == null }"
        >
          <view class="reply-notify-text">
            {{ placeholder }}
          </view>
          <view class="reply-notify-cancel" @tap="cancelReply">
            <view class="reply-notify-cancel-icon">
              <u-icon name="close" size="20" color="#979191" />
            </view>
          </view>
        </view>
    </view>
    <view class="reply-form">
      <form>
        <u-textarea
          :placeholder="placeholder"
          v-model="replyContent"
          count
          autoHeight
          maxlength="1000"
          :focus="inputingReply"
          :showConfirmBar="false"
          :disableDefaultPadding="true"
          confirmType="return"
        />
        <view class="submit" @tap="commitReply">
          {{ $t("classDetail.提交") }}
        </view>
      </form>
    </view>
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
import { ErrorHandler } from "@/utils/requestErrors";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const replyList = ref(new ReplyList());
const reply = ref(new Reply());
const details = ref();
const noMore = ref(false);
const replyContent = ref("");
const inputingReply = ref(false);
const hideReplyNotify = ref("hidden");
const notifyTransform = ref("translateY(0)");
const placeholder = ref(t("classDetail.请输入评论内容"));
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
  placeholder.value = t("classDetail.回复给") + parentReplyName + ": ";
  hideReplyNotify.value = "visible";
  notifyTransform.value = "translateY(0)";
};

const cancelReply = () => {
  inputingReply.value = false;
  reply.value.parent = null;
  placeholder.value = t("classDetail.请输入评论内容");
  notifyTransform.value = "translate(110%, 0)";
  setTimeout(() => {
    hideReplyNotify.value = "hidden";
    notifyTransform.value = "translateY(0)";
  }, 1000);
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
      title: t("classDetail.没有更多评论了"),
      icon: "none",
    });
  });
};

let committing = false;
const commitReply = () => {
  if (committing) return;
  committing = true;
  if (replyContent.value.length < 10) {
    uni.showToast({
      title: t("classDetail.评论内容不得小于10个字符"),
      icon: "none",
    });
    committing = false;
    return;
  }
  reply.value.content[
    uni.getStorageSync("lang") as keyof typeof reply.value.content
  ] = replyContent.value;
  reply.value.course = props.courseCode;
  reply.value.lang = uni.getStorageSync("lang");
  Api.postComment(uni.getStorageSync("aueduSession"), reply.value)
    .then((res: any) => {
      if (res.statusCode === 201) {
        uni.showToast({
          title: t("classDetail.评论成功"),
          icon: "none",
        });
        replyList.value.results = [];
        replyList.value.page = 1;
        noMore.value = false;
        getReplyList();
        replyContent.value = "";
        cancelReply();
      } else {
        ErrorHandler(res);
      }
    })
    .catch((err) => {
      uni.showToast({
        title: t(err.message),
        icon: "none",
      });
    })
    .finally(() => {
      committing = false;
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
.class-detail {
  margin: 1rem;
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
  .unit-code,
  .session,
  .academic-unit,
  .overview,
  .assessment-summary-notes,
  .assessment-details {
    border-bottom: 1px solid #ddd;
    padding: 5px;
    margin-bottom: 10px;
    background-color: #f9f9f9;
  }

  /* 标题样式 */
  .contactDetails-coordinator-title,
  .course-code-title,
  .unit-name-title,
  .unit-code-title,
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
  .unit-code-content,
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
    .assessment-detail-group-or-individual,
    .assessment-detail-length {
      display: flex;
      flex-direction: column;
      .assessment-detail-type-title,
      .assessment-detail-description-title,
      .assessment-detail-weight-title,
      .assessment-detail-due-title,
      .assessment-detail-group-or-individual-title,
      .assessment-detail-length-title {
        font-weight: bold;
        line-height: 1.6;
        color: #000;
      }
      .assessment-detail-type-content,
      .assessment-detail-description-content,
      .assessment-detail-weight-content,
      .assessment-detail-due-content,
      .assessment-detail-group-or-individual-content,
      .assessment-detail-length-content {
        font-family: "Arial", sans-serif;
        color: #333;
        line-height: 1.6;
        padding: 5px;
        background-color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
    }
  }
}

.comment {
  z-index: 2333;
  display: flex;
  width: -webkit-fill-available;
  flex-direction: column;
  position: sticky;
  bottom: 0;
  margin: 0 1rem 2rem 1rem;
  background: white;
  .reply-notify-box {
    width: -webkit-fill-available;
    position: relative;
    display: flex;
    .reply-notify {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem;
      border: 1px solid #c9c5c5;
      border-radius: 20px;
      transition: all 0.3s;
      background: white;
      width: -webkit-fill-available;
      bottom: 0;
      opacity: 1;
      margin-bottom: 0.2rem;
      &-text {
        font-size: 1rem;
        color: #979191;
      }
      &-cancel {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        height: 1.5rem;
      }
      &-inactive {
        transform: v-bind('notifyTransform');
        opacity: 0;
        display: v-bind('hideReplyNotify');
      }
    }
  }
  .reply-form {
    width: -webkit-fill-available;
    margin-bottom: 2rem;
    form {
      display: flex;
      flex-direction: column;
      .submit {
        display: flex;
        margin-top: 1rem;
        align-items: center;
        justify-content: center;
        color: #979191;
        border: 1px solid #c9c5c5;
        border-radius: 20px;
        height: 40px;
      }
    }
  }
}
</style>
