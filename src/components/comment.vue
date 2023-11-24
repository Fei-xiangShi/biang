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
        <view class="floor">{{ index + 1 }}楼</view>
        <view
          class="open-reply-box"
          @tap="emit('onReply', reply.id, reply.user.username)"
        >
          回复
        </view>
      </view>
    </view>
    <view class="block" v-if="sons.length > 0" />
    <view
      class="sencondary-reply"
      v-for="(sonReply, index) in sons"
      :key="sonReply.id"
    >
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

const language = uni.getStorageSync("lang");
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
      display: flex;
      flex-direction: row;
      width: 100%;
      margin-top: 10px;
      margin-bottom: 10px;
      flex-wrap: nowrap;
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

.son-reply {
  border-radius: 0;
  border: none;
  border-bottom: 1px solid #ccc;
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
