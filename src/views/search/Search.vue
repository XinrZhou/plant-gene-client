<template class="page-main">
    <div class="page-main">
        <PageCenterTitle page-title="Search" />
        <!-- page searchbox -->
        <el-row>
            <el-select v-model="value" filterable remote clearable reserve-keyword placeholder="Please enter a keyword" :remote-method="remoteMethod" :loading="loading" class="w-full"
                @change="handleRemoteSearch">
                <el-option v-for="(item,index) in options" :value="item.content" :key="index">
                    <span style="float: left">{{ item.content }}</span>
                    <span style="float: right; color: var(--el-text-color-secondary);font-size: 13px;">{{ item.attribute
                        }}</span>
                </el-option>
            </el-select>
        </el-row>

        <el-row>
            <!-- left menu -->
            <el-col :span="8">
                <h5 class="menu-title">Filter Bar</h5>
                <el-menu @open="handleOpen" @close="handleClose" unique-opened>
                    <el-sub-menu :index="''+(index+1)" v-for="(item,index) in attributeList" :key="index">
                        <template #title>
                            <span class="menu-item-title">
                                {{item.name}}
                                <el-tag class="ml-2" type="success">
                                    {{item.value}}
                                </el-tag>
                            </span>
                        </template>
                        <!-- menu searchbox -->
                        <el-input v-model="menuSearchContent" class="left-menu-input" placeholder="Search"
                            @input="handleChange" :prefix-icon="Search" />
                        <!-- scroll -->
                        <ul class="infinite-list" infinite-scroll-immediate="false" v-loading="isLoading">
                            <li class="infinite-list-item" v-for="(item2,index2) in attrDetailFilterList" :key="index2"
                                @click="handleClick(item.name,item2)">
                                {{item2.name}}
                                <el-tag class="ml-2">
                                    {{item2.value}}
                                </el-tag>
                            </li>
                        </ul>
                    </el-sub-menu>
                </el-menu>
            </el-col>

            <!-- right table -->
            <el-col :span="15" :offset="1">
                <el-table :data="geneDataList" stripe style="width: 100%" class="right-table">
                    <el-table-column prop="gene" label="gene" width="180" />
                    <el-table-column prop="scientificName" label="scientificName" width="180" />
                    <el-table-column prop="description" label="description" />
                </el-table>
                <!-- pagination  -->
                <div>
                    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                        layout="prev, pager, next, jumper" :total="pageTotal" @current-change="handleCurrentChange" />
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
    import PageCenterTitle from '~/components/PageCenterTitle.vue'
    import { Search } from '@element-plus/icons-vue'
    import { useSearchStore } from '~/store/useSearchStore.js'
    import { ref, computed, reactive, watch, toRaw } from 'vue'

    const store = useSearchStore()
    store.getAttributeListData()

    // attribute 列表
    const attributeList = computed(() => store.attributeDataList)
    // attribute 详情列表 
    let attrDetailList = ref([])
    // attribute 详情列表(结合搜索条件)
    let attrDetailFilterList = reactive([])
    // gene 列表（右侧表格数据）
    const geneDataList = computed(() => store.geneDataList)
    const isLoading = ref(true)

    const list = reactive([])
    let options = computed(() => store.searchDataList)
    const value = ref([])
    const loading = ref(false)

    // menu searchbox
    const menuSearchContent = ref('')

    // 属性名
    let attrName = ref('')
    // 属性item
    let attrItem = reactive({})
    const currentPage = ref(1)
    const pageSize = ref(10)
    let pageTotal = ref(1)

    // 数据监视
    watch(() => store.isLoading, () => {
        attrDetailList.value = store.attrDetailDataList
        attrDetailFilterList = toRaw(attrDetailList.value)
        isLoading.value = store.isLoading
    })

    watch(() => store.recordsCount, () => {
        pageTotal.value = store.recordsCount
    })

    // menu展开时触发
    let handleOpen = (index) => {
        store.getAttrDetailListData(attributeList.value[index - 1].name)
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

    // 菜单搜索框改变时触发
    let handleChange = () => {
        // 根据搜索条件进行过滤
        if (searchContent.value) {
            attrDetailFilterList = attrDetailFilterList.filter(item => item.name.indexOf(searchContent.value) !== -1)
        } else {
            attrDetailFilterList = toRaw(attrDetailList.value)
        }
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
        store.getListData({
            "attribute": attrName.value,
            "name": attrItem.name,
            "pageNum": currentPage.value,
            "pageSize": pageSize.value
        })
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
    .page-main {}

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
        height: 100% !important;
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