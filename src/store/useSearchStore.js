import { defineStore } from "pinia"
import { reqGetAttributeList } from "~/api/index.js"

export const useSearchStore = defineStore('search', {
    state: () => {
        return {
            attributeDataList: []
        }
    },
    actions: {
        async getAttributeListData() {
            reqGetAttributeList().then(res=>{
                this.attributeDataList = res.data
                console.log(res)
            }).catch(err => new Promise(new Error(err)))
        }
    }
})