import { defineStore } from "pinia"
import { 
    reqGetFuzzySearchList, 
    reqPostMenuSpeciesList,
    reqPostMenuStressTypeList,
    reqPostMenuGeneFamilyList,
    reqPostMenuPhenotypeGroupList, 
    reqPostExpressionOrgansList,
    reqPostMenuSubCellularList,
    reqPostMultipleChoiceList
} from "~/api/search.js"

export const useSearchStore = defineStore('search', {
    state: () => {
        return {
            geneDataList: [], // 基因列表
            searchDataList: [], //模糊查询列表
            speciesDataList: [], // Species 
            stressTypeDataList: [], // StressType
            geneFamilyDataList: [], // GeneFamily
            phenotypeGroupDataList: [], // PhenotypeGroup
            expressionOrgansDataList: [], // ExpressionOrgans
            subCellularDataList: [], // SubCellular
            multipleChoiceList: [], // multipleChoice
            isLoading: true,
            recordsCount: 0,
        }
    },
    actions: {
        // search -- 模糊查询
        getFuzzySearchListData(searchContent) {
            reqGetFuzzySearchList(searchContent).then(res => {
                this.searchDataList = res.data
            }).catch(err => Promise.reject(err))
        },

        // search -- menuList
        getMenuListData() {
            reqPostMenuList().then(res => {
                this.menuDataList = res.data
            }).catch(err => Promise.reject(err))
        },

        // search -- species
        getSpeciesMenuListData() {
            reqPostMenuSpeciesList().then(res => {
                this.speciesDataList = res.data
            }).catch(err => Promise.reject(err))
        },

        // search -- StressType
        getStressTypeMenuListData() {
            reqPostMenuStressTypeList().then(res => {
                this.stressTypeDataList = res.data
            }).catch(err => Promise.reject(err))
        },

        // search -- GeneFamily
        getGeneFamilyMenuListData() {
            reqPostMenuGeneFamilyList().then(res => {
                this.geneFamilyDataList = res.data
            }).catch(err => Promise.reject(err))
        },

        // search -- PhenotypeGroup
        getPhenoTypeGroupMenuListData() {
            reqPostMenuPhenotypeGroupList().then(res => {
                this.phenotypeGroupDataList = res.data
            }).catch(err => Promise.reject(err))
        },

        // search -- ExpressionOrgans
        getExpressionOrgansMenuListData() {
            reqPostExpressionOrgansList().then(res => {
                this.expressionOrgansDataList = res.data
            }).catch(err => Promise.reject(err))
        },

        // search -- SubCellular
        getSubCellularMenuListData() {
            reqPostMenuSubCellularList().then(res => {
                this.subCellularDataList = res.data
            }).catch(err => Promise.reject(err))
        },

        // search -- MultipleChoice
        getMultipleChoiceListData(data) {
            reqPostMultipleChoiceList(data).then(res => {
                this.multipleChoiceList = res.data.records
                this.recordsCount = res.data.total
            }).catch(err => Promise.reject(err))
        }
    }
})