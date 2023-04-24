<template>
    <el-row>
        <el-col :span="7">
            <!-- Specied -->
            <el-card class="box-card">
                <template #header>
                    <div class="card-header" v-for="item in speciesList.title" :key="item.name">
                        <span>{{item.name}}</span>&nbsp;
                        <span>{{item.value}}</span>
                    </div>
                </template>
                <el-scrollbar :height="speciesScrollHeight">
                  <el-input :prefix-icon="Search" v-model="navInput" @input="handleNavChange" clearable />
                    <el-radio-group v-model="speciesRadio" size="large">
                        <el-radio-button 
                            name="speciesRadio" 
                            :label="item.name" 
                            v-for="item in speciesList.list"
                            :key="item.name" 
                            @change="handleBtnChange" 
                            @click="handleClick"
                        >
                            <span class="card-item-span">{{item.name}}</span>&nbsp;
                            <el-tag type="info" round>{{item.value}}</el-tag>
                        </el-radio-button>
                    </el-radio-group>
                </el-scrollbar>
                <el-button style="width: 100%;" @click="changeScrollHeight(1)">
                    <el-icon>
                        <ArrowDown />
                    </el-icon>
                </el-button>
            </el-card>

            <!-- StressType -->
            <el-card class="box-card">
                <template #header>
                    <div class="card-header" v-for="item in stressTypeList.title" :key="item.name">
                        <span>{{item.name}}</span>&nbsp;
                        <span>{{item.value}}</span>
                    </div>
                </template>
                <el-scrollbar :height="stressTypeScrollHeight">
                    <el-radio-group v-model="stressTypeRadio" size="large">
                        <el-radio-button 
                            name="stressTypeRadio" 
                            :label="item.name" 
                            v-for="item in stressTypeList.list"
                            :key="item.name" 
                            @change="handleBtnChange" @click="handleClick"
                        >
                            <span class="card-item-span">{{item.name}}</span>&nbsp;
                            <el-tag type="info" round>{{item.value}}</el-tag>
                        </el-radio-button>
                    </el-radio-group>
                </el-scrollbar>
                <el-button style="width: 100%;" @click="changeScrollHeight(2)">
                    <el-icon>
                        <ArrowDown />
                    </el-icon>
                </el-button>
            </el-card>

            <!-- GeneFamily -->
            <el-card class="box-card">
                <template #header>
                    <div class="card-header" v-for="item in geneFamilyList.title" :key="item.name">
                        <span>{{item.name}}</span>&nbsp;
                        <span>{{item.value}}</span>
                    </div>
                </template>
                <el-scrollbar :height="geneFamilyScrollHeight">
                    <el-radio-group v-model="geneFamilyRadio" size="large">
                        <el-radio-button 
                            name="geneFamilyRadio" 
                            :label="item.name" 
                            v-for="item in geneFamilyList.list"
                            :key="item.name" 
                            @change="handleBtnChange" 
                            @click="handleClick"
                        >
                            <span class="card-item-span">{{item.name}}</span>&nbsp;
                            <el-tag type="info" round>{{item.value}}</el-tag>
                        </el-radio-button>
                    </el-radio-group>
                </el-scrollbar>
                <el-button style="width: 100%;" @click="changeScrollHeight(3)">
                    <el-icon>
                        <ArrowDown />
                    </el-icon>
                </el-button>
            </el-card>

            <!-- PhenotypeGroup -->
            <el-card class="box-card">
                <template #header>
                    <div class="card-header" v-for="item in phenotypeGroupList.title" :key="item.name">
                        <span>{{item.name}}</span>&nbsp;
                        <span>{{item.value}}</span>
                    </div>
                </template>
                <el-scrollbar :height="phenoTypeScrollHeight">
                    <el-radio-group v-model="phenoTypeRadio" size="large">
                        <el-radio-button 
                            name="phenoTypeRadio" 
                            :label="item.name"
                            v-for="item in phenotypeGroupList.list" 
                            :key="item.name" 
                            @change="handleBtnChange" 
                            @click="handleClick"
                        >
                            <span class="card-item-span">{{item.name}}</span>&nbsp;
                            <el-tag type="info" round>{{item.value}}</el-tag>
                        </el-radio-button>
                    </el-radio-group>
                </el-scrollbar>
                <el-button style="width: 100%;" @click="changeScrollHeight(4)">
                    <el-icon>
                        <ArrowDown />
                    </el-icon>
                </el-button>
            </el-card>

            <!-- ExpressionOrgans -->
            <el-card class="box-card">
                <template #header>
                    <div class="card-header" v-for="item in expressionOrgansList.title" :key="item.name">
                        <span>{{item.name}}</span>&nbsp;
                        <span>{{item.value}}</span>
                    </div>
                </template>
                <el-scrollbar :height="expressionScrollHeight">
                    <el-radio-group v-model="expressionRadio" size="large" name="expressionOrgans">
                        <el-radio-button 
                            name="expressionRadio" 
                            :label="item.name"
                            v-for="item in expressionOrgansList.list" 
                            :key="item.name" 
                            @change="handleBtnChange" 
                            @click="handleClick"
                        >
                            <span class="card-item-span">{{item.name}}</span>&nbsp;
                            <el-tag type="info" round>{{item.value}}</el-tag>
                        </el-radio-button>
                    </el-radio-group>
                </el-scrollbar>
                <el-button style="width: 100%;" @click="changeScrollHeight(5)">
                    <el-icon>
                        <ArrowDown />
                    </el-icon>
                </el-button>
            </el-card>

            <!-- SubCellular -->
            <el-card class="box-card">
                <template #header>
                    <div class="card-header" v-for="item in subCellularList.title" :key="item.name">
                        <span>{{item.name}}</span>&nbsp;
                        <span>{{item.value}}</span>
                    </div>
                </template>
                <el-scrollbar :height="subCellularScrollHeight">
                    <el-radio-group v-model="subCellularRadio" size="large">
                        <el-radio-button 
                            name="subCellularRadio" 
                            :label="item.name" 
                            v-for="item in subCellularList.list"
                            :key="item.name" 
                            @change="handleBtnChange" 
                            @click="handleClick"
                        >
                            <span class="card-item-span">{{item.name}}</span>&nbsp;
                            <el-tag type="info" round>{{item.value}}</el-tag>
                        </el-radio-button>
                    </el-radio-group>
                </el-scrollbar>
                <el-button style="width: 100%;" @click="changeScrollHeight(6)">
                    <el-icon>
                        <ArrowDown />
                    </el-icon>
                </el-button>
            </el-card>
        </el-col>
        <!-- right table -->
        <el-col :lg="16" :md="11" :offset="1">
            <el-table :data="multipleChoiceList" stripe class="right-table">
                <el-table-column fixed prop="gene" label="Gene" width="180">
                    <template v-slot="{ row }">
                        <a href="" @click.prevent="handleGeneClick(row)" class="underline">{{row.gene}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="scientificName" label="scientificName" width="180" />
                <el-table-column prop="description" label="description" fit />
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
    import { Search } from '@element-plus/icons-vue'
    import { useSearchStore } from '~/store/useSearchStore.js'
    import {ref, computed, watch, watchEffect, toRaw} from 'vue'
    import { ArrowDown } from '@element-plus/icons-vue'
    import router from "~/router/index.js"

    const store = useSearchStore()
    store.getSpeciesMenuListData()
    store.getStressTypeMenuListData()
    store.getGeneFamilyMenuListData()
    store.getPhenoTypeGroupMenuListData()
    store.getExpressionOrgansMenuListData()
    store.getSubCellularMenuListData()

    const speciesFilterList = computed(() => store.speciesDataList)
    const stressTypeList = computed(() => store.stressTypeDataList)
    const geneFamilyList = computed(() => store.geneFamilyDataList)
    const phenotypeGroupList = computed(() => store.phenotypeGroupDataList)
    const expressionOrgansList = computed(() => store.expressionOrgansDataList)
    const subCellularList = computed(() => store.subCellularDataList)
    const multipleChoiceList = computed(() => store.multipleChoiceList)
    // check radio
    let speciesRadio = ref('')
    let stressTypeRadio = ref('')
    let geneFamilyRadio = ref('')
    let phenoTypeRadio = ref('')
    let expressionRadio = ref('')
    let subCellularRadio = ref('')
    let radioOldValArray = ref([])

    let speciesScrollHeight = ref('150px')
    let stressTypeScrollHeight = ref('150px')
    let geneFamilyScrollHeight = ref('150px')
    let phenoTypeScrollHeight = ref('150px')
    let expressionScrollHeight = ref('150px')
    let subCellularScrollHeight = ref('150px')

    const currentPage = ref(1)
    const pageSize = ref(10)
    let pageTotal = ref(1)
    let navInput = ref('')
    let speciesList = ref([])

    // 页面挂载时获取基因大表
    store.getMultipleChoiceListData({
        expressionOrgans: expressionRadio.value,
        geneFamily: geneFamilyRadio.value,
        pageNum: currentPage.value,
        pageSize: pageSize.value,
        phenotype: phenoTypeRadio.value,
        species: speciesRadio.value,
        stressType: stressTypeRadio.value,
        subCellular: subCellularRadio.value
    })

    watch(() => store.recordsCount, () => {
        pageTotal.value = store.recordsCount
    })

    watch(() => store.speciesDataList, () => {
      speciesList.value = toRaw(speciesFilterList.value)
    })
    // 展开/收起面板
    let changeScrollHeight = (value) => {
        switch (value) {
            case 1:
                speciesScrollHeight.value = speciesScrollHeight.value == '' ? '150px' : '600px'
                break
            case 2:
                stressTypeScrollHeight.value = stressTypeScrollHeight.value == '' ? '150px' : ''
                break
            case 3:
                geneFamilyScrollHeight.value = geneFamilyScrollHeight.value == '' ? '150px' : ''
                break
            case 4:
                phenoTypeScrollHeight.value = phenoTypeScrollHeight.value == '' ? '150px' : ''
                break
            case 5:
                expressionScrollHeight.value = expressionScrollHeight.value == '' ? '150px' : ''
                break
            case 6:
                subCellularScrollHeight.value = subCellularScrollHeight.value == '' ? '150px' : ''
                break
        }
    }
    let handleNavChange = (() => {
      if (navInput.value == '') {
        speciesList.value = toRaw(speciesFilterList.value)
        console.log(speciesList.value)
      } else {
        speciesList.value.list = toRaw(speciesFilterList.value.list).filter(item => item.name.indexOf(navInput.value) !== -1)
      }
    })
    watchEffect(() => {
        store.getMultipleChoiceListData({
            expressionOrgans: expressionRadio.value,
            geneFamily: geneFamilyRadio.value,
            pageNum: currentPage.value,
            pageSize: pageSize.value,
            phenotype: phenoTypeRadio.value,
            species: speciesRadio.value,
            stressType: stressTypeRadio.value,
            subCellular: subCellularRadio.value
        })
    })

    //  radio click
    let handleClick = (e) => {
        if (e.target.tagName != 'INPUT') {
            return
        }
        switch (e.target.attributes[2].value) {
            case 'speciesRadio':
                e.target.value == radioOldValArray.value[0] ? speciesRadio.value = '' : radioOldValArray.value[0] = e.target.value
                break
            case 'stressTypeRadio':
                e.target.value == radioOldValArray.value[1] ? stressTypeRadio.value = '' : radioOldValArray.value[1] = e.target.value
                break
            case 'geneFamilyRadio':
                e.target.value == radioOldValArray.value[2] ? geneFamilyRadio.value = '' : radioOldValArray.value[2] = e.target.value
                break
            case 'phenoTypeRadio':
                e.target.value == radioOldValArray.value[3] ? phenoTypeRadio.value = '' : radioOldValArray.value[3] = e.target.value
                break
            case 'expressionRadio':
                e.target.value == radioOldValArray.value[4] ? expressionRadio.value = '' : radioOldValArray.value[4] = e.target.value
                break
            case 'subCellularRadio':
                e.target.value == radioOldValArray.value[5] ? subCellularRadio.value = '' : radioOldValArray.value[5] = e.target.value
                break
        }
    }

    // radio change
    let handleBtnChange = (e, b) => {
        //此处有坑，el - radio点击时触发两次
        if (e.target.tagName != 'INPUT') {
            return
        }
    }
    
    // gene click
    let handleGeneClick = (row) => {
        router.push({
            name: 'geneoverview',
            query: {
                geneName: row.gene
            }
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

    .el-row {
        margin-top: 100px;
    }

    ::v-deep .el-card__header {
        background-color: #d6d9d6;
    }

    ::v-deep .el-card__body {
        padding: 0;
    }

    .el-radio-group {
        display: block;
        height: 100%;
    }

    .el-radio-button {
        display: block;
        height: 50px;
    }

    ::v-deep .el-radio-button__inner {
        width: 100%;
        height: 100%;
    }

    .card-div {
        overflow: scroll;
        height: 150px;
    }

    .infinite-list::-webkit-scrollbar {
        display: none;
    }

    .el-card {
        margin-bottom: 16px;
    }

    .card-item-span {
        @apply float-left;
        padding-top: 4px;
    }

    .el-tag {
        @apply float-right;
    }

    .el-pagination {
        justify-content: center;
        margin-top: 16px;
        width: 100%;
    }
</style>