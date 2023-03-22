// Download模块api
import axios from "~/api/http"

// Download -- stresstype
export function reqGetDownStressTypeList() {
    return axios.post('/browseSubcellular/stressType')
}

// Download -- species
export function reqGetDownSpeciesList() {
    return axios.post('/browseSubcellular/species')
}

// Download -- phenotype
export function reqGetDownPhenotypeList() {
    return axios.post('/browseSubcellular/phenotype')
}

// Download -- geneFamily
export function reqGetDownGeneFamilyList() {
    return axios.post('/browseSubcellular/geneFamily')
}

// Download -- geneList
export function reqGetGeneList(downLoadQuery) {
    return axios.post('/browseSubcellular/geneList', downLoadQuery)
}

// Download
export function reqDownloadSequence(ids) {
    return axios.post(`/browseSubcellular/geneSequence?ids=${ids}`)
}