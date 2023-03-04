import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('~/views/Login.vue')
        },
        {
            path: '/',
            component: () => import('~/views/Layout.vue'),
            children: [
                {
                    name: 'home',
                    path: 'home',
                    component: () => import('~/views/home/Home.vue')
                },
                {
                    name: 'browse',
                    path: 'browse',
                    component: () => import('~/views/browse/Browse.vue')
                },
                {
                    name: 'helps',
                    path: 'helps',
                    component: () => import('~/views/helps/Helps.vue')
                },
                {
                    name: 'download',
                    path: 'download',
                    component: () => import('~/views/download/Download.vue')
                }
            ],
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('~/views/Error.vue')
        }
    ]
})

export default router