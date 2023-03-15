<template>
    <Title :page-title="pageTitle" />
    <el-row>
        <el-input v-model="searchContent" class="w-50  mb-4 " size="large" placeholder="Search" @input="change"
        :suffix-icon="Search" />
    </el-row>
    <!-- <SearchBox /> -->
    <el-row>
        <el-table :data="tableData" style="width: 100%" height="80vh" stripe @row-click="handleClick">
            <el-table-column fixed prop="gene" label="Gene" fit />
            <el-table-column prop="name" label="Scientific Name" type="name" fit />
            <el-table-column prop="product" label="Gene Product" type="product" fit />
            <el-table-column prop="localization" label="Subcellular Localization" type="localization" fit />
            <el-table-column prop="organs" label="Principal Expression Organs / Location" type="organs" fit>
                <template v-slot="scope">
                    <el-tag class="ml-2" effect="dark" :type="tagType[index%4]" v-for="(item,index) in scope.row.organs" :key="index">{{item}}</el-tag>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 16px;width: 100%;">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :background="background"
                layout="prev, pager, next, jumper" :total="1000" @current-change="handleCurrentChange" />
        </div>
    </el-row>
</template>

<script setup>
    import { storeToRefs } from 'pinia'
    import Title from '~/components/PageCenterTitle.vue'
    import SearchBox from '~/components/SearchBox.vue'
    import { ref, reactive, defineAsyncComponent } from 'vue'
    import { useBrowseStore } from '~/store/useBrowseStore.js'
    import router from "~/router"
    import { useRoute } from 'vue-router'
    import { Search } from '@element-plus/icons-vue'

    const store = useBrowseStore()
    const route = useRoute()

    const currentPage = ref(1)
    const pageSize = ref(15)
    const searchContent = ref('')
    const background = ref(true)
    const { stressTypeItemDataList } = storeToRefs(store)
    const tagType = reactive(['success','info','warning','danger'])
    const pageTitle = "List of "+route.query.stressName+" genes"


    let getStressTypeItemData = () => store.getStressTypeListItemData({
        pageNum: currentPage.value,
        pageSize: pageSize.value,
        searchContent: searchContent.value,
        stressName: route.query.stressName
    })

    getStressTypeItemData()

    const tableData = stressTypeItemDataList

    // currentPage改变时触发，重新获取table数据
    const handleCurrentChange = () => {
        getStressTypeItemData()
    }

    // input值改变时触发
    let change = () => {
        getStressTypeItemData()
    }

    let handleClick = (row) => {
        router.push({
            name: 'geneoverview',
            query: {
                geneName: row.gene
            }
        })
    }


</script>

<style scoped>
    .el-pagination {
        justify-content: center;
    }
</style>