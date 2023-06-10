<template>
  <PageCenterTitle page-title="Phenotype Influenced" class="page-title"/>
  <el-row  justify="center" class="page-title">
    <el-col :span="menuCol" :class="menuClass">
      <LeftMenu :attribute-list="phenoList" @openMenu="handleOpen" @clickList="handleClick" :isLoading="loading"
                :attr-detail-list="phenoSubList" :openMenuName="menuName"/>
    </el-col>
    <el-col :span="tableCol" class="animate__animated animate__backInDown ml-4">
      <el-input :prefix-icon="Search" v-model="tableInput" @input="handleTableFilter" clearable/>
      <el-table :data="tableInput==''?phenoGeneList:phenoGeneFilterList" class="el-table-vertical-demo" height="550px"
                stripe>
        <el-table-column prop="gene" label="gene name">
          <template v-slot="{ row }">
            <a href="" @click.prevent="goGeneDetail(row)" class="underline">{{ row.gene }}</a>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>

</template>

<script setup>
import PageCenterTitle from "~/components/PageCenterTitle.vue"
import LeftMenu from '~/components/LeftMenu.vue'
import {Search} from '@element-plus/icons-vue'
import {useBrowseStore} from '~/store/useBrowseStore.js'
import {computed, ref, toRaw} from 'vue'
import router from "~/router"
import {useRoute} from "vue-router"

const store = useBrowseStore()
store.getPhenoTypeListData()

const route = useRoute()


let phenoList = computed(() => store.phenoTypeDataList)
let phenoSubList = computed(() => store.phenoTypeSubDataList)
let phenoGeneList = computed(() => store.phenoTypeGeneDataList)
let phenoGeneFilterList = ref([])
let tableInput = ref('')
let loading = computed(() => store.isLoading)
let menuName = ref(route.query.group)

let tableCol = ref(0)
let menuCol = ref(24)
let menuClass = ref('')

let handleOpen = (value) => {
  store.getPhenoTypeSubListData(value)
}

if (route.query.group != null) {
  console.log(route.query.group)
  store.getPhenoTypeSubListData(route.query.group)
}

if (route.query.group != null && route.query.pheno != null) {
  menuClass.value = 'animate__animated animate__backInUp'
  tableCol.value = 11
  menuCol.value = 11
  store.getPhenoGeneListData(route.query.pheno, route.query.group)
}
let handleClick = (attrName, attrItem2) => {
  menuClass.value = 'animate__animated animate__backInUp'
  tableCol.value = 11
  menuCol.value = 11
  store.getPhenoGeneListData(toRaw(attrItem2).name, attrName)
}


let handleTableFilter = () => {
  if (tableInput.value) {
    phenoGeneFilterList.value = toRaw(phenoGeneList.value).filter(item => item.gene.indexOf(tableInput.value) !== -1)
  } else {
    phenoGeneFilterList.value = toRaw(phenoGeneList.value)
  }
}

// 路由跳转-->基因概述
let goGeneDetail = (row) => {
  router.push({
    path: 'stresstype/geneoverview',
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

#jsmind_container {
  width: 100%;
  height: 150vh;
}

::v-deep .el-row {
  background-color: white;
}

.el-table-vertical-demo {
  @apply mt-5;
}
</style>