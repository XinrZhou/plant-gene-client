import { defineStore } from "pinia"
import { reqPostUploadFile } from "~/api/file.js"
import { ElMessageBox, ElMessage } from 'element-plus'

export const useSubmitStore = defineStore('submit', {
    state: () => {
        return {
        }
    },
    actions: {
        //submit -- 上传数据
        async uploadFile(data,file) {
            return reqPostUploadFile(data,file).then(res=>{
                return Promise.resolve()
            }).catch(err => Promise.reject(err))
        }
    }
})