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

  const showAddField = ref(false)

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
    console.log('new tasks arr', tasks.value);
  }

  return { tasks, columns, showAddField, filterStatus, addTask }
})