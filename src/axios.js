import axios from "axios"
import { ElNotification } from 'element-plus'
import {getToken} from "~/composables/auth.js";
import {toast} from "~/composables/util.js";

const service = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
})
service.interceptors.request.use(function (config) {
    // 往header头自动添加token
    const token = getToken()
    if(token){
        config.headers["token"] = token
    }

    return config;
}, function (error) {
    toast(error.response.data.msg||"请求失败","error")
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let res = response.data
    if(res.code === 200)
        return response.data;
    else
        toast(res.msg,"error")
        // return Promise.reject(res.msg);

}, function (error) {
    console.log(error.response.data.msg)
    toast(error.response.data.msg||"返回数据失败","error")

    return Promise.reject(error);
})
export default service