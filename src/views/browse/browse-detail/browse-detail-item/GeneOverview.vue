<template>
    <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="13" :xl="13" class="page-info page-title">
            <el-icon>
                <Histogram/>
            </el-icon>
            Sample overview
        </el-col>
    </el-row>

    <el-card shadow="hover">
        <div class="card-nav">
            <h1>{{ geneInfo.gene }}</h1>
            <p>GenBank:</p>
            <p>GenBank Locus:</p>
          <p>pmid:<a  :href=link  class="underline ml-4" >{{ geneInfo.pmid }}</a></p>
        </div>
        <!-- 基因卡片表格 -->
        <div class="description-list">
            <el-descriptions border :column="3">
                <el-descriptions-item label="Gene name" label-align="right" align="center" label-class-name="my-label"
                                      class-name="my-content" width="150px">
                    {{ geneInfo.gene }}
                </el-descriptions-item>
                <el-descriptions-item label="Gene Family" label-align="right" align="center" :span="2" v-if="geneInfo.kringleDomain!=null">
                  {{ geneInfo.kringleDomain }}
                </el-descriptions-item>
                <el-descriptions-item label="Scientific Name" label-align="right" align="center">
                  {{ geneInfo.scientificName }}
                </el-descriptions-item>
                <el-descriptions-item label="Stress Type" label-align="right" align="center" :span="2">
                  {{ geneInfo.stressType }}
                </el-descriptions-item>
                <el-descriptions-item label="Transcription Factor" label-align="right" align="center">
                    {{ geneInfo.transcriptionFactor }}
                </el-descriptions-item>
                <el-descriptions-item label="Gene product" label-align="right" align="center" :span="2">
                    {{ geneInfo.geneProduct }}
                </el-descriptions-item>
                <el-descriptions-item label="Phenotype Influenced" label-align="right" align="center" :span="2">
                    {{ geneInfo.phenotypeInfluenced }}
                </el-descriptions-item>
                <el-descriptions-item label="Subcellular Localization" label-align="right" align="center" v-if="geneInfo.subCellularLocalization!=null">
                    {{ geneInfo.subCellularLocalization }}
                </el-descriptions-item>
                <el-descriptions-item label="Expression Organs/ Location" label-align="right" align="center" :span="2" v-if="geneInfo.expressionOrgans!=null">
                    {{ geneInfo.expressionOrgans }}
                </el-descriptions-item>
                <el-descriptions-item label="Description" label-align="right" align="center">
                    {{ geneInfo.description }}
                </el-descriptions-item>
            </el-descriptions>
        </div>

        <div class="bottom-collapse">
            <el-collapse @change="handleChange" accordion>
                <el-collapse-item title="Click here to view the Amino Acid sequence" name="1">
                  <pre class="alignments-sequence font-bold ml-14 text-sm">{{ geneInfo.aminoAcidSequence }}</pre>

                </el-collapse-item>
                <el-collapse-item title="Click here to view the Nucleotide sequence" name="2">
                  <pre class="alignments-sequence font-bold ml-14 text-sm">{{ geneInfo.nucleotideSequence }}</pre>

                </el-collapse-item>
            </el-collapse>
        </div>

        <div class="card-nav" v-if="geneGoInfo.length != 0">
            <h1>Go</h1>
            <el-row justify="start" v-if="goBiological.length != 0">
                <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <h3>biological_process:</h3>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
                    <template v-for="(item, index) in goBiological" :key="index">
                        <p>
                            {{ item?.name }}
                            <el-button size="small">
                                <a :href=item.goId target="_blank">Source: Gene Ontology</a>
                            </el-button>
                        </p>
                    </template>
                </el-col>
            </el-row>
            <el-row justify="start" v-if="goMolecular.length != 0">
                <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <h3>molecular_function:</h3>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
                    <template v-for="(item, index) in goMolecular" :key="index">
                        <p>
                            {{ item?.name }}
                            <el-button size="small">
                                <a :href=item.goId target="_blank">Source: Gene Ontology</a>
                            </el-button>
                        </p>
                    </template>
                </el-col>
            </el-row>
            <el-row justify="start" v-if="goCellur.length != 0">
                <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <h3>cellur_component:</h3>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
                    <template v-for="(item, index) in goCellur" :key="index">
                        <p>
                            {{ item?.name }}
                            <el-button size="small">
                                <a :href=item.goId target="_blank">Source: Gene Ontology</a>
                            </el-button>
                        </p>
                    </template>
                </el-col>
            </el-row>
        </div>
        <div class="card-nav" v-if="geneKeGGInfo.length != 0">
            <h1>KeGG</h1>
            <el-table :data="geneKeGGInfo" height="250" style="width: 100%">
                <el-table-column prop="description" label="Description" width="300"/>
                <el-table-column prop="koNumber" label="KoNumber" width="200"/>
                <el-table-column fixed="right" label="Link" width="200">
                    <template #default="scope">
                        <el-button size="small">
                            <a :href=scope.row.mapId target="_blank">MapId</a>
                        </el-button>
                        <el-button size="small">
                            <a :href=scope.row.imgMap target="_blank">ImgMap</a>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="card-nav"  v-if="geneInfo.keggAnalysis!=null">
            <h1>3D Protein View of {{ geneInfo.gene }}</h1>
            <!--            <h2>{{ seqMd5 }}</h2>-->
            <!--            <h2>PID: {{ pid }} SID: {{ sid }}</h2>-->
            <el-row justify="start">
                <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                    <h3>Protein Accession ID:</h3>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
                    <p>
                        {{ pid }}
                    </p>
                </el-col>
            </el-row>
            <protvista-uniprot :accession="geneInfo.keggAnalysis" :key="geneInfo.keggAnalysis"></protvista-uniprot>
        </div>
    </el-card>

