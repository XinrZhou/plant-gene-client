<template>
  <el-card class="box-card h-60">
    <template #header>
      <div class="card-header">
        <span>{{cardInfo.title}}</span>
      </div>
    </template>
    <el-row>
      <el-col :span="9">
        <img :src="cardInfo.picture" class="auto bg-cover"/>
      </el-col>
      <el-col :span="13" :offset="2">
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
    @apply flex space-x-4 flex-1 w-1/2;
  }
</style>