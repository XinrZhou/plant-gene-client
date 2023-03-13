import axios from "~/api/http"

// 登录
export function reqLogin(username,password) {
    return axios.post("/admin/login",{
        username,password
    })
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

// 获取Browse主页列表
export function reqGetBrowseList() {
    return axios.post("/browse-item/listDataType")
}

// 获取Browse页面stress type详情页列表
export function reqGetStressTypeList() {
    return axios.post("/browse-item/listStressType")
}

// 获取Browse页面stress type详情页各项基因list
export function reqGetStressTypeItemList(data) {
    return axios.post({
        url: '/search/listGeneByStressName',
        data
    })
}