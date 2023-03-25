import { createRouter } from "vue-router"

export default [
    {
        name: 'home',
        path: 'home',
        meta: { requiresAuth: true ,title: "后台首页"},
        component: () => import('~/views/backstage/AdminHome.vue')
    },
    {
        name: 'file',
        path: 'file',
        meta: { requiresAuth: true ,title: "文件管理"},
        component: () => import('~/views/backstage/File.vue')
    },{
        name: 'help',
        path: 'help',
        meta: { requiresAuth: true ,title: "帮助管理"},
        component: () => import('~/views/backstage/HelpsAdmin.vue')
    }
]