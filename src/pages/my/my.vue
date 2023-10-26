<template>
  <view class="contanier">
    <view class="head">
      <u-row>
        <u-col span="1"></u-col>
        <u-col span="4">
          <view class="avatar">
            <u-avatar
              icon="star-fill"
              @click="navi_avator"
            ></u-avatar>
          </view>
        </u-col>
        <u-col span="7">User_name</u-col>
      </u-row>
    </view>
    <view class="cell">
      <u-cell-group title="个人工具">
        <u-cell
        size=""
          icon="setting-fill"
          title="介绍"
          isLink url="/pages/my/sub/introduction"
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
    <view class="test">
      <u-tag text="hello" shape="circle" closable:show="show" @close=""></u-tag>
    </view>

  </view>
</template>

<script setup lang="ts">

const navi_avator =()=>{
  uni.navigateTo({
    url:'sub/uploadAvator'
  })
}

</script>

<style>
.avatar{
  margin-top: 10%;
  margin-left: 15%;
}
</style>
