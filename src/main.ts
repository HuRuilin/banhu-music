import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css'
import './styles/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)
// 全局变量挂载
const globalProperties = {
}
app.config.globalProperties = Object.assign(app.config.globalProperties, globalProperties)

app.use(router)
app.use(ElementPlus)
app.mount('#app')
