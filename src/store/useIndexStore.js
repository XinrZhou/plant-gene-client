import { defineStore } from "pinia"
import { reqGetHomeContent } from "~/api/index.js"

export const useIndexStore = defineStore('index', {
    state: () => {
        return {
            homeContentData: {} // index 页面数据
        }
    },
    actions: {
        //index -- 获取页面动态数据
        getHomeContentData() {
            reqGetHomeContent().then(res=>{
                this.homeContentData = res.data
            }).catch(err => new Promise(new Error(err)))
        }
    }
})