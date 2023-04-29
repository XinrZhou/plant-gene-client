<template>
  <PageCenterTitle page-title="Expression Organs / Location" />
  <el-row :gutter="40" justify="space-between">
    <el-col :span="menuCol" style="height: 550px;" :class="menuClass">
      <el-input :prefix-icon="Search" v-model="navInput" @input="handleNavChange" clearable />
      <el-scrollbar max-height="550px" class="scrollbar-demo-item">
        <p :index="index+''" v-for="(item,index) in expOrgansFilterList" :key="index"
          @click="handleMenuClick(item.name)">
          <span class="menu-item">
            {{item.name}}
            <el-tag class="ml-2" type="success" style="vertical-align: -1%;">
              {{item.value}}
            </el-tag>
          </span>
        </p>
      </el-scrollbar>
    </el-col>

    <el-col :span="tableCol" class="animate__animated animate__backInUp">
      <GeneListTable :tableData="expOrgansGeneList" />
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
  import {useRoute} from "vue-router";
  const route = useRoute()
  const store = useBrowseStore()
  store.getExpressionListData()

  const expOrgansList = computed(() => store.expOrgansDataList)
  let expOrgansFilterList = ref([])
  const expOrgansGeneList = computed(() => store.expOrgansGeneDataList)

  let menuCol = ref(24)
  let tableCol = ref(0)
  let menuClass = ref('')
  let navInput = ref('')

  if(route.query.expressionOrgans!=null) {
    menuCol.value = 12
    tableCol.value = 12
    store.getExpressionGeneListData(route.query.expressionOrgans)
  }

  watch(() => store.expOrgansDataList, () => {
    expOrgansFilterList.value = toRaw(expOrgansList.value)
  })

  let handleMenuClick = (name) => {
    menuClass.value = 'animate__animated animate__backInLeft'
    menuCol.value = 12
    tableCol.value = 12
    store.getExpressionGeneListData(name)
  }

  let handleNavChange = (() => {
    if (navInput.value == '') {
      expOrgansFilterList.value = toRaw(expOrgansList.value)
    } else {
      expOrgansFilterList.value = toRaw(expOrgansList.value).filter(item => item.name.indexOf(navInput.value) !== -1)
    }
  })

  // 路由跳转-->基因概述
  let goGeneDetail = (row) => {
    router.push({
      name: 'geneoverview',
      query: {
        geneName: row.gene
      }
    })
  }

</script>

<style scoped>
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