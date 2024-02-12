<template>
  <div class="title" :style="{ 'background-color': column.color }">
    {{ column.title }}
  </div>
  <ul class="column-container">
    <li v-for="task in filteredTask" :key="task.id">
      <div class="task">
        {{ task.text }}
        <actions-dropdown :task="task" @action="handelAction" />
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
    <task-add-field
      v-if="showAddField"
      @addTask="handelAdd"
      @resetField="handelReset"
    />
  </ul>
  <modal-delete-task v-if="showModalDelete" @deleteTask="handelDelete" @close="handelClose"/>
</template>

<script setup>
import { defineProps, onMounted, ref } from "vue";
import { useTaskStore } from "@/store/store";
import TaskAddField from "./TaskAddField.vue";
import ActionsDropdown from "@/components/modules/ActionsDropdown.vue";
import ModalDeleteTask from "@/components/modal/ModalDeleteTask.vue"

const props = defineProps({
  col: {
    type: Object,
    required: true,
    default: () => {},
  },
});
const store = useTaskStore();
const column = ref(props.col);
const filteredTask = ref([]);
const showAddField = ref(false);
const showModalDelete = ref(false)

onMounted(() => {
  filteredTask.value = store.filterStatus(column.value.id);
});

const handelAdd = (el) => {
  store.addTask(el, column.value.id);
  filteredTask.value = store.filterStatus(column.value.id);
  showAddField.value = false;
  const message = `создана в "${column.value.title}"`
  store.addNotification(message, el)
};

const handelReset = (el) => {
  showAddField.value = el;
};

const handelAction = (task, select) => {
  console.log('action!!!', select);
  if (select === "delete") {
    store.findTask(task.id)
    showModalDelete.value = true
  }
};

const handelDelete = (task) => {
  store.deleteTask(task.id)
  filteredTask.value = store.filterStatus(column.value.id);
  showModalDelete.value = false
}

const handelClose = () => {
  showModalDelete.value = false
}
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
  overflow-x: hidden;
  overflow-y: scroll;
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