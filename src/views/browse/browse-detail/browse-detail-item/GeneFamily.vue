<template>
  <PageCenterTitle page-title="Gene Family" />
  <el-card shadow="hover">
    <el-row class="row-bg" justify="space-around">
      <el-col :span="5">
        <p class="list-title">Transcription Factor</p>
        <el-scrollbar height="490px">
          <el-row class="row-bg" justify="space-between">
            <el-col :span="12" v-for="item in tFGeneFamilyList" :id="item.gene" class="gene-list">
              <el-link class="list-content" type="info" @click="goMYB(item.gene,'TF')">{{item.gene}}</el-link>
            </el-col>
          </el-row>
        </el-scrollbar>
      </el-col>
      <!--      <el-divider direction="vertical"></el-divider>-->
      <el-col :span="6">
        <p class="list-title">Non-transcription Factor</p>
        <el-scrollbar height="490px">
          <el-row class="row-bg" justify="space-between">
            <el-col :span="24" v-for="item in nonTFGeneFamilyList" :id="item.gene" class="gene-list">
              <el-link class="list-content" type="info" @click="goMYB(item.gene,'NTF')">{{item.gene}}</el-link>
            </el-col>
          </el-row>
        </el-scrollbar>
      </el-col>
      <el-col :span="7">
        <el-card class="charts-card" shadow="hover">
          <div id="1" ref="el" style="height:350px;"></div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>

  <el-card v-if="isShowTFGeneR">
    <el-row>
      <el-col :span="24">
        <p class="list-title">Gene Name</p>
        <div>
          <el-link :label="item.id" v-for="item in tFGeneDataList" :id="item.id" class="gene-list">
            {{item.gene}}
          </el-link>
        </div>
      </el-col>
    </el-row>
  </el-card>

  <el-card v-if="isShowNonTFGeneR">
    <el-row>
      <el-col :span="24">
        <p class="list-title">Gene Name</p>
        <div>
          <el-link :label="item.id" v-for="item in nonTFGeneDataList" :id="item.id" class="gene-list">
            {{item.gene}}
          </el-link>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
  import PageCenterTitle from "~/components/PageCenterTitle.vue"
  import { useBrowseStore } from '~/store/useBrowseStore.js'
  import { computed, toRaw, watch, ref } from 'vue'
  import router from "~/router"

  const store = useBrowseStore()

  store.getTFGeneFamilyList()
  store.getNonTFGeneFamilyList()

  const tFGeneFamilyList = computed(() => store.tFGeneFamilyDataList)
  const nonTFGeneFamilyList = computed(() => store.nonTFGeneFamilyDataList)
  const tFGeneDataList = computed(() => store.tFGeneDataList)
  const nonTFGeneDataList = computed(() => store.nonTFGeneDataList)
  let isShowTFGeneR = ref(false)
  let isShowNonTFGeneR = ref(false)


  let goMYB = (name, type) => {
    if (type == 'TF') {
      store.getTFGeneList(name)
      isShowTFGeneR.value = true
      isShowNonTFGeneR.value = false
    } else {
      store.getNonTFGeneList(name)
      isShowTFGeneR.value = false
      isShowNonTFGeneR.value = true
    }
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

  .el-card {
    @apply mb-8;
  }

  .gene-list {
    @apply inline-block w-40;
  }

  .list-content {
    @apply font-normal text-gray-900 text-opacity-75 leading-relaxed;
  }
</style>