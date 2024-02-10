<template>
  <div class="container">
    <div class="column" v-for="col in columns" :key="col.id">
      <column-task :col="col" />
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from "@/store/store";
import ColumnTask from "@/components/ColumnTask.vue";

// const tasks = useTaskStore().tasks
const columns = useTaskStore().columns;
</script>