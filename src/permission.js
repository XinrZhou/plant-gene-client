import router from "~/router";
import {getToken} from "~/composables/auth.js";
import {toast,showFullLoading,hideFullLoading} from "~/composables/util.js";
import store from "~/store/index.js";


//全局前置首位
let hasGetInfo = false
router.beforeEach(async (to,from,next)=>{

    showFullLoading()
    const token = getToken()
    let title = (to.meta.title ? to.meta.title : "") + "-xxxxx"
    document.title = title
    if(token && to.path == "/login"){
        toast("请勿重复登录","error")
        return next({ path:from.path ? from.path : "/login" })
    }
    //登录后，存储信息到vuex里，获取后设为true之后不在获取
    let judge = false
    if(token && !hasGetInfo){
        await store.dispatch("getInfo")
        console.log("=======hasGetInfo为",hasGetInfo)
        hasGetInfo = true
        console.log("修改后=======hasGetInfo为",hasGetInfo)
        judge = true
    }
    judge==true ? next(to.fullPath) :next()

})
// 全局后置守卫
router.afterEach((to, from) => hideFullLoading())