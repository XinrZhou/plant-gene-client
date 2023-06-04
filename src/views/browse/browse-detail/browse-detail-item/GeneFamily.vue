<template>
  <PageCenterTitle page-title="Gene Family" />
  <el-card shadow="hover">
    <el-row class="row-bg" justify="space-around">
      <el-col :span="6">
        <p class="list-title">Transcription Factor</p>
        <el-scrollbar height="490px">
          <el-row class="row-bg" justify="space-between">
            <el-col :span="12" v-for="item in tFGeneFamilyList" :id="item.gene" class="gene-list">
              <el-link class="list-content" type="info" @click="goMYB(item.gene,'TF')" >{{item.gene}}</el-link>
            </el-col>
          </el-row>
        </el-scrollbar>
      </el-col>
<!--      <el-divider direction="vertical"></el-divider>-->
      <el-col :span="7">
        <p class="list-title">Non-transcription Factor</p>
        <el-scrollbar height="490px">
          <el-row class="row-bg" justify="space-between">
            <el-col :span="24" v-for="item in nonTFGeneFamilyList" :id="item.gene" class="gene-list">
              <el-link class="list-content" type="info" @click="goMYB(item.gene,'NTF')">{{item.gene}}</el-link>
            </el-col>
          </el-row>
        </el-scrollbar>
      </el-col>
      <el-col :span="11">
        <el-card class="charts-card" shadow="hover">
          <div id="1" ref="el" style="height:500px;"></div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>

  <el-card>
    <el-row>
      <el-col :span="24">
        <el-scrollbar height="330px" class="scrollbar-demo-item" v-if="geneType === 'TF'">
          <p v-for="item in tFGeneList" :key="item.gene">
            <span class="menu-item">
                {{item.gene}}
            </span>
          </p>
        </el-scrollbar>
        <el-scrollbar height="330px" class="scrollbar-demo-item" v-if="geneType === 'NTF'">
          <p v-for="item in nonTFGeneList" :key="item.gene">
            <span class="menu-item">
                {{item.gene}}
            </span>
          </p>
        </el-scrollbar>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
  import PageCenterTitle from "~/components/PageCenterTitle.vue"
  import { useBrowseStore } from '~/store/useBrowseStore.js'
  import {computed, ref, toRaw, watch} from 'vue'
  import router from "~/router"

  const store = useBrowseStore()

  store.getTFGeneFamilyList()
  store.getNonTFGeneFamilyList()
  let geneType = ''

  const tFGeneFamilyList = computed(() => store.tFGeneFamilyDataList)
  const nonTFGeneFamilyList = computed(() => store.nonTFGeneFamilyDataList)

  const tFGeneList = computed(() => store.tFGeneDataList)
  const nonTFGeneList = computed(() => store.nonTFGeneDataList)
  watch(() => store.tFGeneDataList, () => {
    tFGeneList.value = store.tFGeneDataList
  })

  watch(() => store.nonTFGeneDataList, () => {
    nonTFGeneList.value = store.nonTFGeneDataList
  })
  let goMYB = (name, type) => {
    type == 'TF' ? store.getTFGeneList(name) : store.getNonTFGeneList(name)
    geneType = type
    console.log(tFGeneList.value)
    console.log(geneType)
  }

</script>

<style scoped>
  /* PC端 */
  @media screen and (min-width: 992px) {
    .el-card {
      max-width: 70%;
      margin: 0 auto;
    }
  }

  /* 手机端 */
  @media screen and (max-width: 993px) {
    .el-card {
      max-width: 100%;
    }
  }

  .list-title {
    @apply text-xl font-semibold mt-4 my-3;
  }

  .list-content {
    @apply font-normal text-gray-900 text-opacity-75 leading-relaxed;
  }
  .gene-list{
    @apply font-bold text-2xl text-blue-500;
  }
</style>