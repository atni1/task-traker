<template>
  <div class="dropdown">
    <button @click="toggleDropdown" class="button-reset details">
      <img src="@/assets/images/details.svg" alt="details" fill="red" />
    </button>
    <ul v-if="isOpen" class="dropdown-menu">
      <li
        v-for="(option, index) in options"
        :key="index"
        @click="selectOption(option)"
        :disabled="option.disabled"
        :class="{'disabled': option.disabled}"
      >
        <img :src="option.img" alt="" srcset="" />
        {{ option.text }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from "vue";

const emit = defineEmits(['action'])
const isOpen = ref(false)
const options = ref([
  {
    value: "edit",
    text: "Редактировать",
    img: require("@/assets/images/edit.svg"),
    disabled: true
  },
  {
    value: "delete",
    text: "Удалить",
    img: require("@/assets/images/delete.svg"),
    disabled: false
  },
])
const props = defineProps({
  task: {
    type: Object,
    require: true,
    default: () => {},
  },
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
}

const selectOption = (option) => {
  emit('action', props.task, option.value)
  isOpen.value = false;
}
</script>

<style>
.details {
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.dropdown-toggle {
  background-color: #ffffff;
  border: 1px solid #ccc;
  padding: 5px 10px;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  background-color: #ffffff;
  border: 1px solid #e3e5e8;
  border-radius: 4px;
  padding: 8px 0;
  list-style: none;
  z-index: 1000;
}

.dropdown-menu li {
  padding: 5px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-style: 14px;
}

.disabled {
  opacity: 0.5;
}
</style>
