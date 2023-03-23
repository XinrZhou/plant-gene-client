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
        async login(data) {
            try {
                const res = await reqLogin(data)
                setToken(res.data.token)
                return Promise.resolve()
            } catch (err) {
                return Promise.reject(err)
            }
        },

        // 获取当前用户信息
        getInfo() {
            reqGetInfo().then(res => {
                this.user = res.data
            }).catch(err => Promise.reject(err))
        },

        // 退出登录
        logout() {
            removeToken()
            this.user = {}
        }

    }
})