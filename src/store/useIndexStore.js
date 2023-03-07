import { defineStore } from "pinia"
import { reqGetHomeContent } from "~/api/index.js"

export const useIndexStore = defineStore('index', {
    state: () => {
        return {
            homeContentData: {}
        }
    },
    actions: {
        async getHomeContentData() {
            reqGetHomeContent().then(res=>{
                this.homeContentData = res.data
            }).catch(err => reject(err))
        }
    }
})