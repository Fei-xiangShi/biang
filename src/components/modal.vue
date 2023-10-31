<template>
  <view class="container" :class="{'visible': show}">
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
    default: "Confirm",
  },
  cancelText: {
    type: String,
    default: "Cancel",
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
.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: 0.15s ease-in;
  z-index: -1;
  ::before {
    clip-path: polygon(0 90%, 100% 90%, 100% 100%, 0 100%);
  }
}

.visible {
  opacity: 1;
  z-index: 9999;
  &::before {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}

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
