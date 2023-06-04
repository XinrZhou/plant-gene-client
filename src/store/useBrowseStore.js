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
    reqGetExpressionOrgansGeneList,
    reqGetSubcellularList,
    reqGetSubcellularGeneList,
    reqGetPhenoTypeList,
    reqGetPhenoTypeSubList,
    reqGetPhenoTypeGeneList,
    reqGetTFGeneFamilyList,
    reqGetNonTFGeneFamilyList,
    reqGetTFGeneList,
    reqGetNonTFGeneList, reqGetGeneByGo, reqGetGeneByKeGG
} from "~/api/browse.js"

export const useBrowseStore = defineStore('browseStore', {
    state: () => {
        return {
            browseDataList: [], // 首页列表
            stressTypeDataList: [], // stress type详情页list
            stressTypeItemDataList: [], // stress type详情页各项基因list
            itemPageTotal: 1,
            geneOverviewDataList: {}, // 基因概述列表
            geneKeGGList:[],
            geneGoList:[],
            speciesDataList: [], // 物种名列表
            geneDataList: [], //基因列表
            expOrgansDataList: [], 
            expOrgansGeneDataList: [],
            subcellularDataList: [], 
            subcellularGeneDataList: [],
            phenoTypeDataList: [],
            phenoTypeSubDataList: [],
            phenoTypeGeneDataList: [],
            tFGeneFamilyDataList: [],
            nonTFGeneFamilyDataList: [],
            tFGeneDataList: [],
            nonTFGeneDataList: [],
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

        // browse -- 根据基因名获取基因KeGG
        getGeneByKeGGData(geneName) {
            reqGetGeneByKeGG(geneName).then(res => {
                this.geneKeGGList = res.data
            }).catch(err => Promise.reject(err))
        },

        // browse -- 根据基因名获取基因Go
        getGeneByGoData(geneName) {
            reqGetGeneByGo(geneName).then(res => {
                this.geneGoList = res.data
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
            }).catch(err => Promise.reject(err))
        },

        // browse -- ExpressionOrgans
        getExpressionListData() {
            reqGetExpressionOrgansList().then(res => {
                this.expOrgansDataList = res.data
            }).catch(err => Promise.reject(err))
        },

        // browse -- ExpressionOrgans GeneList
        getExpressionGeneListData(expOrgansQuery) {
            reqGetExpressionOrgansGeneList(expOrgansQuery).then(res => {
                this.expOrgansGeneDataList = res.data
            }).catch(err => Promise.reject(err))
        },

         // browse -- Subcellular
         getSubcellularListData() {
            reqGetSubcellularList().then(res => {
                this.subcellularDataList = res.data
            }).catch(err => Promise.reject(err))
        },

        // browse -- Subcellular GeneList
        getSubcellularGeneListData(subcellularQuery) {
            reqGetSubcellularGeneList(subcellularQuery).then(res => {
                this.subcellularGeneDataList = res.data
            }).catch(err => Promise.reject(err))
        },

        // browse -- PhenoTypeList
        getPhenoTypeListData() {
            reqGetPhenoTypeList().then(res => {
                this.phenoTypeDataList = res.data
            }).catch(err => Promise.reject(err))
        }, 

        // browse -- PhenoTypeSubList
        getPhenoTypeSubListData(name) {
            this.isLoading = true
            reqGetPhenoTypeSubList (name).then(res => {
                this.phenoTypeSubDataList = res.data
                this.isLoading = false
            }).catch(err => Promise.reject(err))
        }, 

        // browse -- PhenoType geneList
        getPhenoGeneListData(phenotypeQuery) {
            reqGetPhenoTypeGeneList(phenotypeQuery).then(res => {
                this.phenoTypeGeneDataList = res.data
            }).catch(err => Promise.reject(err))
        },

        // browse -- GeneFamily TFList
        getTFGeneFamilyList() {
            reqGetTFGeneFamilyList().then(res => {
                this.tFGeneFamilyDataList = res.data
            }).catch(err => Promise.reject(err))
        },

        // browse -- GeneFamily NonTFList
        getNonTFGeneFamilyList() {
            reqGetNonTFGeneFamilyList().then(res => {
                this.nonTFGeneFamilyDataList = res.data
            }).catch(err => Promise.reject(err))
        },

         // browse -- GeneFamily TFGeneDeatil
         async getTFGeneList(geneName) {
            reqGetTFGeneList(geneName).then(res => {
                this.tFGeneDataList = res.data
            }).catch(err => Promise.reject(err))
        },

        // browse -- GeneFamily TFGeneDeatil
        async getNonTFGeneList(geneName) {
            reqGetNonTFGeneList(geneName).then(res => {
                this.nonTFGeneDataList = res.data
            }).catch(err => Promise.reject(err))
        }
    }
})