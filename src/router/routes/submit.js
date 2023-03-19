import { createRouter } from "vue-router"

export default [{
    name: 'submit',
    path: 'submit',
    component: () => import('~/views/submit/Submit.vue')
}]