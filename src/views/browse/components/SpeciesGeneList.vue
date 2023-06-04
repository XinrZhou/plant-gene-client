<template>
    <el-input :prefix-icon="Search" v-model="tableInput" @input="handleTableChange" clearable />
    <el-table :data="geneFilterList" class="el-table-vertical-demo" max-height="550px">
        <el-table-column prop="gene" label="gene name">
            <template v-slot="{ row }">
                <a href="" @click.prevent="goGeneDetail(row)" class="underline">{{row.gene}}</a>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
    import { useBrowseStore } from '~/store/useBrowseStore.js'
    import { ref, computed, toRaw, watchEffect, watch } from 'vue'
    import { Search } from '@element-plus/icons-vue'
    import router from "~/router"

    const props = defineProps(['name'])

    const store = useBrowseStore()
    store.getSpeciesListData()

    const geneList = computed(() => store.geneDataList)
    let geneFilterList = ref([])
    let tableInput = ref('')

    watch(() => store.geneDataList, () => {
        geneFilterList.value = toRaw(geneList.value)
    })

    watchEffect(() => {
        store.getGeneListDataBySciName(props.name)
    })

    let handleTableChange = (() => {
        if (tableInput.value == '') {
            geneFilterList.value = toRaw(geneList.value)
        } else {
            geneFilterList.value = toRaw(geneList.value).filter(item => item.gene.indexOf(tableInput.value) !== -1)
        }
    })

    // 路由跳转-->基因概述
    let goGeneDetail = (row) => {
        router.push({
            name: 'geneoverview',
            query: {
                geneName: row.id
            }
        })
    }
</script>

<style scoped>
    .el-table-vertical-demo {
        @apply mt-6;
    }
</style>