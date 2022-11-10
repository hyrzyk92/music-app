import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './styles/main.css'

import Iconfont from './components/Iconfont.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component("v-icon", Iconfont);

app.mount('#app')
