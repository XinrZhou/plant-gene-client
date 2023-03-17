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

// Browse 主页list
export function reqGetBrowseList() {
    return axios.post("/browse-item/listDataType")
}

// Browse stress type详情页list
export function reqGetStressTypeList() {
    return axios.post("/browse-item/listStressType")
}

// Browse stress type详情页各项基因list
export function reqGetStressTypeItemList(data) {
    return axios.post('/search/listGeneByStressName',data)
}

// Browse 根据基因名获取基因概述
export function reqGetGeneOverview(geneName) {
    return axios.get(`/search/getGeneDetails?gene=${geneName}`)
}

// // 获取download模块文件列表
// export function reqGetFileList() {
//     return axios.post('/file-model/list')
// }

// Search 属性list
export function reqGetAttributeList() {
    return axios.post('/searchBrowse/listAttributeCount')
}

// Search 属性详情list
export function reqGetListByAttribute(attrName) {
    return axios.get(`/searchBrowse/listByAttribute?name=${attrName}`)
}

//Search 根据属性和属性详情获取的基因list
export function reqGetListByAttrAndName(data) {
    return axios.post('/searchBrowse/listByAttributeAndName',data)
}