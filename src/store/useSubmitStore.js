import { defineStore } from "pinia"
import {
    reqPostUploadFile,
    reqPostUploadBlastSeq,
    reqPostUploadBlastFile
} from "~/api/file.js"
import { ElMessageBox, ElMessage } from 'element-plus'

export const useSubmitStore = defineStore('submit', {
    state: () => {
        return {
            BlastSeqDataList: {}
        }
    },
    actions: {
        //submit -- 上传数据
        async uploadFile(data,file) {
            return reqPostUploadFile(data,file).then(res=>{
                return Promise.resolve()
            }).catch(err => Promise.reject(err))
        },
        async reqPostUploadBlastSeq(data) {
            return reqPostUploadBlastSeq(data).then(res=>{
                this.BlastSeqDataList = res.data
                return Promise.resolve()
            }).catch(err => Promise.reject(err))
        },
        async reqPostUploadBlastFile(data,file) {
            return reqPostUploadBlastFile(data,file).then(res=>{
                return Promise.resolve()
            }).catch(err => Promise.reject(err))
        }

    }
})