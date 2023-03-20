<template>
  <el-card class="charts-card">
    <div :id="chartId" ref="el" style="height:300px;"></div>
  </el-card>
</template>

<script setup>
import * as echarts from 'echarts';
import {ref, onBeforeMount, onMounted} from 'vue'
import {useResizeObserver} from "@vueuse/core";
import axios from "axios"
import router from "~/router/index.js";

const props = defineProps({
  x: {
    type: Number,
    required: true
  },
  y: {
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
          {value: 100, name: 'Search Engine'},
          {value: 735, name: 'Direct'},
          {value: 580, name: 'Email'},
          {value: 484, name: 'Union Ads'},
          {value: 300, name: 'Video Ads'}
        ]
      }
    ]

  };

  let x = props.x
  let y = props.y
  let id = x - 1 + y * 3 - 3
  console.log(id)

  // echart 配置模板 开始

  let optionBar = { // 柱状图
    title: {
      text: 'Stress Type Count',
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
        rotate: 45,
        fontSize: 12,
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
        restore: {},
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
  };

  let optionPie = { // 饼图
    title: {
      text: 'Define a name!',
      left: 'center',
      top: 0,
      textStyle: {
        color: '#000'
      }
    },
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
        data: []
      }
    ]

  };


  // echart 配置模板 结束

  switch (id) {
    case 0: // 数据包含的物种所占有抗性基因的数量
      option = optionBar
      try {
        const res = await axios.post(
            'http://175.178.9.163:8093/plant-details/plantGeneCount'
        );
        let data = res.data.data
        option.series[0].data = data.list.map((item) => item.value)
        option.xAxis.data = data.list.map((item) => item.name)
        option && myChart.setOption(option)
        myChart.setOption({
          dataZoom: {
            type: 'slider', // 支持手动滑动和缩放
            start: 0,
            end: 25
          }
        });
      } catch (e) {
        console.error(e)
      }
      break
    case 1: // 各胁迫类型基因的统计数据比例
      option = optionPie
      option.title.text = 'Stress Type Count'
      try {
        const res = await axios.post('http://175.178.9.163:8093/plant-details/StressTypeCount');
        let data = res.data.data
        option.series[0].data = data.list.map((item) => {
          return {
            value: item.value,
            name: item.name
          }
        })
        myChart.on('click', function (params) {
          const url = '/browse/stresstype/list?stressName='
          router.push(url + params.name.replaceAll(' ', '+'))
        });

        option && myChart.setOption(option)
      } catch
          (e) {
        console.error(e)
      }
      break
    case 2: // 各基因家族的占比
      option = optionPie
      option.title.text = 'Gene Family Count'
      try {
        const res = await axios.post(
            'http://175.178.9.163:8093/plant-details/GeneFamilyCount'
        );
        let data = res.data.data
        option.series[0].data = data.list.map((item) => {
          return {
            value: item.value,
            name: item.name
          }
        })
        option && myChart.setOption(option)
      } catch (e) {
        console.error(e)
      }
      break
    case 3: // 大类表型出现的概率
      option = optionPie
      option.title.text = 'Phenotype Count'
      option.series[0].radius = ['35%', '50%']
      option.series[0].center = ['50%', '70%']
      try {
        const res = await axios.post(
            'http://175.178.9.163:8093/plant-details/PhenotypeCount'
        );
        let data = res.data.data
        option.series[0].data = data.list.map((item) => {
          return {
            value: item.value,
            name: item.name
          }
        })
        option.legend = {
          top: '10%',
          left: 'center',
          orient: 'horizontal',
          // smaller
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 10,
          textStyle: {
            fontSize: 12
          },
          // only show the first 10 and show a tip
          data: data.list.map((item) => item.name).slice(0, 10)
        }
        option && myChart.setOption(option)
      } catch (e) {
        console.error(e)
      }
      break
    case 4:
      renderChart(pieConfig('Expression Organs Gene Count', ['50%', '70%'], ['50%', '65%']), 'http://175.178.9.163:8093/plant-details/expressionOrgansGeneCount')
      break
    case 5:
      renderChart(barConfig('SubCellular Localization Count'), 'http://175.178.9.163:8093/plant-details/subCellularLocalizationCount')
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

  if (url) {
    axios.post(url)
        .then(res => {
          let data = res.data.data

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

          // if (config.series && config.series[0] && config.series[0].radius) {
          //   config.series[0].radius = ['35%', '50%']
          // }
          //
          // if (config.series && config.series[0] && config.series[0].center) {
          //   config.series[0].center = ['50%', '70%']
          // }

          if (config.legend) {
            config.legend.data = data.list.map(item => item.name).slice(0, 10)
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
        rotate: 45,
        fontSize: 12,
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
        restore: {},
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
.charts-card {
  @apply my-4;
}

.el-card {
  --el-card-padding: 10px;
}
</style>
