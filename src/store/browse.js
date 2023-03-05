import { defineStore } from "pinia"
import { reqGetBrowseList } from "~/api/index.js"

export const browseStore = defineStore('browseInfo', {
    state: () => {
        return {
            browseList: []
        }
    },
    actions: {
        getBrowseList() {
            reqGetBrowseList().then(res => {
                this.browseList = res.data
            }).catch(err=>reject(err))
        }
    }
})