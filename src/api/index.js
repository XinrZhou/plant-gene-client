import axios from "~/api/http"

// 登录
export function reqLogin(data) {
    return axios.post("/admin/login",data)
}

// 获取用户信息
export function reqGetInfo(){
    return axios.post("/admin/getInfo")
}

// 退出登录
export function reqLogout() {
    return axios.post("/admin/logout")
}

// 更新密码
export function reqUpdatePassword(data) {
    return axios.post("/admin/updatePassword",data)
}

// 获取首页数据
export function reqGetHomeContent() {
    return axios.post("/home-content/homeContent")
}

// Submit 文件上传
export function reqPostUploadFile(data,file) {
    return axios.post(`/file-model/upload?blast=${data.blast}?description=${data.description}?stressType=?${data.stressType}`,file)
}


