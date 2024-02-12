import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTaskStore = defineStore('task', () => {
  const tasks = ref([
    {
      id: 0,
      text: "to be agreeto be agreeto be agreeto be agreeto be agreeto be agreeto be agreeto",
      status: 0
    },
    {
      id: 1,
      text: "new",
      status: 1
    },
    {
      id: 2,
      text: "in progress",
      status: 2
    },
    {
      id: 3,
      text: "to be agree222 agree222 agree222 agree222 agree222 agree222 agree222 agree222 agree222 agree222 agree222 agree222 agree222 agree222 agree222",
      status: 0
    },
    {
      id: 4,
      text: "done",
      status: 3
    },
    {
      id: 5,
      text: "finalize",
      status: 4
    },
  ])
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

  const task = ref()
  const notifications = ref([])
  let visibleNotification = ref(false)

  const filterStatus = computed(() => {
    return (status) => tasks.value.filter(el => el.status === status)
  })

  const addTask = (text, colId) => {
    const task = {
      id: tasks.value.length + 1,
      text: text,
      status: colId,
    }
    console.log('created task', task);
    tasks.value.push(task)
    task.value = task
    console.log('new tasks arr', tasks.value,);
    console.log('new task', task.value);
  }

  const deleteTask = (idx) => {
    tasks.value = tasks.value.filter(el => el.id !== idx)
    console.log('task delet', tasks.value);
  }

  const findTask = (idx) => {
    task.value = tasks.value.find(el => el.id === idx)
    console.log('findTask', task.value);
  }

  const addNotification = (msg, taskText) => {
    const notify = {
      id: Date.now().toLocaleString(),
      message: msg,
      text: taskText,
    }
    notifications.value.unshift(notify)
    visibleNotification.value = true

    // setTimeout(() => {
    //   removeNotification(notify.id)
    // }, 30000)
  }
  const removeNotification = (idx) => {
    const index = notifications.value.map(el => el.id).indexOf(idx);
    if (index !== -1) {
      notifications.value.splice(index, 1);
      visibleNotification.value = false
    }
  }

  return { tasks, columns, task, notifications, filterStatus, addTask, deleteTask, findTask, addNotification, removeNotification, visibleNotification }
})