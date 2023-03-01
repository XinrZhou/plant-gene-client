import { createApp } from 'vue'
import './style.css'
import './index.css'
import './permission.js'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from "~/store/index.js";
import "nprogress/nprogress.css"
const app = createApp(App)
console.log("环境=======>",import.meta.env.ENV)
// console.log("baseURL=======>",import.meta.env.VITE_BASE_URL)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router)
app.use(store)
app.use(ElementPlus)

app.mount('#app')

