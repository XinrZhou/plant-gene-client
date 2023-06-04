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

export function reqGetGeneByGo(geneName) {
    return axios.get(`/search/getGeneGo?gene=${geneName}`)
}

export function reqGetGeneByKeGG(geneName) {
    return axios.get(`/search/getGeneKeGG?gene=${geneName}`)
}


// Expression Organs
// Browse ExpressionOrgans
export function reqGetExpressionOrgansList() {
    return axios.post('/browseExpressionOrgans/count')
}

// Browse ExpressionOrgans GeneList
export function reqGetExpressionOrgansGeneList(expOrgansQuery) {
    return axios.get(`/browseExpressionOrgans/child?expressOrgans=${expOrgansQuery}`)
}

// SubCellular
// Browse SubCellular
export function reqGetSubcellularList() {
    return axios.post('/browseSubcellular/count')
}

// Browse SubCellular GeneList
export function reqGetSubcellularGeneList(subCellularQuery) {
    return axios.get(`/browseSubcellular/child?subCellular=${subCellularQuery}`)
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
export function reqGetPhenoTypeGeneList(phenotype,phenotypeGroup) {
    return axios.get(`/browsePhenoType/geneList?phenotype=${phenotype}&phenotypeGroup=${phenotypeGroup}`)
}

// Gene Family
// Gene Family -- TFlist
export function reqGetTFGeneFamilyList() {
    return axios.post('/browse-geneFamily/tfGeneFamily')
}

// Gene Family -- NonTFlist
export function reqGetNonTFGeneFamilyList() {
    return axios.post('/browse-geneFamily/nonTfGeneFamily')
}

// Gene Family -- TFDeatil
export function reqGetTFGeneList(geneName) {
    return axios.get(`/browse-geneFamily/tfGeneByFamily?tfGene=${geneName}`)
}

// Gene Family -- NonTFDeatil
export function reqGetNonTFGeneList(geneName) {
    return axios.get(`/browse-geneFamily/nonTfGeneByFamily?nonTfGene=${geneName}`)
}
