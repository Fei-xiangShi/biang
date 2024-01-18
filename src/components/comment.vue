<template>
  <view class="reply-item" :class="{ 'son-reply': replyType !== 'root' }">
    <view class="root">
      <view class="head">
        <view class="author">
          <view class="reply-avatar">
            <u-avatar
              :src="reply.user.avatar_url"
              width="50px"
              height="50px"
              mode="aspectFill"
            />
          </view>
          <view class="name">{{ reply.user.username }}</view>
        </view>
        <view class="comment-language">
          <view class="original" @tap="language=reply.lang" :class="{selected: language==reply.lang}">{{ $t("comment.原文") }}</view>
          <view class="chinese" @tap="language='zh-Hans'" :class="{selected: language=='zh-Hans'}">{{ $t("comment.中文") }}</view>
          <view class="english" @tap="language='en'" :class="{selected: language=='en'}">{{ $t("comment.英文") }}</view>
        </view>
      </view>
      <view class="content">
        <view class="reply-content">
          <view class="raw-text">
            <span class="alt" v-if="replyType !== 'root'">
              @ {{ reply.parentReplyName }}:
            </span>
            {{ reply?.content[language] }}
          </view>
          <!-- <uaMarkdown :source="reply?.content[language]" /> -->
        </view>
      </view>
      <view class="tab">
        <view class="left">
          <view class="floor" v-if="language=='zh-Hans'">{{ index + 1 }}楼</view>
          <view class="time">{{ new Date(reply.created_at).toLocaleDateString() }}</view>
        </view>
        <view
          class="open-reply-box"
          @tap="emit('onReply', reply.id, reply.user.username)"
        >
          {{ $t("comment.回复") }}
        </view>
      </view>
    </view>
    <view class="block" v-if="sons.length > 0" />
    <view
      class="sencondary-reply"
      v-for="(sonReply, index) in sons"
      :key="sonReply.id"
    >
      <view class="block" v-if="index > 0" />
      <Comment
        :reply="sonReply"
        :index="index"
        replyType="son"
        @onReply="emit('onReply', reply.id, reply.user.username)"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
// import uaMarkdown from "@/components/ua-markdown/ua-markdown.vue";
import Comment from "@/components/comment.vue";

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
});

const emit = defineEmits(["onReply"]);

const language = ref(uni.getStorageSync("lang"));
const sons = ref<any>([]);

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
  width: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  margin: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  .root {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .head {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .author {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        .reply-avatar {
          border-radius: 50%;
          overflow: hidden;
          margin-right: 10px;
        }
        .name {
          font-size: 14px;
          font-weight: bold;
        }
      }
      .comment-language {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        transition: all 0.25s ease-in-out;
        .original {
          font-size: 12px;
          color: #999;
          margin-right: 10px;
        }
        .chinese {
          font-size: 12px;
          color: #999;
          margin-right: 10px;
        }
        .english {
          font-size: 12px;
          color: #999;
        }
        .selected{
          color: #7a9adc;
        }
      }
    }
    .content {
      display: flex;
      flex-direction: row;
      width: 100%;
      margin: 10px 0; 
      align-items: center;
      .reply-content {
        font-size: 14px;
        color: #303133;
        .alt {
          display: inline-block;
          width: fit-content;
          font-size: 12px;
          color: rgb(100, 172, 230);
          margin-right: 0.5rem;
        }
      }
    }
    .tab {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .left {
        display: flex;
        flex-direction: row;
        align-items: center;
        .floor {
          font-size: 12px;
          color: #999;
          margin-right: 10px;
        }
        .time {
          font-size: 12px;
          color: #999;
        }
      }
      .open-reply-box {
        font-size: 12px;
        color: #999;
      }
    }
  }
}

.son-reply {
  border-radius: 0;
  border: none;
  display: inline-block;
  padding: 0;
  padding-bottom: 10px;
}

.block {
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin-top: 10px;
  margin-bottom: 10px;
}

.sencondary-reply {
  width: -webkit-fill-available;
}
</style>
