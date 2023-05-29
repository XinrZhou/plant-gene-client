<template>
    <el-row>
        <el-col :span="12" class="page-info">
            <el-icon>
                <Histogram />
            </el-icon>Sample overview
        </el-col>
    </el-row>

    <el-card shadow="hover">
        <div class="card-nav">
            <h1>{{geneName}}</h1>
            <p>GenBank:</p>
            <p>GenBank Locus:</p>
            <p>pmid:{{geneInfo.pmid}}</p>
        </div>
        <!-- 基因卡片表格 -->
        <div class="description-list">
            <el-descriptions border :column="4">
                <el-descriptions-item label="Gene name" label-align="right" align="center" label-class-name="my-label"
                    class-name="my-content" width="150px">
                    {{geneInfo.gene}}
                </el-descriptions-item>
                <el-descriptions-item label="TF" label-align="right" align="center">
                    {{geneInfo.transcriptionFactor}}
                </el-descriptions-item>
                <el-descriptions-item label="Gene product" label-align="right" align="center" :span="2">
                    {{geneInfo.geneProduct}}
                </el-descriptions-item>
                <el-descriptions-item label="Phenotype Influenced" label-align="right" align="center" :span="2">
                    {{geneInfo.phenotypeInfluenced}}
                </el-descriptions-item>
                <el-descriptions-item label="Subcellular Localization" label-align="right" align="center">
                    {{geneInfo.subCellularLocalization}}
                </el-descriptions-item>
                <el-descriptions-item label="Expression Organs/ Location" label-align="right" align="center" :span="2">
                    {{geneInfo.expressionOrgans}}
                </el-descriptions-item>
                <el-descriptions-item label="Description" label-align="right" align="center">
                    {{geneInfo.description}}
                </el-descriptions-item>
            </el-descriptions>
        </div>

        <div class="bottom-collapse">
            <el-collapse @change="handleChange" accordion>
                <el-collapse-item title="Click here to view the DNA sequence" name="1">
                  {{geneInfo.aminoAcidSequence}}
                </el-collapse-item>
                <el-collapse-item title="Click here to view the Protein sequence" name="2">
                  {{geneInfo.nucleotideSequence}}
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
    import { computed } from 'vue'

    const route = useRoute()
    const store = useBrowseStore()
    const geneInfo = computed(() => store.geneOverviewDataList)

    const geneKeGGInfo = computed(() => store.geneKeGGList)
    const geneGoInfo = computed(() => store.geneGoList)

    const geneName = route.query.geneName
    store.getGeneOverviewData(geneName)
    store.getGeneByKeGGData(geneName)
    store.getGeneByGoData(geneName)
    // API调用
    let handleChange = (event) => {
        console.log(event)
    }

</script>

<style scoped>
    @media screen and (min-width: 992px) {
        .el-card {
            max-width: 70%;
            margin: 0 auto;
        }
        .el-row {
            max-width: 70%;
            margin: 0 auto;
        }
    }

    /* 手机端 */
    @media screen and (max-width: 993px) {
        .el-card {
            max-width: 100%;
        }
        .el-row {
            max-width: 70%;
            margin: 0 auto;
        }
    }

    .page-info {
        @apply flex items-center font-bold pt-5 pb-3 text-4xl my-5 mx-3
    }

    .card-nav p {
        @apply flex items-center font-normal py-2 pb-3 text-base mx-11 tracking-wide
    }

    .card-nav h1 {
        @apply flex items-center font-semibold py-5 text-2xl mx-11
    }

    .description-list {
        @apply flex-auto justify-self-center mx-4 my-6
    }

    .bottom-collapse {
        @apply mx-4 my-6
    }
</style>