</template>

<script setup>
import {useRoute} from 'vue-router'
import {Histogram} from '@element-plus/icons-vue'
import {useBrowseStore} from '~/store/useBrowseStore.js'
import {computed, reactive, toRefs} from 'vue'
import '@nightingale-elements/nightingale-structure/dist/index.js'
import {reqGetGeneOverview} from "~/api/browse.js";
import md5 from 'md5'
// import ProtvistaUniprot from 'protvista-uniprot';
import 'protvista-uniprot/dist/protvista-uniprot.js'

// window.customElements.define('protvista-uniprot', ProtvistaUniprot);

const route = useRoute()
const store = useBrowseStore()
const geneInfo = computed(() => store.geneOverviewDataList)

const geneKeGGInfo = computed(() => store.geneKeGGList)
const geneGoInfo = computed(() => store.geneGoList)
const goBiological = computed(() => geneGoInfo.value.filter(item => item.ontology == 'biological_process'))
const goMolecular = computed(() => geneGoInfo.value.filter(item => item.ontology == 'molecular_function'))
const goCellur = computed(() => geneGoInfo.value.filter(item => item.ontology == 'cellur_component'))

const geneName = route.query.geneName
store.getGeneOverviewData(geneName)
store.getGeneByKeGGData(geneName)
store.getGeneByGoData(geneName)
// API调用


const link = "https://pubmed.ncbi.nlm.nih.gov/"+geneInfo.value.pmid
</script>

<style scoped>
@media screen and (min-width: 992px) {
    .el-card {
        max-width: 70%;
        margin: 0 auto;
        margin-bottom: 30px;
    }

    .el-row {
        max-width: 70%;
    }

    .page-title {
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

    .page-title {
        max-width: 100%;
    }
}

.page-info {
    @apply flex items-center font-bold pt-6 pb-6 text-4xl my-6;
}

.card-nav p {
    @apply flex items-center font-normal py-1 text-sm mx-11 tracking-wide;
}

.el-button {
    @apply ml-3 bg-slate-100;
}

.card-nav span {
    @apply font-normal py-2 pb-3 text-base mx-11 tracking-wide;
}

.card-nav h1 {
    @apply flex items-center font-semibold py-5 text-2xl mx-11;
}

.card-nav h3 {
    @apply flex items-center font-semibold py-1 text-base mx-11;
}

.description-list {
    @apply flex-auto justify-self-center mx-4 my-6;
}

.bottom-collapse {
    @apply mx-4 my-6;
}

.el-table {
    @apply mx-11;
}
</style>