<template>
  <PageCenterTitle page-title="Subcellular Localization" class="page-title"/>
  <el-row :gutter="40" justify="space-between">
    <el-col :span="menuCol" style="height: 550px;" :class="menuClass">
      <el-input :prefix-icon="Search" v-model="navInput" @input="handleNavChange" clearable />
      <el-scrollbar max-height="550px" class="scrollbar-demo-item">
        <p :index="index+''" v-for="(item,index) in subcellularFilterList" :key="index"
          @click="handleMenuClick(item.name)">
          <span class="menu-item">
            <el-link>{{item.name}}</el-link>
            <el-tag class="ml-2" type="success" style="vertical-align: -1%;">
              {{item.value}}
            </el-tag>
          </span>
        </p>
      </el-scrollbar>
    </el-col>

    <el-col :span="tableCol" class="animate__animated animate__backInUp">
      <GeneListTable :tableData="subcellularGeneList" />
    </el-col>
  </el-row>
</template>

<script setup>
  import PageCenterTitle from "~/components/PageCenterTitle.vue"
  import LeftMenu from '~/components/LeftMenu.vue'
  import GeneListTable from '~/views/browse/components/GeneListTable.vue'
  import { Search } from '@element-plus/icons-vue'
  import { useBrowseStore } from '~/store/useBrowseStore.js'
  import { ref, computed, toRaw, watch } from 'vue'
  import router from "~/router"
  import { useRoute } from "vue-router";

  const route = useRoute()
  const store = useBrowseStore()
  store.getSubcellularListData()

  const subcellularList = computed(() => store.subcellularDataList)
  let subcellularFilterList = ref([])
  const subcellularGeneList = computed(() => store.subcellularGeneDataList)
  let menuCol = ref(24)
  let tableCol = ref(0)
  let menuClass = ref('')
  let navInput = ref('')
  if (route.query.subCellular != null) {
    menuClass.value = 'animate__animated animate__backInLeft'
    menuCol.value = 11
    tableCol.value = 11

    store.getSubcellularGeneListData(route.query.subCellular)
  }

  watch(() => store.subcellularDataList, () => {
    subcellularFilterList.value = toRaw(subcellularList.value)
  })

  let handleMenuClick = (name) => {
    menuClass.value = 'animate__animated animate__backInLeft'
    menuCol.value = 11
    tableCol.value = 11
    store.getSubcellularGeneListData(name)
  }

  let handleNavChange = (() => {
    if (navInput.value == '') {
      subcellularFilterList.value = toRaw(subcellularList.value)
    } else {
      subcellularFilterList.value = toRaw(subcellularList.value).filter(item => item.name.indexOf(navInput.value) !== -1)
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
  @media screen and (min-width: 992px) {
    .page-title {
      max-width: 70%;
      margin: 0 auto;
    }
    .el-row{
      position: absolute;
      left: 15%;
      right: 15%;
    }
  }

  /* 手机端 */
  @media screen and (max-width: 993px) {
    .page-title {
      max-width: 100%;
    }
    .el-row {
      max-width: 100%;
    }
  }
  .scrollbar-demo-item {
    @apply mt-6 bg-white;
  }

  .scrollbar-demo-item p {
    @apply m-2 h-10;
  }

  .el-tag {
    @apply float-right;
  }

  .loading {
    @apply absolute top-1/2 right-1/4
  }

  p {
    padding-left: 10px;
  }
</style>