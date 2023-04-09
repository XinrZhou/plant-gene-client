<template>
    <PageCenterTitle page-title="Search" />
    <!-- page searchbox -->
    <el-row>
        <el-select v-model="value" filterable remote clearable reserve-keyword placeholder="Please enter a keyword"
            :remote-method="remoteMethod" :loading="loading" class="w-full" @change="handleRemoteSearch">
            <el-option v-for="(item,index) in options" :value="item.content" :key="index">
                <span style="float: left">
                    {{ item.content }}
                    <span style="color: var(--el-text-color-secondary);font-size: 13px;" class="p-4"
                        v-if="item.gene==null?false:true">
                        Gene:{{ item.gene }}
                    </span>
                </span>
                <span style="float: right; color: var(--el-text-color-secondary);font-size: 13px;">
                    {{ item.attribute}}
                </span>
            </el-option>
        </el-select>
    </el-row>

    <el-row>
        <!-- left menu -->
        <el-col :lg="7" :md="12">
            <h5 class="menu-title">Filter Bar</h5>
            <LeftMenu :attribute-list="attributeList" @openMenu="handleOpen" @clickList="handleClick" :isLoading="isLoading "
                :attr-detail-list="attrDetailList" />
        </el-col>

        <!-- right table -->
        <el-col  :lg="16"  :md="11" :offset="1">
            <el-table :data="geneDataList" stripe  class="right-table">
                <el-table-column fixed prop="gene" label="Gene" width="180">
                  <template v-slot="{ row }">
                    <a href="" @click.prevent="handleGeneClick(row)" class="underline">{{row.gene}}</a>
                  </template>
                </el-table-column>
                <el-table-column prop="scientificName" label="scientificName" width="180" />
                <el-table-column prop="description" label="description" fit/>
            </el-table>
            <!-- pagination  -->
            <div>
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                    layout="prev, pager, next, jumper" :total="pageTotal" @current-change="handleCurrentChange" />
            </div>
        </el-col>
    </el-row>
</template>

<script setup>
    import PageCenterTitle from '~/components/PageCenterTitle.vue'
    import LeftMenu from '~/components/LeftMenu.vue'
    import { Search } from '@element-plus/icons-vue'
    import { useSearchStore } from '~/store/useSearchStore.js'
    import { ref, computed, reactive, watch, toRaw } from 'vue'
    import router from "~/router/index.js";

    const store = useSearchStore()
    store.getAttributeListData()
    store.getMenuListData()

    // attribute 列表
    const attributeList = computed(() => store.attributeDataList)
    // attribute 详情列表 
    let attrDetailList = computed(() => store.attrDetailDataList)
    // attribute 详情列表(结合搜索条件)
    let attrDetailFilterList = ref([])
    // gene 列表（右侧表格数据）
    const geneDataList = computed(() => store.geneDataList)
    const isLoading = computed(() => store.isLoading)

    const list = reactive([])
    let options = computed(() => store.searchDataList)
    const value = ref([])

    // 属性名
    let attrName = ref('')
    // 属性item
    let attrItem = reactive({})
    const currentPage = ref(1)
    const pageSize = ref(10)
    let pageTotal = ref(1)


    watch(() => store.recordsCount, () => {
        pageTotal.value = store.recordsCount
    })

    // menu展开时触发
    let handleOpen = (value) => {
        store.getAttrDetailListData(value)
    }

    // menu关闭时触发
    let handleClose = () => {
        attrDetailList = ref([])
    }

    // 远程搜索
    const remoteMethod = (query) => {
        if (query) {
            store.getFuzzySearchListData(query)
        } else {
            options.value = []
        }
    }
    let handleGeneClick = (row) => {
      router.push({
        name: 'geneoverview',
        query: {
          geneName: row.gene
        }
      })
    }
    // 点击菜单项时触发：获取基因数据
    const handleClick = (attr, item) => {
        attrName.value = attr
        attrItem = item
        pageTotal.value = item.value
        store.getListData({
            "attribute": attr,
            "name": item.name,
            "pageNum": currentPage.value,
            "pageSize": pageSize.value
        })
    }

    // 分页器数据改变时触发
    const handleCurrentChange = () => {
        if (attrItem.name == undefined) { // 根据模糊搜索结果进行查询
            store.getListDataByFuzzyRes({
                "pageNum": currentPage.value,
                "pageSize": pageSize.value,
                "searchContent": value.value
            })
        } else {
            store.getListData({ // 通过选择attribute和attrItem进行查询
                "attribute": attrName.value,
                "name": attrItem.name,
                "pageNum": currentPage.value,
                "pageSize": pageSize.value
            })
        }
    }

    const handleRemoteSearch = () => {
        store.getListDataByFuzzyRes({
            "pageNum": currentPage.value,
            "pageSize": pageSize.value,
            "searchContent": value.value
        })
    }
</script>

<style scoped>
    /* PC端 */
    @media screen and (min-width: 992px) {
      .el-row {
        max-width: 70%;
        margin: 0 auto;
      }
    }
    /* 手机端 */
    @media screen and (max-width: 993px) {
      .el-row {
        max-width: 100%;
      }
    }
    .menu-title {
        @apply mb-4 mt-4 text-2xl font-semibold;
    }

    .menu-item-title {
        @apply text-base font-semibold;
    }

    .left-menu-input {
        @apply w-2/3 pl-5;
    }

    .infinite-list {
        overflow: auto;
        height: 400px;
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .infinite-list .infinite-list-item {
        display: flex;
        align-items: center;
        justify-content: left;
        background: white;
        margin: 10px;
        color: black;
        @apply break-words h-auto pl-4 text-sm font-medium leading-7;
    }

    .infinite-list .infinite-list-item+.list-item {
        margin-top: 10px;
    }

    .right-table {
        @apply mt-16;
    }

    .el-pagination {
        justify-content: center;
        margin-top: 16px;
        width: 100%;
    }
</style>