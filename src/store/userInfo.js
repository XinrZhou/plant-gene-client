import { defineStore } from "pinia"
import { reqGetInfo, reqLogin } from "~/api/index.js"
import { removeToken, setToken } from "~/composables/auth.js"

export const userInfoStore = defineStore('userInfo', {
    state: () => {
        return {
            user: {}
        }
    },
    actions: {
        // 登录
        async login(data) {
            reqLogin(data).then(res => {
                setToken(res.data.token)
            }).catch(err => reject(err))
        },

        // 获取当前用户信息
        async getInfo() {
            reqGetInfo().then(res => {
                this.user = res.data
            }).catch(err => reject(err))
        },

        // 退出登录
        logout() {
            removeToken()
            this.user = {}
        }

    }
})