<template>
  <el-card class="charts-card">
    <div :id="chartId" ref="el" style="height:300px;"></div>
  </el-card>
</template>

<script setup>
  import * as echarts from 'echarts';
  import { ref, onBeforeMount, onMounted } from 'vue'
  import { useResizeObserver } from "@vueuse/core";
  var myChart = null
  let chartId = ref('')

  onBeforeMount(() => {
    chartId.value = `echarts-id-${parseInt((Math.random() * 1000000).toString())}`;
  }),

  onMounted(() => {
    var chartDom = document.getElementById(chartId.value);
    myChart = echarts.init(chartDom);
    var option;

    option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '10%',
        left: 'center',

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
          center: ['50%', '60%'],
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 2,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
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
  .charts-card {
    @apply my-4;
  }

  .el-card {
    --el-card-padding: 10px;
  }
</style>