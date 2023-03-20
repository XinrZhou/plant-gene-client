import { defineStore } from "pinia"
import { reqGetAttributeList, reqGetListByAttribute, reqGetListByAttrAndName, reqGetFuzzySearchList, reqGetListBySearchRes} from "~/api/index.js"

export const useSearchStore = defineStore('search', {
    state: () => {
        return {
            attributeDataList: [], // 属性列表
            attrDetailDataList: [],// 属性详情列表
            geneDataList: [], // 基因列表
            searchDataList: [], //模糊查询列表
            isLoading: true,
            recordsCount: 0
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
        }
    }
})