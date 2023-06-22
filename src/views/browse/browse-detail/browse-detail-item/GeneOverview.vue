<template>
    <el-row class="page-desciption">
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
            <h2>PMID:<h3><a  class="underline font-semibold text-base alink"  @click.prevent="handleGeneClick(geneInfo.pmid)">{{ geneInfo.pmid }}</a></h3></h2>
            <h2 v-if="geneInfo.goAnalysis!=null"> GeneID :  <h3>{{geneInfo.goAnalysis}}</h3></h2>
        </div>
        <!-- 基因卡片表格 -->
        <div class="description-list">
            <el-descriptions border :column="2">
                <el-descriptions-item label="Species" label-align="center" align="center">
                  {{ geneInfo.scientificName }}
                </el-descriptions-item>
                <el-descriptions-item label="Gene Family" label-align="center" align="center">
                  {{ geneInfo.kringleDomain }}
                </el-descriptions-item>
                <el-descriptions-item label="Expression Organs/ Location" label-align="center" align="center">
                  {{ geneInfo.expressionOrgans }}
                </el-descriptions-item>
                <el-descriptions-item label="Subcellular Localization" label-align="center" align="center">
                  {{ geneInfo.subCellularLocalization }}
                </el-descriptions-item>

                <el-descriptions-item label="Stress Type" label-align="center" align="center">
                  {{ geneInfo.stressType }}
                </el-descriptions-item>
<!--                <el-descriptions-item label="Transcription Factor" label-align="right" align="center">-->
<!--                    {{ geneInfo.transcriptionFactor }}-->
<!--                </el-descriptions-item>-->
                <el-descriptions-item label="Gene Product" label-align="center" align="center">
                    {{ geneInfo.geneProduct }}
                </el-descriptions-item>
            </el-descriptions>

        </div>
      <div class="card-nav1">
        <h2>Gene mechanism:</h2>
        <h3 class="indent-10 text-justify">{{ geneInfo.description }}</h3>
        <h2>Phenotype Influenced:</h2>
        <el-row>
            <template v-for="(item, index) in phenoGroup" :key="index">
              <el-col :xs="10" :sm="10" :md="10" :lg="8" :xl="10">
                <h3> {{ item.phenotype }}</h3>
              </el-col>
              <el-col :xs="14" :sm="14" :md="14" :lg="16" :xl="14">
                  <h5 class="ml-4">
                    <el-button size="small">Phenotype Group:</el-button> {{item.phenotypeGroup}}
                  </h5>
              </el-col>

            </template>

        </el-row>

      </div>
        <div class="bottom-collapse ml-10">
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
            <h2>Go annotation</h2>
            <el-row justify="start" v-if="goBiological.length != 0" class="ml-10">
                <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                    <h3>biological_process:</h3>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
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
            <el-row justify="start" v-if="goMolecular.length != 0" class="ml-10">
                <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                    <h3>molecular_function:</h3>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
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
            <el-row justify="start" v-if="goCellur.length != 0" class="ml-10">
                <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                    <h3>cellur_component:</h3>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
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
            <h2>KEGG</h2>
            <el-table :data="geneKeGGInfo" height="250" style="width: 100%" class="ml-10">
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

    </el-card>

    <el-card shadow="hover" v-if="geneInfo.keggAnalysis!=null">
      <div class="card-nav" >
        <h1>3D Protein View of  ({{ geneInfo.gene }})</h1>
        <protvista-uniprot :accession="geneInfo.keggAnalysis" :key="geneInfo.keggAnalysis"></protvista-uniprot>
      </div>
    </el-card>

</template>

<script setup>
import {useRoute} from 'vue-router'
import {Histogram} from '@element-plus/icons-vue'
import {useBrowseStore} from '~/store/useBrowseStore.js'
import {computed, reactive, ref, toRaw, toRefs, watch} from 'vue'
// import '@nightingale-elements/nightingale-structure/dist/index.js'
import 'protvista-uniprot/dist/protvista-uniprot.js'




const route = useRoute()
const store = useBrowseStore()
const geneInfo = computed(() => store.geneOverviewDataList)
const phenoGroup = computed(() => store.group)
const geneKeGGInfo = computed(() => store.geneKeGGList)
const geneGoInfo = computed(() => store.geneGoList)
const goBiological = computed(() => geneGoInfo.value.filter(item => item.ontology == 'biological_process'))
const goMolecular = computed(() => geneGoInfo.value.filter(item => item.ontology == 'molecular_function'))
const goCellur = computed(() => geneGoInfo.value.filter(item => item.ontology == 'cellur_component'))

const link = ref('')
const geneName = route.query.geneName
store.getGeneOverviewData(geneName)
store.getGeneByKeGGData(geneName)
store.getGeneByGoData(geneName)
// API调用
let handleGeneClick = (item) => {
  const link = document.createElement('a');
  link.href = "https://pubmed.ncbi.nlm.nih.gov/"+item
  link.click();
  link.preventDefault();
}
</script>

<style scoped>
@media screen and (min-width: 992px) {
    .el-card {
        max-width: 70%;
        margin: 0 auto;
        margin-bottom: 30px;
    }

    .page-desciption {
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
.alink{
  cursor:pointer;
}

.page-info {
    @apply flex items-center font-bold pt-6 pb-6 text-4xl my-6;
}

.card-nav p {
    @apply flex items-center font-normal py-1 text-base ml-11 tracking-wide;
}

.el-button {
    @apply ml-3 bg-slate-100;
}

.card-nav span {
    @apply font-normal py-2 pb-2 text-base mx-11 tracking-wide;
}

.card-nav h1 {
    @apply flex items-center font-semibold py-4 text-3xl ml-11;
}

.card-nav h2 {
  @apply flex items-center font-semibold py-4 text-xl ml-11;
}

.card-nav h3 {
    @apply flex items-center font-semibold py-1 text-base ml-6;
}
.card-nav1 h1 {
  @apply flex items-center font-semibold py-5 text-2xl ml-11 mr-4;
}
.card-nav1 h2 {
  @apply flex items-center font-semibold py-5 text-xl ml-11 mr-4;
}
.card-nav1 h3 {
  @apply flex items-center font-semibold py-1 text-base ml-20;
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