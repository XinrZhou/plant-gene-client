import { defineStore } from "pinia";
import {
    reqGetList,
    reqGetBackStageList,
    reqUpdateHelps,
    reqGetHelpsById,
    reqDelHelpsById,
    reqSaveHelps
} from '~/api/helps'

export const useHelpsStore = defineStore('helps', {
    state: () => ({
        helpsList: [],
        backStageHelpsList: [],
        currentHelps: {}
    }),
    actions: {
        async fetchHelpsList() {
            return reqGetList().then(res => {
                this.helpsList = res.data
                return Promise.resolve(res)
            }).catch(err => Promise.reject(err))

        },
        async fetchBackStageHelpsList() {
            return reqGetBackStageList().then(res => {
                this.backStageHelpsList = res.data
                return Promise.resolve(res)
            }).catch(err => Promise.reject(err))

        },
        async updateHelpsById(data) {
            return reqUpdateHelps(data).then(res => {
                return Promise.resolve(res)
            }).catch(err => Promise.reject(err))

        },
        async SaveHelps(data) {
            return reqSaveHelps(data).then(res => {
                return Promise.resolve(res)
            }).catch(err => Promise.reject(err))

        },
        async fetchHelpsById(id) {
            return reqGetHelpsById(id).then(res => {
                return Promise.resolve(res)
            }).catch(err => Promise.reject(err))
        },
        async deleteHelpsById(id) {
            return reqDelHelpsById(id).then(res => {
                return Promise.resolve(res)
            }).catch(err => Promise.reject(err))

        }
    }
})
