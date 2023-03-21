<template>
  <el-row>
    <el-col :span="24">
      <PageCenterTitle :page-title="homeContentData.bodyTitle" />
    </el-col>
  </el-row>
  <el-row class="flex justify-center">
    <el-col :lg="12" :md="20" :sm="20">
      <span class="bodyleft">{{ homeContentData.bodyContent }}</span>
    </el-col>
    <el-col :lg="12" :md="20" :sm="20" class="bodyright">
      <div>
        <el-carousel :interval="5000" arrow="always" style="width: 100%;  height: 400px;" autoplay>
          <el-carousel-item v-for="item in homeContentData.bodyPicture" :key="item.picture" style="height:350px;">
            <img :src="item.picture">
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24"><span class="all-charts"></span></el-col>
  </el-row>
  <el-row>
    <el-col :span="24"><span class="data-text">Data Analysis</span></el-col>
  </el-row>
  <el-row :gutter="20" class="flex justify-center" v-for="row in 2" :key="row">
    <el-col :lg="8" :md="12" :sm="16" v-for="col in 3" :key="col">
      <DataChart :x="col" :y="row" />
    </el-col>
  </el-row>
</template>

<script setup>
  import * as echarts from 'echarts'
  import { storeToRefs } from 'pinia'
  import { ref, onMounted } from 'vue'
  import { useResizeObserver } from "@vueuse/core"
  import DataChart from '~/components/DataChart.vue'
  import PageCenterTitle from '~/components/PageCenterTitle.vue'
  import { useIndexStore } from '~/store/useIndexStore.js'

  const activeIndex2 = ref('1')

  const store = useIndexStore()

  store.getHomeContentData()

  const { homeContentData } = storeToRefs(store)

</script>

<style scoped>
  .el-header {
    padding: 0 0;
  }

  .demonstration {
    color: var(--el-text-color-secondary);
  }

  .bodyleft {
    @apply flex text-lg mx-12 my-4;
    text-indent: 2em;
  }

  .bodyright {
    @apply my-4;

  }

  .all-charts {
    @apply my-8
  }

  .charts-card {
    @apply my-4;
  }

  .data-text {
    border-bottom: 2px solid #E5E7EB;
    border-top: 2px solid #E5E7EB;
    @apply flex justify-center items-center py-3 my-5
  }

  .el-card {
    --el-card-padding: 10px;
  }

  .el-carousel__item {
    @apply flex justify-center items-center
  }

  .el-carousel__item h3 {
    @apply text-5xl
  }
</style>