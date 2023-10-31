<template>
  <view class="modalbox" v-if="show" >
    <overlay :show="true" @tap="onClickOverlay"/>
    
    <view class="modal">
      <view class="modal-title">{{ title }}</view>
      <view class="modal-content">{{ content }}</view>
      <slot></slot>
      <view class="modal-buttons">
        <view
          class="modal-button cancel"
          v-if="showCancelButton"
          @tap="emit('cancel')"
        >
          {{ cancelText }}
        </view>
        <view
          class="modal-button confirm"
          v-if="showConfirmButton"
          @tap="emit('confirm')"
        >
          {{ confirmText }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import overlay from "@/components/overlay.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
  confirmText: {
    type: String,
    default: t("确认"),
  },
  cancelText: {
    type: String,
    default: t("取消"),
  },
  showConfirmButton: {
    type: Boolean,
    default: true,
  },
  showCancelButton: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["confirm", "cancel", "close"]);

const onClickOverlay = () => {
  if (props.closeOnClickOverlay) {
    emit("close");
  }
};
</script>

<style scoped lang="scss">
.modal {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1000;
  width: 80%;
  max-width: 400px;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  .modal-title {
    font-size: 20px;
    font-weight: bold;
  }
  .modal-content {
    font-size: 16px;
    margin-bottom: 20px;
  }
  .modal-buttons {
    display: flex;
    justify-content: space-between;
    .modal-button {
      flex: 1;
      padding: 10px;
      border-radius: 10px;
      &.cancel {
        margin-right: 10px;
        background-color: #e5e5e5;
      }
      &.confirm {
        margin-left: 10px;
        background-color: #007aff;
        color: white;
      }
    }
  }
}
</style>
