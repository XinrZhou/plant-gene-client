import { defineStore } from "pinia"
import { reqGetInfo, reqLogin } from "~/api/index.js"
import { removeToken, setToken } from "~/composables/auth.js"

export const useUserInfoStore = defineStore('userInfo', {
    state: () => {
        return {
            user: {}
        }
    },
    actions: {
        // 登录
        login(data) {
            reqLogin(data).then(res => {
                setToken(res.data.token)
            }).catch(err => new Promise(new Error(err)))
        },

        // 获取当前用户信息
        getInfo() {
            reqGetInfo().then(res => {
                this.user = res.data
            }).catch(err => new Promise(new Error(err)))
        },

        // 退出登录
        logout() {
            removeToken()
            this.user = {}
        }

    }
})