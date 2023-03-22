// Browse模块api
import axios from "~/api/http"

// Browse 主页list
export function reqGetBrowseList() {
    return axios.post("/browse-item/listDataType")
}

// Stress Type
// Browse stress type详情页list
export function reqGetStressTypeList() {
    return axios.post("/browse-item/listStressType")
}

// Browse stress type详情页各项基因list
export function reqGetStressTypeItemList(data) {
    return axios.post('/search/listGeneByStressName', data)
}

// Browse 根据基因名获取基因概述
export function reqGetGeneOverview(geneName) {
    return axios.get(`/search/getGeneDetails?gene=${geneName}`)
}


// Expression Organs
// Browse ExpressionOrgans各表达器官对应的数量
export function reqGetExpressionOrgansList() {
    return axios.post('/browseExpressionOrgans/count')
}

// Browse ExpressionOrgans子器官列表
export function reqGetSubExpressionOrgansList() {
    return axios.post('/browseExpressionOrgans/child')
}


// Species
// Species -- SpeciesNameList
export function reqGetSpeciesList() {
    return axios.post('/browseSpecies/count')
}

// Species -- SpeciesGeneList
export function reqGetGeneListBySciName(scientificName) {
    return axios.get(`/browseSpecies/geneList?scientificName=${scientificName}`)
}


// PhenoType
// PhenoType -- PhenoTypeList
export function reqGetPhenoTypeList() {
    return axios.post('/browsePhenoType/listCount')
}

// PhenoType -- PhenoTypeSubList
export function reqGetPhenoTypeSubList(name) {
    return axios.get(`/browsePhenoType/listcountByPhenotype?name=${name}`)
}

// PhenoType -- GeneList
export function reqGetPhenoTypeGeneList(phenotypeQuery) {
    return axios.post('/browsePhenoType/geneList',phenotypeQuery)
}
