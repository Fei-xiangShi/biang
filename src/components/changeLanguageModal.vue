<template>
  <modal
    :title="t('选择语言提示')"
    :show="show"
    :closeOnClickOverlay="true"
    @close="emit('cancel')"
    @cancel="emit('cancel')"
    @confirm="emit('confirm', check)"
  >
    <view class="languages">
      <view
        class="language-item"
        :class="{ choose: check == index }"
        :id="String(index)"
        @tap="changeLang"
        v-for="(item, index) in languageList"
      >
        <view class="icon" :class="{ 'choose-icon-animation': check == index }">
          <u-icon
            :name="check == index ? 'checkmark-circle' : 'minus-circle'"
            size="20"
            color="#606266"
          />
        </view>
        <view class="language-item-text">{{ item }}</view>
      </view>
    </view>
  </modal>
</template>

<script setup lang="ts">
import modal from "@/components/modal.vue";
import { useI18n } from "vue-i18n";
import { ref } from "vue";

const { t } = useI18n();
const check = ref(0);

defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "cancel", "confirm"]);

const changeLang = (e: any) => {
  check.value = e.currentTarget.id;
};

const languageList = ref([
  t("语言跟随系统提示"),
  "简体中文",
  "繁体中文",
  "English",
]);
</script>

<style scoped lang="scss">

.languages {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .language-item {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 50px;
    background: rgba(234, 234, 234, 0.5);
    border-radius: var(--borderRadius-medium, 0.375rem);
    margin: 10px 0px;
    .language-item-text {
      margin-left: 10px;
      font-size: 1rem;
      color: #606266;
    }
  }
  .choose {
    background: rgba(23, 198, 52, 0.52);
  }
}

@keyframes scaleAnimation {
  from {
    transform: rotate(0deg) scale(0.5);
  }
  to {
    transform: rotate(360deg) scale(1);
  }
}

.choose-icon-animation {
  animation: scaleAnimation 0.8s cubic-bezier(0.2, -0.2, 0.27, 1.55) forwards;
}
</style>
