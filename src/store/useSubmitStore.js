import { defineStore } from "pinia"
import { reqPostUploadFile } from "~/api/index.js"

export const useSubmitStore = defineStore('submit', {
    state: () => {
        return {
        }
    },
    actions: {
        //submit -- 上传数据
        uploadFile(data,file) {
            reqPostUploadFile(data,file).then(res=>{
                console.log(res)
            }).catch(err => Promise.reject(err))
        }
    }
})