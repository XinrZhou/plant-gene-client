<!-- 卡片组件 -->
<template>
  <el-card class="box-card h-52" shadow="hover">
    <template #header>
      <div class="card-header">
        <span class="my-content">{{cardInfo.title}}</span>
      </div>
    </template>
    <el-row>
      <el-col :span="24">
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
  .my-content{
    color: #18bc9c;
    font-size: 22px;
    line-height: 25px;
  }
  .el-card {
    background-color: rgb(250,250,255);
  }

</style>