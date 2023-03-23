import { createRouter } from "vue-router"

export default [
    {
        name: 'home',
        path: 'home',
        component: () => import('~/views/backend/AdminHome.vue')
    }
]