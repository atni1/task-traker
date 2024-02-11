<template>
  <teleport to="body">
    <div class="delete-modal">
      <div class="overlay" @click="closeModal"></div>
      <div class="modal">
        <h2 class="modal-title">Удалить задачу?</h2>
        <p>{{ store.task?.text }}</p>
        <div class="modal-button-group">
          <button class="modal-button button-reset" @click="deleteTask">
            Удалить
          </button>
          <button class="modal-button button-reset" @click="closeModal">
            Отменить
          </button>
        </div>
        <button class="modal-close button-reset" @click="closeModal">
          <svg-close />
        </button>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { defineEmits } from "vue";
import { useTaskStore } from "@/store/store";
import SvgClose from "@/components/svg/SvgClose.vue";

const store = useTaskStore();

const emit = defineEmits(["close"], ["deleteTask"]);
const closeModal = () => {
  emit("close");
};

const deleteTask = () => {
  emit("deleteTask", store.task);
};
</script>

<style lang="scss" scoped>
.delete-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  .modal {
    background: white;
    padding: 20px;
    border-radius: 8px;
    z-index: 1;
    width: 500px;
    position: relative;

    &-title {
      font-size: 24px;
      line-height: 30px;
      font-weight: 600;
      margin-bottom: 24px;
    }

    &-button-group {
      display: flex;
      justify-content: space-between;
      margin-top: 24px;
    }

    &-button {
      padding: 8px 16px;
      border-radius: 4px;
      border: 1px solid #c4cad4;
      width: 48%;

      &:active, &:hover {
        transform: scale(1.05);
      }
    }

    &-close {
      position: absolute;
      top: 16px;
      right: 16px;
    }
  }
}
</style>