import {
    createRouter,
    createWebHashHistory
} from "vue-router";

import Login from "~/pages/Login.vue";
import NotFound from "~/pages/404.vue";
import Home from "~/pages/Home.vue";
import Test from "~/pages/Test.vue";
import Admin from "~/layouts/Admin.vue"

import User from "~/pages/admin/user/list.vue";
import AdminHome from "~/pages/AdminHome.vue";

const routes = [{
    path: '/login',
    name: '登录页',
    component: Login,
    meta: {
        title: "登录页"
    }
},, {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
        title: "Home"
    },

},  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
        title: "未开发"
    },

}, {
    path: '/',
    name: '后台Layout',
    component: Admin,
    children: [
    {
        path: '/admin',
        component: AdminHome,
        meta: {
            title: "测试"
        }
    },{
        path: '/admin/test',
        component: Test,
        meta: {
            title: "测试"
        }
    }, {
        path: '/admin/user',
        component: User,
        meta: {
            title: "用户管理"
        }
    }]

}
]

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

export default router