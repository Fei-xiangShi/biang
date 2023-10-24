<template>
  <view class="contanier">
    <view class="avatar">
      <u-avatar
        src="https://th.bing.com/th/id/OIP.rEU63q6oHc08uv3uh2_algHaEK?w=293&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
        :size=70
      ></u-avatar>
    </view>
    <view class="head">
      <u-row gutter="5">
        <u-col span="1"> </u-col>
        <u-col span="4">User_name</u-col>
        <u-col span="4">User_information</u-col>
      </u-row>
    </view>
    <view class="cell">
      <u-cell-group title="个人工具">
        <u-cell
          icon="setting-fill"
          title="工具1"
          label="解释"
          :arrow="true"
          value="click here"
          @click=""
        ></u-cell>
        <u-cell
          icon="photo"
          title="工具2"
          label="解释"
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

<script setup lang="ts"></script>

<style>
.avatar{
  margin-top: 10%;
  margin-left: 15%;
}
</style>
