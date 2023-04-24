<template>
    <el-input :prefix-icon="Search" v-model="tableInput" @input="handleTableChange" clearable />
    <el-table :data="tableDataFilterList" class="el-table-vertical-demo" max-height="550px">
        <el-table-column prop="gene" label="gene name">
            <template v-slot="{ row }">
                <a href="" @click.prevent="goGeneDetail(row)" class="underline">{{row.gene}}</a>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
    import { ref, computed, toRaw, watchEffect, watch } from 'vue'
    import { Search } from '@element-plus/icons-vue'
    import router from "~/router"

    let props = defineProps(['tableData'])

    let tableDataFilterList = ref([])
    let tableInput = ref('')

    watchEffect(() => {
        tableDataFilterList.value = toRaw(props.tableData)
    })


    let handleTableChange = (() => {
        if (tableInput.value == '') {
            tableDataFilterList.value = toRaw(props.tableData)
        } else {
            tableDataFilterList.value = toRaw(props.tableData).filter(item => item.gene.indexOf(tableInput.value) !== -1)
        }
    })

    // 路由跳转-->基因概述
    let goGeneDetail = (row) => {
        router.push({
            name: 'geneoverview',
            query: {
                geneName: row.gene
            }
        })
    }
</script>

<style scoped>
    .el-table-vertical-demo {
        @apply mt-6;
    }
</style>