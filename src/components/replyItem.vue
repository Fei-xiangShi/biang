<template>
  <view class="reply-item">
    <view class="root">
      <view class="author">
        <view class="replyAvatar">
          <u-image
            :src="reply.author.avatarUrl"
            width="50px"
            height="50px"
            mode="aspectFill"
          />
        </view>
        <view class="name">{{ reply.author.name }}</view>
      </view>
      <view class="content">
        <view class="alt" v-if="reply.rootReplyId !== reply.parentReplyId">
          @ {{ reply.parentReplyId }}
        </view>
        <uaMarkdown :source="reply.content" />
      </view>
      <view class="tab">
        <view class="floor">{{ index + 1 }}楼</view>
        <view class="open-reply-box" @tap="changeReplyBox">回复</view>
      </view>
    </view>
    <view class="replyToReply" v-if="showReplyBox">
      <view class="son">
        <u-textarea
          v-model="newSecondaryReply.content"
          placeholder="请输入回复内容"
          maxlength="1000"
          border="bottom"
          height="1rem"
        />
      </view>
      <view class="commitReplyToReply">
        <view @tap="replyToReply">回复评论</view>
      </view>
    </view>
    <view class="block" v-if="reply.replyList && reply.replyList.length != 0" />
    <view
      class="sencondaryReply"
      v-for="(sencondaryReply, index) in reply.replyList"
    >
      <ReplyItem
        :key="sencondaryReply.id"
        :reply="sencondaryReply"
        :articleId="Number(articleId)"
        :rootReply="reply"
        :index="index"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import Api from "@/api/api";
import { reactive, ref } from "vue";
import Reply from "@/models/reply";
import uaMarkdown from "@/components/ua-markdown/ua-markdown.vue";
import ReplyItem from "@/components/replyItem.vue";

const props = defineProps({
  articleId: {
    type: Number,
    required: true,
  },
  reply: {
    type: Object,
    required: true,
  },
  rootReply: {
    type: Object,
    required: false,
  },
  index: {
    type: Number,
    required: true,
  },
});

let showReplyBox = ref(false);
const changeReplyBox = () => {
  showReplyBox.value = !showReplyBox.value;
};

let newSecondaryReply = reactive(new Reply());

const replyToReply = () => {
  if (newSecondaryReply.content === "") {
    uni.showToast({
      title: "回复内容不能为空",
      icon: "none",
    });
    return;
  }
  if (props.rootReply !== null && props.rootReply !== undefined) {
    newSecondaryReply.rootReplyId = props.rootReply.id;
  } else {
    newSecondaryReply.rootReplyId = props.reply.id;
  }
  newSecondaryReply.parentReplyId = props.reply.id;

  Api.reply(props.articleId, newSecondaryReply).then((res: any) => {
    console.log(res);
    if (res.statusCode === 200) {
      uni.showToast({
        title: "回复成功",
        icon: "none",
      });
    } else {
      uni.showToast({
        title: "回复失败: " + res.errMsg,
        icon: "none",
      });
    }
  });
};
</script>

<style lang="scss">
.reply-item {
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.reply-item .author {
  flex-direction: row;
  display: flex;
  font-size: 20px;
  font-weight: bold;
  .name {
    margin: 10px;
  }
}

.reply-item .content {
  flex-direction: column;
  margin: 5px;
  .alt {
    color: #6078ee;
    font-size: 14px;
  }
}

.reply-item .open-reply-box {
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
  margin-left: 10px;
}

.block {
  height: 1px;
  background-color: #ccc;
  margin-top: 10px;
  margin-bottom: 10px;
}

.reply-item .replyToReply {
  display: flex;
  flex-direction: row;
  margin-right: 10px;
  .son {
    flex: 1;
    margin: 1rem;
  }
  .commitReplyToReply {
    margin-top: 1rem;
    width: 5rem;
    text-align: center;
    height: auto;
    align-items: center;
    justify-content: center;
    background: #ccc;
    border-radius: 10px;
    display: flex;
  }
}
</style>
