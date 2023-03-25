<template>
  <el-card shadow="hover" class="border-1 bg-white">
    <template #header  >
      <div class="flex justify-between">
        <span class="text-xl font-bold"> {{ title }}</span>
        <el-tag class="ml-2" type="success">日期</el-tag>
      </div>
    </template>

    <span class="text-sm font-bold">下载文件数量：</span><span class="text-gray-500 font-bold text-2xl">{{downloadCount}}</span>
    <el-divider/>
    <span class="text-sm font-bold">上传文件数量：</span><span class="text-gray-500 font-bold text-2xl">{{uploadCount}}</span>

  </el-card>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  uploadCount: {
    type: Number,
    required: true
  },
  downloadCount: {
    type: Number,
    required: true
  }
})
</script>

<style scoped>

</style>
