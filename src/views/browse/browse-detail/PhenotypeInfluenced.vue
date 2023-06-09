<template>
  <PageCenterTitle page-title="Phenotype Influenced" class="page-title"/>
  <el-row :gutter="40" justify="space-between">
    <el-col :span="menuCol" :class="menuClass">
      <LeftMenu :attribute-list="phenoList" @openMenu="handleOpen" @clickList="handleClick" :isLoading="loading"
                :attr-detail-list="phenoSubList"/>
    </el-col>
    <el-col :span="tableCol" class="animate__animated animate__backInDown">
      <el-input :prefix-icon="Search" v-model="tableInput" @input="handleTableFilter" clearable/>
      <el-table :data="tableInput==''?phenoGeneList:phenoGeneFilterList" class="el-table-vertical-demo" height="550px"
                stripe>
        <el-table-column prop="gene" label="gene name">
          <template v-slot="{ row }">
            <a href="" @click.prevent="goGeneDetail(row)" class="underline">{{ row.gene }}</a>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <!--  <el-row :gutter="40" justify="space-between">-->
  <!--   <div id="jsmind_container"></div>-->
  <!--  </el-row>-->

</template>

<script setup>
import PageCenterTitle from "~/components/PageCenterTitle.vue"
import LeftMenu from '~/components/LeftMenu.vue'
import {Search} from '@element-plus/icons-vue'
import {useBrowseStore} from '~/store/useBrowseStore.js'
import {computed, ref, toRaw} from 'vue'
import router from "~/router"
import {useRoute} from "vue-router";

const store = useBrowseStore()
store.getPhenoTypeListData()

const route = useRoute()

let phenoList = computed(() => store.phenoTypeDataList)
let phenoSubList = computed(() => store.phenoTypeSubDataList)
let phenoGeneList = computed(() => store.phenoTypeGeneDataList)
let phenoGeneFilterList = ref([])
let tableInput = ref('')
let loading = computed(() => store.isLoading)

let tableCol = ref(0)
let menuCol = ref(24)
let menuClass = ref('')

let handleOpen = (value) => {
  store.getPhenoTypeSubListData(value)
}

if (route.query.group != null) {
  console.log(route.query.group)
  store.getPhenoTypeSubListData(route.query.group)
}

if (route.query.group != null && route.query.pheno != null) {
  menuClass.value = 'animate__animated animate__backInUp'
  tableCol.value = 12
  menuCol.value = 12
  store.getPhenoGeneListData(route.query.pheno, route.query.group)
}
let handleClick = (attrName, attrItem2) => {
  menuClass.value = 'animate__animated animate__backInUp'
  tableCol.value = 12
  menuCol.value = 12
  store.getPhenoGeneListData(toRaw(attrItem2).name, attrName)
}


let handleTableFilter = () => {
  if (tableInput.value) {
    phenoGeneFilterList.value = toRaw(phenoGeneList.value).filter(item => item.gene.indexOf(tableInput.value) !== -1)
  } else {
    phenoGeneFilterList.value = toRaw(phenoGeneList.value)
  }
}

// 路由跳转-->基因概述
let goGeneDetail = (row) => {
  router.push({
    path: 'browse/stresstype/geneoverview',
    query: {
      geneName: row.gene
    }
  })
}

</script>

<!--<script>-->
<!--  import 'jsmind/style/jsmind.css'-->
<!--  import jsMind from 'jsmind/js/jsmind.js'-->
<!--  import axios from "axios";-->
<!--  export default {-->
<!--    data() {-->
<!--      return {-->
<!--        mind: {-->
<!--          meta: {-->
<!--            name: 'Browse Guide',-->
<!--          },-->
<!--          format: 'node_tree',-->
<!--          data: {-->
<!--            id: 'root',-->
<!--            topic: 'PASRGdb',-->
<!--            children: [-->
<!--              {-->
<!--                id: 'Species',-->
<!--                topic: 'Species',-->
<!--                direction: 'left',-->
<!--                expanded: true,-->
<!--                children: [-->
<!--                  {-->
<!--                    id: 'drought resistance',-->
<!--                    topic: 'drought resistance'-->
<!--                  },-->
<!--                  {-->
<!--                    id: 'Salt and alkali resistance',-->
<!--                    topic: 'Salt and alkali resistance'-->
<!--                  },-->
<!--                  {-->
<!--                    id: 'Uv resistance',-->
<!--                    topic: 'Uv resistance'-->
<!--                  },-->
<!--                  {-->
<!--                    id: 'lodging resistance',-->
<!--                    topic: 'lodging resistance'-->
<!--                  }-->
<!--                ]-->
<!--              }-->
<!--            ]-->
<!--          },-->
<!--        },-->
<!--        options: {-->
<!--          container: 'jsmind_container', // [必选] 容器的ID-->
<!--          editable: false, // [可选] 是否启用编辑-->
<!--          theme: 'asphalt', // [可选] 主题-->
<!--          view: {-->
<!--            engine: 'canvas', // 思维导图各节点之间线条的绘制引擎-->
<!--            hmargin: 120, // 思维导图距容器外框的最小水平距离-->
<!--            vmargin: 50, // 思维导图距容器外框的最小垂直距离-->
<!--            line_width: 2, // 思维导图线条的粗细-->
<!--            line_color: '#aaa' // 思维导图线条的颜色-->
<!--          },-->
<!--          layout: {-->
<!--            hspace: 100, // 节点之间的水平间距-->
<!--            vspace: 20, // 节点之间的垂直间距-->
<!--            pspace: 20 // 节点与连接线之间的水平间距（用于容纳节点收缩/展开控制器）-->
<!--          },-->
<!--          shortcut: {-->
<!--            enable: false // 是否启用快捷键 默认为true-->
<!--          }-->
<!--        }-->
<!--      }-->
<!--    },-->
<!--    mounted() {-->
<!--      axios.post('http://175.178.9.163:8093/browseSpecies/mindMapping')-->
<!--        .then(response => {-->
<!--          this.mind.data.children = response.data.data.map((item, index) => {-->
<!--            return {-->
<!--              id: item.phenotypeGroup.toString(),-->
<!--              topic: item.phenotypeGroup,-->
<!--              direction: index % 2 === 0 ? 'left' : 'right',-->
<!--              expanded: false-->
<!--            }-->
<!--          })-->
<!--          this.mind.data.children.forEach(item => {-->
<!--            item.children = []-->
<!--            response.data.data.forEach(item2 => {-->
<!--              console.log(item2)-->
<!--              if (item.id === item2.phenotypeGroup.toString()) {-->
<!--                item2.phenotypes.forEach(item3 => {-->
<!--                  item.children.push({-->
<!--                    id: item3.toString(),-->
<!--                    topic: item3-->
<!--                  })-->
<!--                })-->
<!--              }-->
<!--            })-->
<!--          })-->
<!--          this.jm = jsMind.show(this.options, this.mind)-->
<!--        })-->
<!--        .catch(error => {-->
<!--          console.error(error)-->
<!--        })-->
<!--    }-->
<!--  }-->
<!--</script>-->

<style scoped>
@media screen and (min-width: 992px) {
  .page-title {
    max-width: 70%;
    margin: 0 auto;
  }

  .el-row {
    position: absolute;
    left: 15%;
    right: 15%;
  }
}

/* 手机端 */
@media screen and (max-width: 993px) {
  .page-title {
    max-width: 100%;
  }

  .el-row {
    max-width: 100%;
  }
}

#jsmind_container {
  width: 100%;
  height: 150vh;
}

::v-deep .el-row {
  background-color: white;
}

.el-table-vertical-demo {
  @apply mt-5;
}
</style>