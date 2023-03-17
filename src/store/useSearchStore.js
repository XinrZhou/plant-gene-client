import { defineStore } from "pinia"
import { reqGetAttributeList, reqGetListByAttribute, reqGetListByAttrAndName} from "~/api/index.js"

export const useSearchStore = defineStore('search', {
    state: () => {
        return {
            attributeDataList: [], // 属性列表
            attrDetailDataList: [],// 属性详情列表
            geneDataList: [], // 基因列表
            isLoading: true 
        }
    },
    actions: {
        // search -- 获取属性列表
        getAttributeListData() {
            reqGetAttributeList().then(res => {
                this.attributeDataList = res.data
            }).catch(err => new Promise(new Error(err)))
        },

        // search -- 获取属性详情列表
        getAttrDetailListData(attrName) {
            this.isLoading = true
            reqGetListByAttribute(attrName).then(res => {
                this.attrDetailDataList = res.data
                this.isLoading = false
            }).catch(err => new Promise(new Error(err)))
        },

        // search -- 根据属性和属性详情获取基因列表
        getListData(data) {
            reqGetListByAttrAndName(data).then(res => {
                this.geneDataList = res.data.records
            }).catch(err => new Promise(new Error(err)))
        }
    }
})