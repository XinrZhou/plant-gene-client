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
        uploadFile(data,file) {
            reqPostUploadFile(data,file).then(res=>{
                ElMessage({
                    message: 'Upload Successfully!',
                    type: 'success',
                  })
            }).catch(err => Promise.reject(err))
        }
    }
})