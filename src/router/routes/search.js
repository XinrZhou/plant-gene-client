import { createRouter } from "vue-router"

export default [{
    name: 'search',
    path: 'search',
    component: () => import('~/views/search/Search.vue')
}]