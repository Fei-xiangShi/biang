<template>
  <view class="body">
    <navbar />
    <scroll-view
      :scroll-y="true"
      :scroll-with-animation="true"
      style="height: 100%"
    >
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import navbar from "@/components/navbar.vue";
</script>
