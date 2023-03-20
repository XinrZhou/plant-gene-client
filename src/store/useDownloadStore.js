import { defineStore } from "pinia"
import { reqGetFileList } from "~/api/index.js"

export const useDownloadStore = defineStore('download', {
    state: () => {
        return {
            fileListData: [] // 文件列表
        }
    },
    actions: {
        getFileListData() {
            reqGetFileList().then(res => {
                console.log(res)
            }).catch(err => Promise.reject(err))
        }
    }
})