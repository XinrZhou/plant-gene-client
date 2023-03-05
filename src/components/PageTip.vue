<template>
    <el-row>
      <el-col :span="12" class="page-info m-9">{{name}}</el-col>
    </el-row>
</template>

<script setup>
    import { defineProps } from 'vue'
    defineProps(['name'])
</script>

<style scoped>
    .page-info {
        /* margin: 30px; */
        @apply flex items-center font-bold pt-5 pb-5 text-6xl
    }
</style>