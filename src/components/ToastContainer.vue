<script setup lang="ts">
import { useToast } from '@/composables/useToast'
const { toasts, remove } = useToast()
</script>

<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none" style="min-width:0;max-width:380px">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-[14px] shadow-[0_8px_32px_rgba(0,0,0,0.18)] text-[14px] font-medium w-full"
          :class="{
            'bg-[#127336] text-white': toast.type === 'success',
            'bg-[#DC2626] text-white': toast.type === 'error',
            'bg-[#42008A] text-white': toast.type === 'info',
          }"
        >
          <span class="shrink-0 text-[18px] leading-[1.4]">
            <span v-if="toast.type === 'success'">✓</span>
            <span v-else-if="toast.type === 'error'">✕</span>
            <span v-else>ℹ</span>
          </span>
          <span class="flex-1 leading-[1.5]">{{ toast.message }}</span>
          <button
            @click="remove(toast.id)"
            class="shrink-0 opacity-60 hover:opacity-100 transition-opacity text-[20px] leading-none mt-[-1px]"
          >×</button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-enter-active {
  animation: toast-in 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toast-leave-active {
  animation: toast-out 0.22s ease-in forwards;
}
.toast-move {
  transition: transform 0.25s ease;
}
@keyframes toast-in {
  from { opacity: 0; transform: translateX(28px) scale(0.96); }
  to   { opacity: 1; transform: translateX(0)    scale(1);    }
}
@keyframes toast-out {
  from { opacity: 1; transform: translateX(0)    scale(1);    }
  to   { opacity: 0; transform: translateX(28px) scale(0.96); }
}
</style>
