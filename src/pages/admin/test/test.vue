<template>
  <div>
    <input id="check" v-model="checked" style="display: none" />
    <div class="box" :style="{ 'height': textHeight }">
      <div ref="box">
        <slot></slot>
      </div>
    </div>
    <div class="up-or-down" @click="toggle">
      <label for="check" class="check-in">
        <img
          src="@/static/icons/classTable/classTable_selected.png"
          alt="Toggle"
          class="raw"
        />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from "vue";
import type { Ref } from "vue";
const checked = ref(false);
const box: Ref<HTMLElement | null> = ref(null);
const totalHeight = ref("");
const textHeight = ref("70px");

const toggle = () => {
  checked.value = !checked.value;
  if(checked.value){
    textHeight.value=totalHeight.value;
  }
  else{
    textHeight.value='70px';
  }
};

onMounted(() => {
  if (box.value) {
    totalHeight.value = box.value.clientHeight+'px';
  }
  console.log(totalHeight.value+'px');
  console.log("hello");
});
</script>

<style scoped>
.check-in {
  display: block;
}
.raw {
  height: 1em;
}
.box{
    overflow:hidden;
    transition: height 1s ease;
}
</style>
