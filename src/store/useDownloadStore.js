import { defineStore } from "pinia"
import { reqGetFileList } from "~/api/index.js"

export const useDownloadStore = defineStore('download', {
    state: () => {
        return {
            fileListData: []
        }
    },
    actions: {
        async getFileListData() {
            reqGetFileList().then(res => {
                console.log(res)
            }).catch(err => new Promise(new Error(err)))
        }
    }
})