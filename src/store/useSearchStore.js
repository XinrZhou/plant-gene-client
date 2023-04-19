import { defineStore } from "pinia"
import { 
    reqGetAttributeList, 
    reqGetListByAttribute, 
    reqGetListByAttrAndName, 
    reqGetFuzzySearchList, 
    reqGetListBySearchRes,
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
            attributeDataList: [], // 属性列表
            attrDetailDataList: [],// 属性详情列表
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
        // search -- 获取属性列表
        getAttributeListData() {
            reqGetAttributeList().then(res => {
                this.attributeDataList = res.data
            }).catch(err => Promise.reject(err))
        },

        // search -- 获取属性详情列表
        getAttrDetailListData(attrName) {
            this.isLoading = true
            reqGetListByAttribute(attrName).then(res => {
                this.attrDetailDataList = res.data
                this.isLoading = false
            }).catch(err => Promise.reject(err))
        },

        // search -- 根据属性和属性详情获取基因列表
        getListData(data) {
            reqGetListByAttrAndName(data).then(res => {
                this.geneDataList = res.data.records
            }).catch(err => Promise.reject(err))
        },

        // search -- 模糊查询
        getFuzzySearchListData(searchContent) {
            reqGetFuzzySearchList(searchContent).then(res => {
                this.searchDataList = res.data.list
            }).catch(err => Promise.reject(err))
        },

        // search -- 根据模糊查询结果获取数据 
        getListDataByFuzzyRes(data) {
            reqGetListBySearchRes(data).then(res => {
                this.geneDataList = res.data.list.records
                this.recordsCount = res.data.list.total
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