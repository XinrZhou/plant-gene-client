<template>
    <el-row>
        <el-col :span="12" class="page-info">
            <el-icon>
                <Histogram />
            </el-icon>Sample overview
        </el-col>
    </el-row>
    <el-card>
        <h1 class="text-4xl">{{geneName}}</h1>
        <p>GenBank:</p>
        <p>GenBank Locus:</p>
        <p>pmid:{{pmid}}</p>
        <div class="description-list">
            <el-descriptions border :column="4">
                <el-descriptions-item label="Gene name" label-align="right" align="center" label-class-name="my-label"
                    class-name="my-content" width="150px">
                    {{geneOverviewDataList.gene}}
                </el-descriptions-item>
                <el-descriptions-item label="TF" label-align="right" align="center">
                    {{geneOverviewDataList.transcriptionFactor}}
                </el-descriptions-item>
                <el-descriptions-item label="Gene product" label-align="right" align="center" :span="2">
                    {{geneOverviewDataList.geneProduct}}
                </el-descriptions-item>
                <el-descriptions-item label="Phenotype Influenced" label-align="right" align="center" :span="2">
                    {{geneOverviewDataList.phenotypeInfluenced}}
                </el-descriptions-item>
                <el-descriptions-item label="Subcellular Localization" label-align="right" align="center">
                    {{geneOverviewDataList.subCellularLocalization}}
                </el-descriptions-item>
                <el-descriptions-item label="Expression Organs/ Location" label-align="right" align="center" :span="2">
                    {{geneOverviewDataList.expressionOrgans}}
                </el-descriptions-item>
                <el-descriptions-item label="Description" label-align="right" align="center">
                    {{geneOverviewDataList.description}}
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div>
            <el-collapse @change="handleChange" accordion>
                <el-collapse-item title="Click here to view the DNA sequence" name="1">
                </el-collapse-item>
                <el-collapse-item title="Click here to view the Protein sequence" name="2">
                </el-collapse-item>
              </el-collapse>
        </div>
    </el-card>

</template>

<script setup>
    import PageLeftTitle from '~/components/PageLeftTitle.vue'
    import { useRoute } from 'vue-router'
    import { Histogram } from '@element-plus/icons-vue'
    import { useBrowseStore } from '~/store/useBrowseStore.js'
    import { storeToRefs } from 'pinia'

    const route = useRoute()
    const store = useBrowseStore()

    const geneName = route.query.geneName
    const { geneOverviewDataList } = storeToRefs(store)
    store.getGeneOverviewData(geneName)

    // 调用API
    let handleChange = (event) => {
        console.log(event)
    }

</script>

<style scoped>
    .page-info {
        @apply flex items-center font-bold pt-5 pb-3 text-4xl my-5 mx-3
    }
    h1 {
        @apply flex items-center font-semibold py-5 pb-3 text-2xl mx-11
    }
    p {
        @apply flex items-center font-normal py-2 pb-3 text-base mx-11 tracking-wide
    }
    div {
        @apply mx-4 my-6
    }
    .description-list {
        @apply flex-auto justify-self-center 
    }
</style>