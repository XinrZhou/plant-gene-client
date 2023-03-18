import { async } from "@kangc/v-md-editor"
import { defineStore } from "pinia"
import { reqGetBrowseList, reqGetStressTypeList, reqGetStressTypeItemList, reqGetGeneOverview } from "~/api/index.js"

export const useBrowseStore = defineStore('browseStore', {
    state: () => {
        return {
            browseDataList: [], // 首页列表
            stressTypeDataList: [], // stress type详情页list
            stressTypeItemDataList: [], // stress type详情页各项基因list
            itemPageTotal: 1,
            geneOverviewDataList: {} // 基因概述列表
        }
    },
    actions: {
        // browse -- 首页数据
        getBrowseListData() {
            reqGetBrowseList().then(res => {
                this.browseDataList = res.data
            }).catch(err => new Promise(new Error(err)))
        },

        // browse -- street type详情数据
        getStressTypeListData() {
            reqGetStressTypeList().then(res => {
                this.stressTypeDataList = res.data
            }).catch(err => new Promise(new Error(err)))
        },

        // browse -- stress type详情页各项基因list
        getStressTypeListItemData(data) {
            reqGetStressTypeItemList(data).then(res => {
                this.stressTypeItemDataList = res.data.records
                this.itemPageTotal = res.data.total
                console.log(res)
            }).catch(err => new Promise(new Error(err)))
        },

        // browse -- 根据基因名获取基因概述
        getGeneOverviewData(geneName) {
            reqGetGeneOverview(geneName).then(res => {
                this.geneOverviewDataList = res.data
            }).catch(err => new Promise(new Error(err)))
        }
    }
})