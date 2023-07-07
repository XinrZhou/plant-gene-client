<template>
  <el-row>
    <el-col :span="24">
      <PageCenterTitle :page-title="homeContentData.bodyTitle" />
    </el-col>
  </el-row>
  <el-row class="flex">
    <el-col :lg="11" :md="24" :sm="20">
      <span class="bodyleft ml-2">{{ homeContentData.bodyContent }}</span>
    </el-col>
    <el-col :lg="12" :md="24" :sm="20" :offset="1" class="bodyright">
      <div v-for="item in homeContentData.bodyPicture">
        <!--        <el-carousel :interval="5000" arrow="always" style="width: 100%;  height: 600px;" arrow-class="my-arrow" autoplay>-->
        <!--          <el-carousel-item v-for="item in homeContentData.bodyPicture" :key="item.picture" style="height:500px;">-->
        <el-image style="width: 100%; height: 450px" :src=item.picture></el-image>
        <!--          </el-carousel-item>-->
        <!--        </el-carousel>-->

        <!--        <el-carousel :interval="5000" arrow="always" style="width: 90%;  height: 300px;" arrow-class="my-arrow" autoplay>-->
        <!--          <el-carousel-item v-for="item in homeContentData.bodyPicture" :key="item.picture" style="height:500px;">-->
        <!--            <img :src="item.picture">-->
        <!--          </el-carousel-item>-->
        <!--        </el-carousel>-->
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24"><span class="all-charts"></span></el-col>
  </el-row>
  <el-row>
    <el-col :span="24"><span class="data-text">Data Analysis</span></el-col>
  </el-row>
  <el-row class="my-card">
    <el-col :lg="8" :md="12" :sm="22" v-for="col in 6" :key="col">
      <DataChart :id="col"/>
    </el-col>
  </el-row>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import DataChart from '~/components/DataChart.vue'
import PageCenterTitle from '~/components/PageCenterTitle.vue'
import { useIndexStore } from '~/store/useIndexStore.js'

const activeIndex2 = ref('1')

const store = useIndexStore()

store.getHomeContentData()

const { homeContentData } = storeToRefs(store)

</script>

<style scoped>
.my-card{
  @apply flex justify-center
}
::v-deep(.element .style){
  margin-left: 0!important;
  margin-right: 0!important;
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
  @apply flex text-lg  my-4 text-justify mr-4 ;
  text-indent: 2em;
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