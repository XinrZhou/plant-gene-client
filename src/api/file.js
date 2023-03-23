// File Managementapi
import axios from "~/api/http"

// Submit 文件上传
export function reqPostUploadFile(data,file) {
    return axios.post(`/file-model/upload? description=${data.description}?emails=${data.emails}?name=${data.name}?organization=?${data.organization}`,file)
}