import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTaskStore = defineStore('task', () => {
  const tasks = ref([])
  const columns = ref([
    {
      id: 0,
      title: 'На согласовании',
      color: '#FF99E9',
    },
    {
      id: 1,
      title: 'Новые',
      color: '#66B8FF',
    },
    {
      id: 2,
      title: 'В процессе',
      color: '#FFD466',
    },
    {
      id: 3,
      title: 'Готово',
      color: '#53C666',
    },
    {
      id: 4,
      title: 'Доработать',
      color: '#F76E85',
    },

  ])
  const columnTasks = ref({})
  const oneTask = ref()
  const notifications = ref([])
  let visibleNotification = ref(false)

  const filterStatus = computed(() => {
    return (status) => tasks.value.filter(el => el.status === status)
  })

  const findTask = (idx) => {
    oneTask.value = tasks.value.find(el => el.id === idx)
  }

  const addTask = (text, colId) => {
    const task = {
      id: Date.now(),
      text: text,
      status: colId,
    }
    tasks.value.push(task)
    oneTask.value = task
    updateColumnTasks()
  }

  const deleteTask = (idx) => {
    tasks.value = tasks.value.filter(el => el.id !== idx)
    updateColumnTasks()
  }

  const addNotification = (msg, taskText, valid) => {
    const notify = {
      id: Date.now().toLocaleString(),
      message: msg,
      text: taskText,
      valid: valid ?? true,
    }
    notifications.value.unshift(notify)
    visibleNotification.value = true

    setTimeout(() => {
      removeNotification(notify.id)
    }, 5000)
  }
  const removeNotification = (idx) => {
    const index = notifications.value.map(el => el.id).indexOf(idx);
    if (index !== -1) {
      notifications.value.splice(index, 1);
      visibleNotification.value = false
    }
  }

  const updateTaskStatus = (taskId, newStatus) => {
    const task = tasks.value.find(task => task.id === taskId);
    if (task) {
      task.status = newStatus;
    }
    updateColumnTasks()
  }

  const updateColumnTasks = () => {
    columns.value.forEach(col => {
      columnTasks.value[col.id] = tasks.value.filter(task => task.status === col.id);
    });
  };

  return { tasks, columns, oneTask, notifications, filterStatus, addTask, deleteTask, findTask, addNotification, removeNotification, visibleNotification, updateTaskStatus, updateColumnTasks, columnTasks }
})