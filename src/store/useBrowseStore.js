import { async } from "@kangc/v-md-editor"
import { defineStore } from "pinia"
import { 
    reqGetBrowseList, 
    reqGetStressTypeList, 
    reqGetStressTypeItemList, 
    reqGetGeneOverview, 
    reqGetSpeciesList, 
    reqGetGeneListBySciName, 
    reqGetExpressionOrgansList,
    reqGetPhenoTypeList,
    reqGetPhenoTypeSubList,
    reqGetPhenoTypeGeneList 
} from "~/api/browse.js"

export const useBrowseStore = defineStore('browseStore', {
    state: () => {
        return {
            browseDataList: [], // 首页列表
            stressTypeDataList: [], // stress type详情页list
            stressTypeItemDataList: [], // stress type详情页各项基因list
            itemPageTotal: 1,
            geneOverviewDataList: {}, // 基因概述列表
            speciesDataList: [], // 物种名列表
            geneDataList: [], //基因列表
            expOrgansDataList: [], //表达器官列表,
            phenoTypeDataList: [],
            phenoTypeSubDataList: [],
            phenoTypeGeneDataList: [],
            isLoading: true
        }
    },
    actions: {
        // browse -- 首页数据
        getBrowseListData() {
            reqGetBrowseList().then(res => {
                this.browseDataList = res.data
            }).catch(err => Promise.reject(err))
        },

        // browse -- street type详情数据
        getStressTypeListData() {
            reqGetStressTypeList().then(res => {
                this.stressTypeDataList = res.data
            }).catch(err => Promise.reject(err))
        },

        // browse -- stress type详情页各项基因list
        getStressTypeListItemData(data) {
            reqGetStressTypeItemList(data).then(res => {
                this.stressTypeItemDataList = res.data.records
                this.itemPageTotal = res.data.total
            }).catch(err => Promise.reject(err))
        },

        // browse -- 根据基因名获取基因概述
        getGeneOverviewData(geneName) {
            reqGetGeneOverview(geneName).then(res => {
                this.geneOverviewDataList = res.data
            }).catch(err => Promise.reject(err))
        },

        // browse -- species获取物种名称
        getSpeciesListData() {
            reqGetSpeciesList().then(res => {
                this.speciesDataList = res.data
            }).catch(err => Promise.reject(err))
        },

        // browse -- species获取基因名称
        getGeneListDataBySciName(scientificName) {
            reqGetGeneListBySciName(scientificName).then(res => {
                this.geneDataList = res.data
            })
        },

        // browse -- expressionOrgans
        getExpressionListData() {
            reqGetExpressionOrgansList().then(res => {
                this.expOrgansDataList = res.data
            })
        },

        // browse -- PhenoTypeList
        getPhenoTypeListData() {
            reqGetPhenoTypeList().then(res => {
                this.phenoTypeDataList = res.data
            })
        }, 

        // browse -- PhenoTypeSubList
        getPhenoTypeSubListData(name) {
            this.isLoading = true
            reqGetPhenoTypeSubList (name).then(res => {
                this.phenoTypeSubDataList = res.data
                this.isLoading = false
            })
        }, 

        getPhenoGeneListData(phenotypeQuery) {
            reqGetPhenoTypeGeneList(phenotypeQuery).then(res => {
                this.phenoTypeGeneDataList = res.data
            })
        }
    }
})