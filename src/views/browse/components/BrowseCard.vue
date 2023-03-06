<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{cardInfo.title}}</span>
      </div>
    </template>
    <el-row>
      <el-col :span="10">
        <img :src="cardInfo.picture" />
      </el-col>
      <el-col :span="10" :offset="2">
        {{cardInfo.content}}
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
  import { defineProps } from 'vue'
  defineProps({
    cardInfo: Object
  })

</script>

<style scoped>
  .box {
    @apply flex space-x-4 flex-1 w-1/2
  }
</style>