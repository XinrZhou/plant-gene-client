import { defineStore } from "pinia"
import { reqGetBrowseList, reqGetStressTypeList } from "~/api/index.js"

export const useBrowseStore = defineStore('browse', {
    state: () => {
        return {
            browseDataList: [],
            stressTypeDataList: []
        }
    },
    actions: {
        // browse首页数据
        async getBrowseListData() {
            reqGetBrowseList().then(res => {
                this.browseDataList = res.data
            }).catch(err=>reject(err))
        },

        // browse -- street type详情数据
        async getStressTypeListData() {
            reqGetStressTypeList().then(res => {
                this.stressTypeDataList = res.data
            }).catch(err => reject(err))
        }
    }
})