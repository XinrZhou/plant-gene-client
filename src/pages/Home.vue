<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row >
          <el-col :span="24">
            <el-menu
                :default-active="activeIndex"
                class="elmenu"
                mode="horizontal"
                text-color = "#F3F4F6"
                active-text-color="#D1FAE5"
                @select="handleSelect"
                background-color="#10B981"
                show-timeout="5000"
            >
                <el-menu-item><el-icon :size="30"><Management /></el-icon><img src="/1.png" class="ml-5" style="height: 32px"></el-menu-item>
            <div class="right">
<!--              <el-menu-item index="1">PASRGdb</el-menu-item>-->
              <el-menu-item index="2">Data Browse</el-menu-item>
              <el-sub-menu index="3">
                <template #title>Strees tyoe</template>
                <el-menu-item index="3-1">item one</el-menu-item>
                <el-menu-item index="3-2">item two</el-menu-item>
                <el-menu-item index="3-3">item three</el-menu-item>
                <el-menu-item index="3-4">item three</el-menu-item>
                <el-menu-item index="3-5">item three</el-menu-item>
                <el-menu-item index="3-6">item three</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="4">
                <template #title>Tools</template>
                <el-menu-item index="4-1">item one</el-menu-item>
                <el-menu-item index="4-2">item two</el-menu-item>
              </el-sub-menu>
              <el-menu-item index="5">Download</el-menu-item>
              <el-menu-item index="6">Helps</el-menu-item>
              <el-menu-item index="7">Submit</el-menu-item>
            </div>
            </el-menu>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="24"><div class="welecome"><span>Welecome to PASRGdb!</span></div></el-col>
        </el-row>
        <el-row class="flex justify-center">
          <el-col :lg="12" :md="20" :sm="20">
            <div class="bodyleft">
             <span> PASRGdb (Plant abiotic stress resistance genes database)
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
            </div>
          </el-col>
          <el-col :lg="12" :md="20" :sm="20"  class="bodyright">
            <div >
              <el-carousel :interval="5000" arrow="always" style="width: 100%;">
                <el-carousel-item v-for="item in 4" :key="item">
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
      </el-main>
      <el-footer class="f-footer">
        Footer

      </el-footer>
    </el-container>
  </div>
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

.elmenu{
  @apply flex font-bold items-center;
  height: 64px;
  z-index: 1000;
}
.right{
  @apply flex ml-auto;
}
.welecome{
  @apply flex justify-center items-center font-bold pt-5 pb-5 text-3xl
}
.el-main{
  @apply bg-gray-100 px-20;
}
.bodyleft{
  @apply text-lg  pb-5 mx-8;
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
.f-footer{
  @apply flex justify-center bg-gray-200
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