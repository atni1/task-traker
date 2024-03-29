<template>
  <div class="title" :style="{ 'background-color': column.color }">
    {{ column.title }}
  </div>
  <ul
    class="column-container"
    ref="columnContainer"
    @dragover="dragover($event)"
    @drop="drop($event)"
  >
    <li
      v-for="task in filteredTask"
      :key="task.id"
      :draggable="true"
      @dragstart="dragStart(task, $event)"
    >
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
  <modal-delete-task
    v-if="showModalDelete"
    @deleteTask="handelDelete"
    @close="handelClose"
  />
</template>

<script setup>
import { defineProps, onMounted, ref, watch } from "vue";
import { useTaskStore } from "@/store/store";
import TaskAddField from "./TaskAddField.vue";
import ActionsDropdown from "@/components/modules/ActionsDropdown.vue";
import ModalDeleteTask from "@/components/modal/ModalDeleteTask.vue";

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
const showModalDelete = ref(false);

onMounted(() => {
  store.updateColumnTasks()
  filteredTask.value = store.columnTasks[column.value.id] || [];
});

watch(() => store.columnTasks[column.value.id], (newVal) => {
  filteredTask.value = newVal || [];
});

const handelAdd = (el) => {
  store.addTask(el, column.value.id);
  // filteredTask.value = store.filterStatus(column.value.id);
  showAddField.value = false;
  const message = `создана в "${column.value.title}"`;
  store.addNotification(message, el);
};

const handelReset = (el) => {
  showAddField.value = el;
};

const handelAction = (task, select) => {
  if (select === "delete") {
    store.findTask(task.id);
    showModalDelete.value = true;
  }
};

const handelDelete = (task) => {
  store.deleteTask(task.id);
  showModalDelete.value = false;

  const message = `удалена`;
  store.addNotification(message, task.text);
};

const handelClose = () => {
  showModalDelete.value = false;
};

const dragStart = (task, event) => {
  event.dataTransfer.setData("text/plain", task.id.toString());
  event.dataTransfer.effectAllowed = "move"
};

const drop = (event) => {
  event.preventDefault();
  const taskId = parseInt(event.dataTransfer.getData("text/plain"));
  const sourceTask = store.tasks.find((task) => task.id === taskId);
  if (sourceTask && sourceTask.status !== column.value.id) {
    store.updateTaskStatus(sourceTask.id, column.value.id);
    const message = `перенесена в "${column.value.title}"`;
    store.addNotification(message, sourceTask.text);
  }
};

const dragover = (event) => {
  event.preventDefault();
  event.dropEffect = "move"
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
  padding: 4px 8px 4px 4px;
  margin: 4px;
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

.column-container::-webkit-scrollbar {
  width: 6px;
}

.column-container::-webkit-scrollbar-thumb {
  background-color: #C4CAD4; /* Цвет ползунка */
  border-radius: 10px; 
}
</style>