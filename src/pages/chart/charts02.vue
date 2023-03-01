<template>
  <el-col :lg="8" :md="12" :sm="16">
    <el-card class="charts-card">
      <div id="chart1" ref="el" style="height:300px;"></div>
    </el-card>
  </el-col>
</template>

<script setup>
import * as echarts from 'echarts';
import { ref,onMounted } from 'vue'
import {useResizeObserver} from "@vueuse/core";
var myChart = null
onMounted(()=>{
  var chartDom = document.getElementById('chart1');
  myChart = echarts.init(chartDom);
  var option;

  option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top  : '10%',
      left: 'center'
    },
    toolbox: {
      show: true,
      itemSize: 10,
      feature: {
        dataView: {
          readOnly: true
        },
        restore: {},
        saveAsImage: {}
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        center:['50%','60%'],
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
  };

  option && myChart.setOption(option);
})


const el = ref(null)
useResizeObserver(el, (entries) => myChart.resize())
</script>

<style scoped>
.charts-card{
  @apply  my-4;
}
.el-card{
  --el-card-padding: 10px;
}
</style>