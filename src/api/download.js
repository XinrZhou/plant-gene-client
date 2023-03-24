// Download模块api
import axios from "~/api/http"

// Download -- stresstype
export function reqGetDownStressTypeList() {
    return axios.post('/down/stressType')
}

// Download -- species
export function reqGetDownSpeciesList() {
    return axios.post('/down/species')
}

// Download -- phenotype
export function reqGetDownPhenotypeList() {
    return axios.post('/down/phenotype')
}

// Download -- geneFamily
export function reqGetDownGeneFamilyList() {
    return axios.post('/down/geneFamily')
}

// Download -- geneList
export function reqGetGeneList(downLoadQuery) {
    return axios.post('/down/geneList', downLoadQuery)
}

// Download
export function reqDownloadSequence(ids) {
    return axios.post(`/down/geneSequence?ids=${ids}`, null, {
        responseType: 'blob'
    });
}