<template>
  <el-card class="charts-card" shadow="hover">
    <div :id="chartId" ref="el" style="height:350px;"></div>
  </el-card>
</template>

<script setup>
import * as echarts from 'echarts';
import {onBeforeMount, onMounted, ref} from 'vue'
import {useResizeObserver} from "@vueuse/core";
import router from "~/router/index.js";
import axios from "~/api/http"

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
});

var myChart = null
let chartId = ref('')

onBeforeMount(() => {
  chartId.value = `echarts-id-${parseInt((Math.random() * 1000000).toString())}`;
})

onMounted(async () => {
  const chartDom = document.getElementById(chartId.value);
  myChart = echarts.init(chartDom);
  let option;

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
        saveAsImage: {}
      }
    },
    series: [
      {
        name: 'Count',
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
        data: []
      }
    ]

  };

  let x = props.id
  let id = x - 1
  // console.log(id)

  switch (id) {
    case 0: // 数据包含的物种所占有抗性基因的数量
      renderChart(barConfig('Species'), '/plant-details/plantGeneCount')
      myChart.setOption({
        dataZoom: {
          type: 'inside', // 支持手动滑动和缩放
          start: 0,
          end: 5
        }
      });
      myChart.on('click', function (params) {
        const url = '/browse/species?species='
        router.push(url + params.name.replaceAll(' ', '+'))
      });
      break
    case 1: // 各胁迫类型基因的统计数据比例
      renderChart(pieConfig('Stress Type', ['45%', '65%'], ['50%', '65%']), '/plant-details/StressTypeCount')
      myChart.on('click', function (params) {
        const url = '/browse/stresstype/list?stressName='
        router.push(url + params.name.replaceAll(' ', '+'))
      });
      break
    case 2: // 各基因家族的占比
      renderChart(pieConfig('Gene Family', ['50%', '70%'], ['50%', '65%']), '/plant-details/GeneFamilyCount')
      myChart.on('click', function (params) {
        const url = '/browse/genefamily?type=TF&name='
        router.push(url + params.name)
      });
      break
    case 3: // 大类表型出现的概率
      option.legend = {
        top: '10%',
        left: 'center',
        orient: 'horizontal',
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 10,
        textStyle: {
          fontSize: 12
        }
      }
      option && myChart.setOption(option)
      renderChart(pieConfig('Phenotype Influenced', ['40%', '60%'], ['50%', '67%']), '/plant-details/PhenotypeCount')
      myChart.on('click', function (params) {
        const url = '/browse/phenotypeinfluenced?group='
        router.push(url + params.name)
      });
      break
    case 4:
      renderChart(barConfig('Expression Organs'), '/plant-details/expressionOrgansGeneCount')
      myChart.setOption({
        dataZoom: {
          type: 'inside', // 支持手动滑动和缩放
          start: 1,
          end: 15
        }
      });
      myChart.on('click', function (params) {
        const url = '/browse/expressionorgans?expressionOrgans='
        router.push(url + params.name.replaceAll(' ', '+'))
      });
      break
    case 5:
      renderChart(barConfig('SubCellular Localization'), '/plant-details/subCellularLocalizationCount')
      myChart.setOption({
        dataZoom: {
          type: 'inside', // 支持手动滑动和缩放
          start: 1,
          end: 40
        }
      });
      myChart.on('click', function (params) {
        const url = '/browse/subcellularlocalization?subCellular='
        router.push(url + params.name.replaceAll(' ', '+'))
      });
      break
    default:
      option && myChart.setOption(option);
  }
})


const el = ref(null)
useResizeObserver(el, (entries) => myChart.resize())

function renderChart(config, url) {
  if (!config || !myChart) {
    return
  }

  const option = config
  // console.log(url)
  if (url) {
    axios.post(url)
      .then(res => {
        let data = res.data

        if (config.series && config.series[0] && config.series[0].data) {
          config.series[0].data = data.list.map(item => {
            return {
              value: item.value,
              name: item.name
            }
          })
        }

        if (config.xAxis && config.xAxis.data) {
          config.xAxis.data = data.list.map(item => item.name)
        }

        if (config.legend) {
          config.legend.data = data.list.map(item => item.name).slice(0, 9)
        }

        myChart.setOption(option)
      })
      .catch(err => {
        console.error(err)
      })
  } else {
    myChart.setOption(option)
  }
}

function pieConfig(title = '', radius = ['50%', '70%'], center = ['50%', '60%']) {
  return {
    tooltip: {
      trigger: 'item',
      confine: true
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
        saveAsImage: {}
      }
    },
    series: [
      {
        name: 'Count',
        type: 'pie',
        center: center,
        radius: radius,
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
        data: []
      }
    ],
    title: {
      text: title,
      left: 'center',
      top: 0,
      textStyle: {
        color: '#000'
      }
    }
  }
}

function barConfig(title = '') {
  return {
    title: {
      text: title,
      left: 'center',
      top: 0,
      textStyle: {
        color: '#000'
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      top: '10%',
      left: 'center',
    },
    xAxis: {
      type: 'category',
      data: [],
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
        interval: 0,
        rotate: 30,
        fontSize: 8,
      }
    },
    yAxis: {
      type: 'value'
    },
    toolbox: {
      show: true,
      itemSize: 10,
      feature: {
        dataView: {
          readOnly: true
        },
        saveAsImage: {}
      }
    },
    series: [
      {
        name: 'Gene Count',
        type: 'bar',
        data: [],
        barWidth: '60%',
        barGap: '0%',
        barCategoryGap: '0%',
      }
    ]
  }
}
</script>

<style scoped>
</style>
