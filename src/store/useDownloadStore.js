import { defineStore } from "pinia"
import { 
    reqGetDownStressTypeList, 
    reqGetDownGeneFamilyList, 
    reqGetDownPhenotypeList, 
    reqGetDownSpeciesList, 
    reqGetGeneList, 
    reqDownloadSequence 
} from "~/api/download.js"

export const useDownloadStore = defineStore('download', {
    state: () => {
        return {
            stressTypeList: [], 
            geneFamilyList: [],
            phenotypeList: [],
            speciesList: [],
            geneList: []
        }
    },
    actions: {
        // download -- StressType
        getStressTypeListData() {
            reqGetDownStressTypeList().then(res => {
                this.stressTypeList = res.data['Stress Type']
            }).catch(err => Promise.reject(err))
        },

        // download -- GeneFamily
        getGeneFamilyListData() {
            reqGetDownGeneFamilyList().then(res => {
                this.geneFamilyList = res.data['Gene Family']
            }).catch(err => Promise.reject(err))
        },

        // download -- PhenotypeList
        getPhenotypeListData() {
            reqGetDownPhenotypeList().then(res => {
                this.phenotypeList = res.data['Phenotype Group']
            }).catch(err => Promise.reject(err))
        },

        // download -- Species
        getSpeciesListData() {
            reqGetDownSpeciesList().then(res => {
                this.speciesList = res.data.Species
            }).catch(err => Promise.reject(err))
        },

        // download -- Gene
        getGeneListData(downLoadQuery) {
            reqGetGeneList(downLoadQuery).then(res => {
                this.geneList = res.data
            }).catch(err => Promise.reject(err))
        },

        async downloadSequence(ids) {
            return reqDownloadSequence(ids).then(res => {
                return Promise.resolve(res)
            }).catch(err => Promise.reject(err))
        },

    }
})