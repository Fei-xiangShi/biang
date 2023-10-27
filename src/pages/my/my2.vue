<template>
  <view class="container">
    <navbar />
    <view class="head">
      <u-row>
        <u-col span="1"></u-col>
        <u-col span="4">
          <view class="avatar">
            <u-avatar icon="star-fill" @click="navigate('sub/uploadAvator')"></u-avatar>
          </view>
        </u-col>
        <u-col span="7">User_name</u-col>
      </u-row>
    </view>
    <view class="my_function">
      <view class="my_function_item" v-for="item in item_list" @click="navigate(item.url)">
        <u-row>
          <u-col span="1"></u-col>
          <u-col span="5">
            <u-icon :name="item.icon" size="30"></u-icon>
          </u-col>
          <u-col span="4">
          <view class="item_text">
            <view>{{ item.text }}</view>
          </view>  
          </u-col>
          <u-col span="2">
            <u-icon name="arrow-right"></u-icon>
          </u-col>
        </u-row>  
      </view>
    </view>

    <view class="cell">
      <u-cell-group title="个人工具">
        <u-cell
          size=""
          icon="setting-fill"
          title="介绍"
          isLink
          url="/pages/my/sub/introduction"
          value="click here"
        ></u-cell>
        <u-cell
          icon="photo"
          title="工具2"
          :isLink="true"
          hover-class="cell-hover-class"
        ></u-cell>
      </u-cell-group>
    </view>
  </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar.vue";
const navigate = (url:string) => {
  console.log("test"),
  uni.navigateTo({
    url: url,
  });
};

const item_list = [
  {
    icon:"home",
    text:"功能1",
    url:"sub/uploadAvator"
  },
  {
    icon:"home",
    text:"introduction",
    url:"sub/introduction"
  },
  {
    icon:"home",
    text:"功能3",
    url:"sub/introduction"
  },
  {
    icon:"home",
    text:"功能4",
    url:"sub/introduction"
  }
]
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(
    135deg,
    #a6eeee7a 10%,
    #91d8c84d 40%,
    #fcfcd491 60%
  );
}
.my_function{
  padding: 1px;
}

.my_function .my_function_item{
  margin-top: 10px;
}

.avatar {
  margin-top: 10%;
  margin-left: 15%;
}
</style>
