<template>
    <PageCenterTitle page-title="Species" />
    <el-row >
        <el-col :span="menuCol" style="height: 550px;">
            <el-input :prefix-icon="Search"  v-model="navInput" @input="handleNavChange"  clearable/>
            <el-scrollbar max-height="550px" class="scrollbar-demo-item">
                <p :index="index+''" v-for="(item,index) in speciesFilterList" :key="index" @click="handleMenuClick(item)" >
                    <span class="menu-item">
                        {{item.name}}
                        <el-tag class="ml-2" type="success" style="vertical-align: -1%;">
                            {{item.value}}
                        </el-tag>
                    </span>
                </p>
              </el-scrollbar>
        </el-col>
        <el-col :span="tableCol" :offset="2">
            <el-input :prefix-icon="Search"  v-model="tableInput" @input="handleTableChange"  clearable/>
            <el-table :data="geneFilterList" class="el-table-vertical-demo" max-height="550px">
                <el-table-column prop="gene" label="name" />
              </el-table>
        </el-col>
    </el-row>
</template>

<script setup>
    import PageCenterTitle from "~/components/PageCenterTitle.vue"
    import { Search } from '@element-plus/icons-vue'
    import { useBrowseStore } from '~/store/useBrowseStore.js'
    import { ref, computed, watch, toRaw } from 'vue'

    const store = useBrowseStore()
    store.getSpeciesListData()
    const speciesList = computed(() => store.speciesDataList)
    const geneList = computed(() => store.geneDataList)
    let speciesFilterList = ref([])
    let geneFilterList = ref([]) 

    let menuCol = ref(24)
    let tableCol = ref(0)
    let navInput = ref('')
    let tableInput = ref('')

    watch(()=>store.geneDataList,()=>{
        geneFilterList.value = toRaw(geneList.value)
    })

    watch(()=>store.speciesDataList,()=>{
        speciesFilterList.value = toRaw(speciesList.value)
    })

    let handleMenuClick = (item) => {
        menuCol.value = 11
        tableCol.value = 11
        store.getGeneListDataBySciName(item.name)
    }

    let handleNavChange = (() => {
        if(navInput.value == '') {
            speciesFilterList.value = toRaw(speciesList.value) 
        } else {
            speciesFilterList.value = toRaw(speciesList.value) .filter(item => item.name.indexOf(navInput.value) !== -1)
        }
    })

    let handleTableChange = (() => {
        if(tableInput.value == '') {
            geneFilterList.value = toRaw(geneList.value)
        } else {
            geneFilterList.value = toRaw(geneList.value).filter(item => item.gene.indexOf(tableInput.value) !== -1)
        }
    })

</script>

<style scoped>
    .scrollbar-demo-item {
        @apply mt-6  bg-white;
    }

    .scrollbar-demo-item p {
        @apply m-2 h-10; 
    }

    .el-table-vertical-demo {
        @apply mt-6 ;
    }
</style>