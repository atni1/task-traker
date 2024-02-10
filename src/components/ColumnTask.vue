<template>
  <div class="title" :style="{ 'background-color': column.color }">
    {{ column.title }}
  </div>
  <ul class="column-container">
    <li v-for="task in filteredTask" :key="task.id">
      <div class="task">
        {{ task.text }}
        <button class="button-reset details">
          <img src="@/assets/images/details.svg" alt="details" />
        </button>
      </div>
    </li>
    <button
      v-show="!showAddField"
      class="button-reset button-add"
      @click="showAddField = true"
    >
      <img src="@/assets/images/add-plus.svg" alt="plus" />
      Добавить
    </button>
    <task-add-field :colId="column.id" v-if="showAddField" />
  </ul>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { useTaskStore } from "@/store/store";
import TaskAddField from "./TaskAddField.vue";

const props = defineProps({
  col: {
    type: Object,
    required: true,
    default: () => {},
  },
});
const store = useTaskStore();
const column = ref(props.col);

const filteredTask = store.filterStatus(column.value.id);

const showAddField = ref(store.showAddField);
</script>

<style lang="scss" scoped>
.title {
  height: 32px;
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.column-container {
  padding: 8px;
  height: 564px;
  gap: 8px;
  display: flex;
  flex-direction: column;
  .task {
    border: 1px solid #c4cad4;
    background: #ffffff;
    padding: 8px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .button-add {
    display: flex;
    align-items: center;
    color: #3d86f4;
    font-size: 14px;
    line-height: 18px;

    img {
      margin-right: 4px;
    }
  }
}
</style>