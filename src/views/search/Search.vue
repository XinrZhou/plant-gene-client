<template>
    <PageCenterTitle page-title="Search" />
    <el-row>
        <el-input v-model="searchContent" class="w-50  mb-4 " size="large" placeholder="Search" @input="change"
            :suffix-icon="Search" />
    </el-row>
    <el-row>
        <el-col :span="8">
            <h5 class="menu-title">Filter Bar</h5>
            <el-menu default-active="2" class="menu" @open="handleOpen" unique-opened>
                <el-sub-menu :index="''+(index+1)" v-for="(item,index) in attributeList" :key="index">
                    <template #title>
                        <span class="menu-item-title">
                            {{item.name}}
                            <el-tag class="ml-2" type="success">
                                {{item.value}}
                            </el-tag>
                        </span>
                    </template>
                    <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto"
                        infinite-scroll-immediate="false">
                        <li v-for="(item2,index2) in attrDetailList" :key="index2" class="infinite-list-item"
                            @click="handleClick(item.name,item2.name)">
                            {{item2.name}}
                            <el-tag class="ml-2">
                                {{item2.value}}
                            </el-tag>
                        </li>
                    </ul>
                </el-sub-menu>
            </el-menu>
        </el-col>
        <el-col :span="15" :offset="1">
            <el-table :data="dataList" stripe style="width: 100%" class="right-table">
                <el-table-column prop="gene" label="gene" width="180" />
                <el-table-column prop="scientificName" label="scientificName" width="180" />
                <el-table-column prop="description" label="description" />
            </el-table>
            <div style="margin-top: 16px;width: 100%;">
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :background="background"
                    layout="prev, pager, next, jumper" :total="1000" @current-change="handleCurrentChange" />
            </div>
        </el-col>
    </el-row>
</template>

<script setup>
    import PageCenterTitle from '~/components/PageCenterTitle.vue'
    import { Search } from '@element-plus/icons-vue'
    import { useSearchStore } from '~/store/useSearchStore.js'
    import { ref, computed, reactive, watch } from 'vue'

    const store = useSearchStore()
    store.getAttributeListData()

    const attributeList = computed(() => store.attributeDataList)
    const isLoading = computed(() => store.isLoading)
    const dataList = computed(() => store.dataList)
    const searchContent = ref('')
    let attrDetailList = ref([])
    const currentPage = ref(1)
    const pageSize = ref(10)

    let handleOpen = async (index) => {
        store.getAttrDetailListData(attributeList.value[index - 1].name)
    }

    watch(() => store.isLoading, () => {
        attrDetailList = computed(() => store.attrDetailDataList)
    })

    const load = () => {
        attrDetailList = computed(() => store.attrDetailDataList)
    }


    let change = () => {

    }

    let handleClick = (attr, name) => {
        store.getListData({
            attribute: attr,
            name: name,
            pageNum: currentPage.value,
            pageSize: pageSize.value
        })
    }

</script>

<style scoped>
    .menu-title {
        @apply mb-4 mt-4 text-2xl font-semibold;
    }

    .menu-item-title {
        @apply text-base font-semibold ;
    }

    .infinite-list {
        height: 300px;
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

    .el-pagination {
        justify-content: center;
    }

    .right-table {
        @apply mt-16;
    }
</style>