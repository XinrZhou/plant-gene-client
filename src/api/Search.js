// Search模块api
import axios from "~/api/http"

// search 模糊查询
export function reqGetFuzzySearchList(searchContent) {
    return axios.post(`/searchBrowse/searchTips?searchContent=${searchContent}`)
}

// search MenuList -- Species
export function reqPostMenuSpeciesList() {
    return axios.post('searchBrowse/MenuSpecies')
}

// search MenuList -- StressType
export function reqPostMenuStressTypeList() {
    return axios.post('searchBrowse/menuStressType')
}

// search MenuList -- GeneFamily
export function reqPostMenuGeneFamilyList() {
    return axios.post('searchBrowse/menuGeneFamily')
}

// search MenuList -- PhenotypeGroup
export function reqPostMenuPhenotypeGroupList() {
    return axios.post('searchBrowse/menuPhenotypeGroup')
}

// search MenuList -- ExpressionOrgans
export function reqPostExpressionOrgansList() {
    return axios.post('searchBrowse/menuExpressionOrgans')
}

// search MenuList -- SubCellular
export function reqPostMenuSubCellularList() {
    return axios.post('searchBrowse/menuSubCellular')
}

// search -- multipleChoice
export function reqPostMultipleChoiceList(data) {
    return axios.post('searchBrowse/listByMultipleChoice',data)
}