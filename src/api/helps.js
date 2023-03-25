// Helps Managementapi
import axios from "~/api/http"

// Submit 文件上传
export function reqGetList() {
    return axios.post("/helps/getList");
}

export function reqGetBackStageList() {
    return axios.post('/helps/getBackStageList');
}

export function reqUpdateHelps(data) {
    console.log(data)
    return axios.post('/helps/updateHelps', data);
}

export function reqSaveHelps(data) {
    console.log(data)
    return axios.post('/helps/saveHelps', data);
}

export function reqGetHelpsById(id) {
    return axios.get(`/helps/getHelpsById?id=${id}`);
}

export function reqDelHelpsById(id) {
    return axios.get(`/helps/delHelpsById?id=${id}`);
}