import { createRouter, createWebHashHistory } from "vue-router"
import analysis from "./routes/analysis"
import browse from "./routes/browse"
import download from "./routes/download"
import helps from "./routes/helps"
import search from "./routes/search"
import submit from "./routes/submit"
import backend from "./routes/backend"
import index from "./routes"
import {useCookies} from "@vueuse/integrations/useCookies";
import {getToken} from "~/composables/auth.js";


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: 'login',
            path: '/login',
            component: () => import('~/views/Login.vue')
        },
        {
            name: 'frontLayout',
            path: '/',
            component: () => import('~/views/PageLayout.vue'),
            children: [
                ...index,
                ...analysis,
                ...browse,
                ...download,
                ...helps,
                ...search,
                ...submit
            ]
        },
        {
            name: 'admin',
            path: '/admin',
            component: () => import('~/layouts/components/backend/AdminLayout.vue'),
            children: [
                ...backend
            ]
        },
        {
            name: 'NotFound',
            path: '/:pathMatch(.*)*',
            component: () => import('~/views/Error.vue')
        }
    ]
})

//全局前置首位
let hasGetInfo = false;
router.beforeEach(async (to, from, next) => {
    let title = (to.meta.title ? to.meta.title : "") + "-plantasrg";
    document.title = title;
    // 判断是否后台，后台需要登陆
    if(to.meta.requiresAuth){
        const cookie = useCookies()
        const userInfo = cookie.get("userInfo")
        const token = getToken()
        if(!token || !userInfo){
            next({ path: "/login" });
        }
    }
    next();
});

// 全局后置守卫
// router.afterEach((to, from) => hideFullLoading())

export default router