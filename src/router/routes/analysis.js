import { createRouter } from "vue-router"

export default [{
    name: 'analysis',
    path: 'analysis',
    component: () => import('~/views/analysis/Analysis.vue')
}]