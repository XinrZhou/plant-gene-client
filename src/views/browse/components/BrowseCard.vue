<!-- 卡片组件 -->
<template>
  <el-card class="box-card h-52" shadow="hover">
    <template #header>
      <div class="card-header">
        <a class="my-content "  @click="goListItem(cardInfo.title)">{{cardInfo.title}}</a>
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
  import router from "~/router/index.js";
  
  defineProps({
    cardInfo: Object
  })
  const goListItem = (title) => {
    router.push({
      name: 'streetypelistdetail',
      query: {
        stressName: title
      }
    })
  }

</script>

<style scoped>
  .box {
    @apply flex space-x-4 flex-1 w-1/2;
  }
  .my-content{
    color: #18bc9c;
    font-size: 22px;
    line-height: 25px;
    cursor:pointer;
  }
  .el-card {
    background-color: rgb(250,250,255);
  }

</style>