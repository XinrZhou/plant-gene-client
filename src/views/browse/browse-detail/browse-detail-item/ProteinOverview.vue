<template>
  <el-row class="page-desciption">
    <el-col :xs="24" :sm="24" :md="24" :lg="13" :xl="13" class="page-info page-title">
      <el-icon>
        <Histogram/>
      </el-icon>
      Sample Protein overview
    </el-col>
  </el-row>

  <el-card shadow="hover">
    <div class="card-nav">
      <h1><a  class="underline font-semibold text-base alink"  @click.prevent="handleGeneClick(proteinInfo.proteinId)">{{ proteinInfo.proteinId }}</a></h1>
      <h2 v-if="proteinInfo.plant!=null"> Species :  <h3>{{proteinInfo.plant}}</h3></h2>
    </div>
    <div class="bottom-collapse ml-10">
      <el-collapse @change="handleChange" accordion>
        <el-collapse-item title="Click here to view the Amino Acid sequence" name="1">
          <pre class="alignments-sequence font-bold ml-14 text-sm">{{ proteinInfo.description }}</pre>
          <pre class="alignments-sequence font-bold ml-14 text-sm">{{processedDescription}}</pre>

        </el-collapse-item>

      </el-collapse>
    </div>

    <div class="card-nav" v-if="geneGoInfo.length != 0">
      <h2>GO annotations</h2>
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

  <el-card shadow="hover" v-if="proteinInfo.uniprotId!=null">
    <div class="card-nav" >
      <h1>3D Protein View of  ({{ proteinInfo.proteinId }})</h1>
      <protvista-uniprot :accession="proteinInfo.uniprotId" :key="proteinInfo.uniprotId"></protvista-uniprot>
      <span class="text-gray-400 mr-auto text-sm"> --Api from Uniprot </span>
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
const proteinInfo = computed(() => store.proteinOverviewData)
const geneKeGGInfo = computed(() => store.geneKeGGList)
const geneGoInfo = computed(() => store.geneGoList)
const goBiological = computed(() => geneGoInfo.value.filter(item => item.ontology == 'biological_process'))
const goMolecular = computed(() => geneGoInfo.value.filter(item => item.ontology == 'molecular_function'))
const goCellur = computed(() => geneGoInfo.value.filter(item => item.ontology == 'cellur_component'))

const insertLineBreaks = (str, every) => {
  if (!str) return ''; // 安全检查
  let result = '';
  for (let i = 0; i < str.length; i++) {
    result += str[i];
    if ((i + 1) % every === 0 && i !== str.length - 1) {
      result += '\n';
    }
  }
  return result;
};

const link = ref('')
const processedDescription = computed(() => insertLineBreaks(proteinInfo.value.proteinSequence, 80));
const proteinId = route.query.proteinId
store.getProteinOverviewData(proteinId)
store.getProteinByKeGGData(proteinId)
store.getProteinByGoData(proteinId)
// API调用
let handleGeneClick = (row) => {
  const link = document.createElement('a');
  link.href = "https://www.ncbi.nlm.nih.gov/protein/" + row
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
