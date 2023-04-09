// File Managementapi
import axios from "~/api/http"

// Submit 文件上传
export function reqPostUploadFile(data,file) {
    return axios.post(`/file-model/upload?description=${data.description}&emails=${data.emails}&name=${data.name}&organization=${data.organization}`,file)

}

export function reqPostFilesList(data) {
    return axios.post("/file-model/list",data)
}

export function reqGetDownFiles(id) {
    return axios.get(`/file-model/download?id=${id}`,{
        responseType: 'blob'
    });
}

export function reqPostStaticCount() {
    return axios.post(`/file-model/staticCount`)

}
