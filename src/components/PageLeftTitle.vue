<!-- 侧标题组件 -->
<template>
    <el-row>
      <el-col :span="12" class="page-info m-9">{{pageTitle}}</el-col>
    </el-row>
</template>

<script setup>
    import { defineProps } from 'vue'
    
    defineProps({
        pageTitle: String
    })
</script>

<style scoped>
    .page-info {
        @apply flex items-center font-bold pt-5 pb-3 text-4xl
    }
</style>