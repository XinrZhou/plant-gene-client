<template>
  <PageCenterTitle page-title="Phenotype Influence"/>
  <div id="jsmind_container"></div>
</template>

<script setup>
import PageCenterTitle from "~/components/PageCenterTitle.vue";
</script>

<script>
import 'jsmind/style/jsmind.css'
import jsMind from 'jsmind/js/jsmind.js'
import axios from "axios";

export default {
  data() {
    return {
      mind: {
        meta: {
          name: 'Browse Guide',
        },
        format: 'node_tree',
        data: {
          id: 'root',
          topic: 'PASRGdb',
          children: [
            {
              id: 'Species',
              topic: 'Species',
              direction: 'left',
              expanded: true,
              children: [
                {
                  id: 'drought resistance',
                  topic: 'drought resistance'
                },
                {
                  id: 'Salt and alkali resistance',
                  topic: 'Salt and alkali resistance'
                },
                {
                  id: 'Uv resistance',
                  topic: 'Uv resistance'
                },
                {
                  id: 'lodging resistance',
                  topic: 'lodging resistance'
                }
              ]
            }
          ]
        },
      },
      options: {
        container: 'jsmind_container', // [必选] 容器的ID
        editable: false, // [可选] 是否启用编辑
        theme: 'asphalt', // [可选] 主题
        view: {
          engine: 'canvas', // 思维导图各节点之间线条的绘制引擎
          hmargin: 120, // 思维导图距容器外框的最小水平距离
          vmargin: 50, // 思维导图距容器外框的最小垂直距离
          line_width: 2, // 思维导图线条的粗细
          line_color: '#aaa' // 思维导图线条的颜色
        },
        layout: {
          hspace: 100, // 节点之间的水平间距
          vspace: 20, // 节点之间的垂直间距
          pspace: 20 // 节点与连接线之间的水平间距（用于容纳节点收缩/展开控制器）
        },
        shortcut: {
          enable: false // 是否启用快捷键 默认为true
        }
      }
    }
  },
  mounted() {
    axios.post('http://175.178.9.163:8093/browseSpecies/mindMapping')
        .then(response => {
          this.mind.data.children = response.data.data.map((item, index) => {
            return {
              id: item.phenotypeGroup.toString(),
              topic: item.phenotypeGroup,
              direction: index % 2 === 0 ? 'left' : 'right',
              expanded: false
            }
          })
          this.mind.data.children.forEach(item => {
            item.children = []
            response.data.data.forEach(item2 => {
              console.log(item2)
              if (item.id === item2.phenotypeGroup.toString()) {
                item2.phenotypes.forEach(item3 => {
                  item.children.push({
                    id: item3.toString(),
                    topic: item3
                  })
                })
              }
            })
          })
          this.jm = jsMind.show(this.options, this.mind)
        })
        .catch(error => {
          console.error(error)
        })
  }
}
</script>

<style scoped>
#jsmind_container {
  width: 100%;
  height: 150vh;
}
</style>
