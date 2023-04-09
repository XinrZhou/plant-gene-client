// Search模块api
import axios from "~/api/http"

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

// search 模糊查询
export function reqGetFuzzySearchList(searchContent) {
    return axios.post(`/searchBrowse/searchTips?searchContent=${searchContent}`)
}

// search 根据模糊查询结果获取数据
export function reqGetListBySearchRes(data) {
    return axios.post('/searchBrowse/search',data)
}

// search 大菜单
export function reqPostMenuList() {
    return axios.post('searchBrowse/searchMenu')
}