import axios from "axios"
import { getToken } from "~/composables/auth.js"
import { toast } from "~/composables/util.js"
import { useRouter } from "vue-router"

const router = useRouter()

const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 20000
})

service.defaults.baseURL = '/PlantASRG/api'

// 请求拦截器
service.interceptors.request.use(function (config) {
    const isBackendRoute = config.url.includes("/admin"); // 检查是否为后端管理页面的路由路径
    if (isBackendRoute) {
        const token = getToken()
        config.headers["token"] = token;
    }
    return config;
}, function (error) {
    toast(error.response.data.msg || "The request failed", "error")
    return Promise.reject(error);
});

// 响应拦截器
service.interceptors.response.use(function (response) {
    const contentDisposition = response.headers['content-disposition'];
    if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
        // 处理文件流响应
        return response;
    }
    let res = response.data
    if (res && res.code === 200)
        return response.data;
    if (res && res.code === 401)
        router.push("/login").catch(() => { })
    toast(res.msg, "error")
    return Promise.reject(res.msg);
}, function (error) {
    console.log(error.response.data.msg)
    toast(error.response.data.msg || "The request failed, the server is under maintenance!", "error")
    return Promise.reject(error);
})
// 为特定请求设置单独的超时时间
export const specialRequest = (timeout) => {
    const specialService = axios.create({
        baseURL: import.meta.env.VITE_BASE_URL,
        timeout: timeout
    })
    // 设置默认的baseURL
    specialService.defaults.baseURL = '/api'
    // 返回单独的axios实例
    return specialService;
}
export default service
