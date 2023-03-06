import { createRouter } from "vue-router"

export default [{
    name: 'download',
    path: 'download',
    component: () => import('~/views/download/Download.vue')
}]