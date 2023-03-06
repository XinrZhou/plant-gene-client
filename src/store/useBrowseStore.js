import { defineStore } from "pinia"
import { reqGetBrowseList } from "~/api/index.js"

export const useBrowseStore = defineStore('browse', {
    state: () => {
        return {
            browseDataList: []
        }
    },
    actions: {
        async getBrowseListData() {
            reqGetBrowseList().then(res => {
                this.browseDataList = res.data
            }).catch(err=>reject(err))
        }
    }
})