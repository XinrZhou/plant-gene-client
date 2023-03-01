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
    if(!token&&to.path != "/login"){
        // console.log("11111")
        toast("请先登录","error")
        next({path:"/login"})
    }
    if(token && to.path == "/login"){
        toast("请勿重复登录","error")
        return next({ path:from.path ? from.path : "/login" })
    }
    let judge = false
    if(token && !hasGetInfo){
        await store.dispatch("getInfo")
        hasGetInfo = true
        judge = true
    }
    judge==true ? next(to.fullPath) :next()

})
// 全局后置守卫
router.afterEach((to, from) => hideFullLoading())