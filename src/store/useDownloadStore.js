import { defineStore } from "pinia"
import { reqGetDownStressTypeList, reqGetDownGeneFamilyList, reqGetDownPhenotypeList, reqGetDownSpeciesList, reqGetGeneList, reqDownloadSequence } from "~/api/index.js"

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
        getStressTypeListData() {
            reqGetDownStressTypeList().then(res => {
                this.stressTypeList = res.data['Stress Type']
            })
        },

        getGeneFamilyListData() {
            reqGetDownGeneFamilyList().then(res => {
                this.geneFamilyList = res.data['Gene Family']
            })
        },

        getPhenotypeListData() {
            reqGetDownPhenotypeList().then(res => {
                this.phenotypeList = res.data['Phenotype Group']
            })
        },

        getSpeciesListData() {
            reqGetDownSpeciesList().then(res => {
                this.speciesList = res.data.Species
            })
        },

        getGeneListData(downLoadQuery) {
            reqGetGeneList(downLoadQuery).then(res => {
                this.geneList = res.data
            })
        },

        downloadSequence(ids) {
            reqDownloadSequence(ids).then(res => {
                console.log(res)
            })
        }
    }
})