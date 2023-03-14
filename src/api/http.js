import axios from "axios"
import { getToken } from "~/composables/auth.js"
import { toast } from "~/composables/util.js"
import { useRouter } from "vue-router"

const router = useRouter()

const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 20000
})

// 请求拦截器
service.interceptors.request.use(function (config) {
    const token = getToken()
    if (token) {
        config.headers["token"] = token
    }
    return config;
}, function (error) {
    toast(error.response.data.msg || "请求失败", "error")
    return Promise.reject(error);
});

// 响应拦截器
service.interceptors.response.use(function (response) {
    let res = response.data
    if (res.code === 200)
        return response.data;
    if (res.code === 401)
        router.push("/login").catch(() => { })
    toast(res.msg, "error")
    return Promise.reject(res.msg);
}, function (error) {
    console.log(error.response.data.msg)
    toast(error.response.data.msg || "服务器维护中请求失败", "error")
    return Promise.reject(error);
})
export default service