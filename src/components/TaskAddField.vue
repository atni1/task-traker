<template>
  <form
    @submit.prevent="addTask"
    @reset.prevent="resetField"
    class="form-filed"
  >
    <textarea
      class="task-text"
      ref="textareaRef"
      minlength="2"
      v-model="text"
      placeholder="Введите текст..."
      autofocus
    ></textarea>
    <button type="reset" class="reset button-reset">
      <svg-close :color="'#F53D5C'" />
    </button>
    <button type="submit" class="add button-reset">
      <svg-check-mark />
    </button>
  </form>
</template>

<script setup>
import SvgClose from "@/components/svg/SvgClose.vue";
import SvgCheckMark from "@/components/svg/SvgCheckMark.vue";
import { ref, onMounted, nextTick, defineEmits } from "vue";

const emit = defineEmits(['addTask'], ['resetField'])

const text = ref("");
const textareaRef = ref(null);

onMounted(async () => {
  await nextTick();
  if (textareaRef.value) {
    textareaRef.value.focus();
  }
});

const resetField = () => {
  text.value = "";
  emit('resetField', false)
};

const addTask = () => {
  emit('addTask', text.value)
};
</script>

<style lang="scss" scoped>
.form-filed {
  position: relative;
  .reset {
    position: absolute;
    top: 8px;
    right: 5px;
    width: 20px;
    height: 20px;
  }
  .add {
    position: absolute;
    bottom: 8px;
    right: 5px;
    width: 20px;
    height: 20px;
  }
}

.task-text {
  height: 52px;
  resize: none;
  width: 100%;
  padding: 8px 22px 8px 8px;
  border-radius: 4px;
  outline-color: #3d86f4;
  font-size: 13px;

}

.task-text::-webkit-scrollbar {
  display: none;
}
</style>