import { createRouter, createWebHashHistory } from "vue-router"
import analysis from "./routes/analysis"
import browse from "./routes/browse"
import download from "./routes/download"
import helps from "./routes/helps"
import search from "./routes/search"
import index from "./routes"

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: 'login',
            path: '/login',
            component: () => import('~/views/Login.vue')
        },
        {
            path: '/',
            component: () => import('~/views/PageLayout.vue'),
            children: [
                ...index,
                ...analysis,
                ...browse,
                ...download,
                ...helps,
                ...search
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('~/views/Error.vue')
        }
    ]
})

// //全局前置首位
// let hasGetInfo = false
// let store = useUserInfoStore()
// router.beforeEach(async (to,from,next)=>{

//     showFullLoading()
//     const token = getToken()
//     let title = (to.meta.title ? to.meta.title : "") + "-xxxxx"
//     document.title = title
//     if(token && to.path == "/login"){
//         toast("请勿重复登录","error")
//         return next({ path:from.path ? from.path : "/login" })
//     }
    
//     let judge = false
//     if(token && !hasGetInfo){
//         await store.dispatch("getInfo")
//         console.log("=======hasGetInfo为",hasGetInfo)
//         hasGetInfo = true
//         console.log("修改后=======hasGetInfo为",hasGetInfo)
//         judge = true
//     }
//     judge==true ? next(to.fullPath) :next()

// })

// // 全局后置守卫
// router.afterEach((to, from) => hideFullLoading())

export default router