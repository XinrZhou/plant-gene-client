import { async } from "@kangc/v-md-editor"
import { defineStore } from "pinia"
import { reqGetBrowseList, reqGetStressTypeList, reqGetStressTypeItemList } from "~/api/index.js"

export const useBrowseStore = defineStore('browse', {
    state: () => {
        return {
            browseDataList: [],
            stressTypeDataList: [],
            stressTypeItemDataList: []
        }
    },
    actions: {
        // browse首页数据
        async getBrowseListData() {
            reqGetBrowseList().then(res => {
                this.browseDataList = res.data
            }).catch(err => new Promise(new Error(err)))
        },

        // browse -- street type详情数据
        async getStressTypeListData() {
            reqGetStressTypeList().then(res => {
                this.stressTypeDataList = res.data
            }).catch(err => new Promise(new Error(err)))
        },

        // browse -- stress type详情页各项基因list
        async getStressTypeListItemData(data) {
            reqGetStressTypeItemList(data).then(res => {
                this.stressTypeItemDataList = res.data.records
            }).catch(err => new Promise(new Error(err)))
        }
    }
})