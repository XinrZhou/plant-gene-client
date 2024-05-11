<template>
  <Title :page-title="pageTitle"/>
  <div class="container">
    <!-- 搜索框 -->
    <el-row>
      <el-input v-model="searchContent" class="w-50  mb-4 " size="large" placeholder="Search"
                :suffix-icon="Search" @input="change"/>
    </el-row>

    <!-- 基因列表 -->
    <el-row>
      <!-- table -->
      <el-table :data="predictResulList" style="width: 100%" height="80vh" stripe>
        <el-table-column fixed prop="proteinId" label="ProteinId" fit/>
        <el-table-column prop="plant" label="Species" type="plant" fit/>
        <el-table-column prop="stressType" label="StressType" type="stressType" fit/>
        <el-table-column prop="proteinSequence" label="Sequence" type="proteinSequence" fit>
          <template v-slot="{ row }">
            <div class="text-overflow">{{ row.proteinSequence.substring(0,50) }}...</div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="Details" width="100">
          <template v-slot="{ row }">
            <el-button type="text" size="small" @click="goProteinDetail(row)">Details</el-button>
          </template>
        </el-table-column>

      </el-table>
      <!-- pagination -->
      <div style="margin-top: 16px;width: 100%;">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                       layout="prev, pager, next, jumper" :total="pageTotal" @current-change="handleCurrentChange"/>
      </div>
    </el-row>
  </div>
</template>

<script setup>
  import Title from '~/components/PageCenterTitle.vue'
  import {ref, reactive, computed} from 'vue'
  import {useBrowseStore} from '~/store/useBrowseStore.js'
  import router from "~/router"
  import {useRoute} from 'vue-router'
  import {Search} from '@element-plus/icons-vue'

  const store = useBrowseStore()
  const route = useRoute()

  const pageTitle = "List of Putative Genes"

  // 搜索框内容
  const searchContent = ref('')

  // 基因列表
  const predictResulList = computed(() => store.predictResulList)
  const pageTotal = computed(() => store.itemPageTotal)
  const currentPage = ref(1)
  const pageSize = ref(10)

  //  获取基因列表
  let getStressTypeItemData = () => store.listPredictResultBySearch({
    pageNum: currentPage.value,
    pageSize: pageSize.value,
    searchContent: searchContent.value,
    stressName: ""
  })

  getStressTypeItemData()
  // 搜索框内容值改变时触发
  let change = () => {
    getStressTypeItemData()
  }

  // currentPage改变时触发，重新获取table数据
  const handleCurrentChange = () => {
    getStressTypeItemData()

  }

  // 路由跳转-->基因概述
  let goGeneDetail = (row) => {
    const link = document.createElement('a');
    link.href = "https://www.ncbi.nlm.nih.gov/nucleotide/" + row.proteinId
    link.click();
    link.preventDefault();
  }
  let goProteinDetail = (row) => {
    router.push({
      name: 'proteinoverview',
      query: {
        proteinId: row.proteinId
      }
    })
  }


</script>

<style scoped>
@media screen and (min-width: 992px) {
  .container {
    max-width: 70%;
    margin: 0 auto;
  }
}

/* 手机端 */
@media screen and (max-width: 993px) {
  .container {
    max-width: 100%;
  }
}

.el-pagination {
  margin-top: 10px;
  justify-content: center;
}

.table-content {
  word-break: keep-all;
  text-align: justify
}
</style>
