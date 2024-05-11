import { createRouter } from "vue-router"

export default [{
    name: 'putative',
    path: 'putative',
    component: () => import('~/views/putative/putative.vue')
}]
