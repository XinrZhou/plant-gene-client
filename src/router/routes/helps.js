import { createRouter } from "vue-router"

export default [{
    name: 'helps',
    path: 'helps',
    component: () => import('~/views/helps/Helps.vue')
}]