import { createRouter } from "vue-router"

export default [{
    path: '/',
    component: () => import('~/views/index/index.vue')
},]