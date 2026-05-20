<template>
  <DashboardLayout>
    <div class="flex flex-col gap-6 lg:mt-[100px] mt-[20px]">
      <h1 class="text-[32px] font-semibold text-[#42008A] leading-[16px] tracking-[0.24px]">Тест ИИ</h1>

      <!-- Chat Container -->
      <div class="bg-[#F4EFFF] rounded-[15px] p-4 lg:p-6 min-h-[400px] lg:min-h-[600px] flex flex-col">
        <ChatContainer />
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import ChatContainer from '@/components/ChatContainer.vue'
</script>

<style scoped></style>
