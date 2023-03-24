import { defineStore } from "pinia"
import { reqGetInfo, reqLogin } from "~/api/index.js"
import { removeToken, setToken } from "~/composables/auth.js"
import {useCookies} from "@vueuse/integrations/useCookies";
export const useUserInfoStore = defineStore('userInfo', {
    state: () => {
        return {
            user: {}
        }
    },
    actions: {
        // 登录
        async login(data) {
            return reqLogin(data)
                .then(res => {
                    setToken(res.data.token)
                    return Promise.resolve()
                })
                .catch(err => Promise.reject(err))
        },
        // 获取当前用户信息
        getInfo() {
            return reqGetInfo().then(res => {
                const cookie = useCookies()
                this.user = res.data
                cookie.set("userInfo", this.user) // 将用户信息存入cookie中
            }).catch(err => Promise.reject(err))
        },

        // 退出登录
        logout() {
            removeToken()
            const cookie = useCookies()
            cookie.remove("userInfo")
            this.user = {}
        }

    }
})