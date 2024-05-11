<template>
  <el-row>
    <el-col :span="24">
      <PageCenterTitle :page-title="homeContentData.bodyTitle"/>
    </el-col>
  </el-row>
  <el-row class="flex">
    <el-col :lg="11" :md="24" :sm="20">
      <span class="bodyleft ml-2">{{ homeContentData.bodyContent }}</span>
    </el-col>
    <el-col :lg="12" :md="24" :sm="20" :offset="1" class="bodyright">
      <div v-for="item in homeContentData.bodyPicture">
        <el-image style="width: 100%; height: 450px" :src=home_img></el-image>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24"><span class="all-charts"></span></el-col>
  </el-row>
  <el-row>
    <el-col :span="24"><span class="data-text">Reference Data Brower</span></el-col>
  </el-row>
  <el-row class="my-card">
    <el-col :lg="8" :md="12" :sm="22" v-for="col in 6" :key="col">
      <DataChart :id="col"/>
    </el-col>
  </el-row>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {ref, onMounted} from 'vue'
import DataChart from '~/components/DataChart.vue'
import PageCenterTitle from '~/components/PageCenterTitle.vue'
import {useIndexStore} from '~/store/useIndexStore.js'

const activeIndex2 = ref('1')

const store = useIndexStore()
const home_img = new URL("/src/assets/P7Iu-fynwnwt8108225.jpg", import.meta.url).href

store.getHomeContentData()

const {homeContentData} = storeToRefs(store)

</script>

<style scoped>
.my-card {
  @apply flex justify-center
}

::v-deep(.element .style) {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

/* PC端 */
@media screen and (min-width: 992px) {
  .el-row {
    max-width: 90%;
    margin: 0 auto;
  }
}

/* 手机端 */
@media screen and (max-width: 993px) {
  .el-row {
    max-width: 100%;
  }
}

.el-header {
  padding: 0 0;
}

.demonstration {
  color: var(--el-text-color-secondary);
}

.bodyleft {
  @apply flex text-base  my-4 text-justify mr-4 ;
}

.bodyright {
  @apply mt-6;

}

.all-charts {
  @apply my-8
}

.charts-card {
  @apply my-4 rounded-2xl;
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

.my-arrow::before {
  color: red;
}

.my-arrow::after {
  color: red;
}
</style>
