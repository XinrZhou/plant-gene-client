<template>
    <Title title="List of Drought resistance genes" />
    <el-row>
        <el-input v-model="input" class="w-50  mb-4 " size="large" placeholder="Search" :prefix-icon="Search"
            @change="change" />
    </el-row>
    <el-row>
        <datalist />
    </el-row>
</template>

<script setup>
    import Title from '~/components/Title.vue'
    import { ref, reactive, defineAsyncComponent } from 'vue'
    import { Search } from '@element-plus/icons-vue'

    const input = ref('')

    let datalist = defineAsyncComponent(() => import('~/views/analysis/DataList.vue'))

    // 搜索框失去焦点触发
    let change = () => {
        console.log('查询')
    }


</script>

<style scoped>

</style>