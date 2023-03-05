<template>
    <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>{{info.title}}</span>
          </div>
        </template>
        <el-row>
          <el-col :span="10">
            <img :src="info.picture"/>
          </el-col>
          <el-col :span="10" :offset="2">
                {{info.content}}
          </el-col>
        </el-row>
      </el-card>
</template>

<script setup>
  import { defineProps } from 'vue'
  let props = defineProps(['info'])

</script>

<style scoped>
    .box {
        @apply flex space-x-4 flex-1 w-1/2
    }
</style>