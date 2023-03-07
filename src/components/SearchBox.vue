<template>
    <el-row>
        <el-input v-model="input" class="w-50  mb-4 " size="large" placeholder="Search" :prefix-icon="Search"
            @change="change" />
    </el-row>
</template>

<script setup>
    import { Search } from '@element-plus/icons-vue'
    import { ref } from 'vue'

    const input = ref('')

    // 搜索框失去焦点触发
    let change = () => {
        console.log('查询')
    }
</script>

<style scoped>

</style>