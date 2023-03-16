import { defineStore } from "pinia"
import { reqGetAttributeList, reqGetListByAttribute, reqGetListByAttrAndName} from "~/api/index.js"

export const useSearchStore = defineStore('search', {
    state: () => {
        return {
            attributeDataList: [],
            attrDetailDataList: [],
            dataList: [],
            isLoading: true
        }
    },
    actions: {
        getAttributeListData() {
            reqGetAttributeList().then(res => {
                this.attributeDataList = res.data
            }).catch(err => new Promise(new Error(err)))
        },

        getAttrDetailListData(attrName) {
            this.isLoading = true
            reqGetListByAttribute(attrName).then(res => {
                this.attrDetailDataList = res.data
                this.isLoading = false
            }).catch(err => new Promise(new Error(err)))
        },

        getListData(data) {
            reqGetListByAttrAndName(data).then(res => {
                this.dataList = res.data.records
            }).catch(err => new Promise(new Error(err)))
        }
    }
})