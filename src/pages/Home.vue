<template>
  <el-row>
    <el-col :span="24"><div class="welecome"><span>Welecome to PASRGdb!</span></div></el-col>
  </el-row>
  <el-row class="flex justify-center">
    <el-col :lg="12" :md="20" :sm="20" >
       <span class="bodyleft"> PASRGdb (Plant abiotic stress resistance genes database)
              is an open space for updating plant abiotic stress resistance
              genes, including drought resistance, salt resistance, and UV
              resistance. The database enables search function by stress
              type, plant species, affected phenotype, gene sequence,
              pathway, etc. It also provides blast plug-in to search
              homologous nucleic acid or amino acid sequences in local
              database. More resistance genes are predicted based on
              machine learning to extract resistance gene features, and
              the database stores, manages and discusses all available
              information of these genes. The aim of our work is to create
              a database for the study of abiotic stress resistance genes in
              plants and to continuously update aspects of these research
              areas and encourage scientists to become participants in the
              exchange of data.
       </span>
    </el-col>
    <el-col :lg="12" :md="20" :sm="20"  class="bodyright">
      <div >
        <el-carousel :interval="5000" arrow="always" style="width: 100%;  height: 400px;">
          <el-carousel-item v-for="item in 4" :key="item" style="height:400px; ">
            <h3 text="2xl">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-col>
  </el-row>
  <el-row >
    <el-col :span="24"><span class="all-charts"></span></el-col>
  </el-row>
  <el-row >
    <el-col :span="24"><span class="data-text">Data Analysis</span></el-col>
  </el-row>
  <el-row :gutter="20" class="flex justify-center">
    <Charts/>
    <Charts2/>
    <el-col :lg="8" :md="12" :sm="16">
      <el-card class="charts-card">
        <div id="chart" style="height: 300px;width: 100%;"></div>
      </el-card>
    </el-col>
    <el-col :lg="8" :md="12" :sm="16">
      <el-card class="charts-card">
        <div id="chart" style="height: 300px;width: 100%;"></div>
      </el-card>
    </el-col>
    <el-col :lg="8" :md="12" :sm="16">
      <el-card class="charts-card">
        <div id="chart" style="height: 300px;width: 100%;"></div>
      </el-card>
    </el-col>
    <el-col :lg="8" :md="12" :sm="16">
      <el-card class="charts-card">
        <div id="chart" style="height: 300px;width: 100%;"></div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script setup>
import { ref,onMounted } from 'vue'

import {useResizeObserver} from "@vueuse/core";
import Charts from './chart/charts01.vue'
import Charts2 from './chart/charts02.vue'
const activeIndex2 = ref('1')
const handleSelect = (key,keyPath) => {
  console.log(key,"+++++", keyPath)
}


</script>

<style scoped>
.el-header{
  padding: 0 0px;
}
.demonstration {
  color: var(--el-text-color-secondary);
}
.welecome{
  @apply flex justify-center items-center font-bold pt-5 pb-5 text-3xl
}

.bodyleft{
  @apply flex text-lg  mx-12 my-4;
  text-indent: 2em;
}
.bodyright{
  @apply my-4 ;

}
.all-charts{
  @apply my-8
}
.charts-card{
  @apply  my-4;
}

.data-text{
  border-bottom: 2px solid #E5E7EB;
  border-top: 2px solid #E5E7EB;
  @apply flex justify-center items-center py-3 my-5
}
.el-card{
  --el-card-padding: 10px;
}
.el-carousel__item{
  @apply flex justify-center items-center
}
.el-carousel__item h3 {
  @apply text-5xl
}
</style>