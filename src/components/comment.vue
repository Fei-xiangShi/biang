<template>
  <view class="reply-item" :class="{ 'son-reply': replyType !== 'root' }">
    <view class="root">
      <view class="author">
        <view class="reply-avatar">
          <u-image
            :src="reply.user.avatarUrl"
            width="50px"
            height="50px"
            mode="aspectFill"
          />
        </view>
        <view class="name">{{ reply.user.username }}</view>
      </view>
      <view class="content">
        <view class="alt" v-if="replyType !== 'root'">
          @ {{ parentName }}
        </view>
        <uaMarkdown :source="reply?.content[language]" />
      </view>
      <view class="tab">
        <view class="floor">{{ index + 1 }}楼</view>
        <view class="open-reply-box" @tap="onReply">回复</view>
      </view>
    </view>
    <view
      class="block"
      v-if="reply.replies && reply.replies.length != 0 && replyType === 'root'"
    />
    <view
      class="sencondary-reply"
      v-for="(sonReply, index) in sons"
      :key="sonReply.id"
    >
      <Comment
        :reply="sonReply"
        :parentReply="reply"
        :index="index"
        replyType="son"
        :parentName="sonReply.parentReplyName"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import Api from "@/api/api";
import { reactive, ref } from "vue";
import Reply from "@/models/reply";
import uaMarkdown from "@/components/ua-markdown/ua-markdown.vue";
import Comment from "@/components/comment.vue";
import { onMounted } from "vue";

const props = defineProps({
  reply: {
    type: Object,
    required: true,
  },
  replyType: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  parentName: {
    type: String,
    required: false,
  },
});

// const replyContent = ref("");
const language = uni.getStorageSync("lang");
const sons = ref<any>([]);

// let newSecondaryReply = reactive(new Reply());

// const replyToReply = () => {
//   if (replyContent.value === "") {
//     uni.showToast({
//       title: "回复内容不能为空",
//       icon: "none",
//     });
//     return;
//   }
//   newSecondaryReply.content[
//     uni.getStorageSync("lang") as keyof typeof newSecondaryReply.content
//   ] = replyContent.value;
//   newSecondaryReply.parentReplyId = props.reply.id;
//   newSecondaryReply.course = props.reply.course;

//   Api.postComment(uni.getStorageSync("aueduSession"), newSecondaryReply).then(
//     (res: any) => {
//       if (res.statusCode === 200) {
//         uni.showToast({
//           title: "回复成功",
//           icon: "none",
//         });
//       } else {
//         uni.showToast({
//           title: "回复失败: " + res.errMsg,
//           icon: "none",
//         });
//       }
//     }
//   );
// };

const extractSons = (reply: any) => {
  if (reply.replies && reply.replies.length != 0) {
    reply.replies.forEach((element: any) => {
      element.parentReplyName = reply.user.username;
      element.parentReplyId = reply.id;
    });
    sons.value = [...sons.value, ...reply.replies];
    for (let i = 0; i < reply.replies.length; i++) {
      extractSons(reply.replies[i]);
    }
  }
};

onMounted(() => {
  if (props.replyType == "root") {
    extractSons(props.reply);
  }
});
</script>

<style lang="scss" scoped>
.reply-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  .root {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .author {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      .reply-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;
      }
      .name {
        font-size: 14px;
        font-weight: bold;
      }
    }
    .content {
      width: 100%;
      margin-top: 10px;
      margin-bottom: 10px;
      .alt {
        font-size: 12px;
        color: #999;
      }
    }
    .tab {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .floor {
        font-size: 12px;
        color: #999;
      }
      .open-reply-box {
        font-size: 12px;
        color: #999;
      }
    }
  }
}

.SecondaryReply {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .son {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    .reply-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;
    }
    .name {
      font-size: 14px;
      font-weight: bold;
    }
  }
  .commit-reply-to-reply {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    .reply-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;
    }
    .name {
      font-size: 14px;
      font-weight: bold;
    }
  }
}

.son-reply {
  width: 100%;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid #ccc;
  display: inline-block;
  padding: 0;
  padding-bottom: 10px;
}

.block {
  height: 1px;
  background-color: #ccc;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
