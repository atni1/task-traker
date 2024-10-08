<template>
  <teleport to="body">
    <div v-if="store.visibleNotification" class="notification">
      <transition-group name="transition-animate" tag="ul" class="messages_list">
        <li
          :class="`notification__content${notify.valid?'':'__danger'}`"
          v-for="notify in notifications"
          :key="notify.id"
        >
          <div class="content">
            <div :class="`content__check-mark${notify.valid?'':'__danger'}`">
              <svg-check-mark v-if="notify.valid" :color="'#ffffff'" />
              <svg-close v-else :color="'#ffffff'" /> 
            </div>
            <div class="content__info">
              <h3 class="content__title">Задача {{ notify.message }}</h3>
              <p class="content__text">{{ notify.text }}</p>
            </div>
          </div>
          <button class="button-close button-reset" @click="hideNotification(notify.id)">
            <svg-close/>
          </button>
        </li>
      </transition-group>
    </div>
  </teleport>
</template>

<script setup>
import {  ref, watch } from "vue";
import { useTaskStore } from "@/store/store";
import SvgCheckMark from '@/components/svg/SvgCheckMark.vue'
import SvgClose from "@/components/svg/SvgClose.vue"

const store = useTaskStore();

const notifications = ref(store.notifications)
const visible = ref()

watch(() => store.visibleNotification, (newValue) => {
  visible.value = newValue;
});

const hideNotification = (idx) => {
  store.removeNotification(idx)
}
</script>

<style lang="scss" scoped>
.notification {
  position: fixed;
  bottom: 25px;
  right: 25px;
  z-index: 10;
  .messages_list {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
  &__content, &__content__danger {
    padding: 16px 16px 16px 24px;
    border-radius: 4px;
    border: 1px solid #E3E5E8;
    border-left: 8px solid #22C33D;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.06);
    width: 400px;
    min-height: 76px;
    &__danger {
      border-left: 8px solid #e01335;
    }
  }
  .content {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    
    &__check-mark, &__check-mark__danger {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      min-width: 24px;
      max-width: 24px;
      height: 24px;
      background: #22C33D;
      &__danger { 
        background: #e01335;
      }
    }
    &__info {
      display: flex;
      flex-direction: column;
      gap: 8px
    }

    &__title {
      color: #1C2530;
      font-size: 14px;
      font-weight: 600;
      line-height: 17.5px;
    }
    &__text {
      font-weight: 400;
    }
  }

  .button-close {
    align-self: flex-start;
  }
}

.transition-animate {
  &-enter {
    transform: translateX(120px);
    opacity: 0;
  }
  &-enter-active {
    transition: all 0.6s ease;
  }
  &-enter-to {
    opacity: 1;
  }

  &-leave {
    height: 50px;
    opacity: 1;
  }
  &-leave-active {
    transition: transform 0.6s ease, opacity 0.6s, height 0.6s 0.2s;
  }
  &-leave-to {
    height: 0;
    transform: translateX(120px);
    opacity: 0;
  }

  &-move {
    transition: transform 0.6s ease;
  }
}
</style>
