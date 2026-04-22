//Modulo createAPP
import { createApp } from 'vue'

import App from './App.vue'
import router from './router/index.js'

import '@fortawesome/fontawesome-free/css/all.css'

import './style.css';

// incorporar o router na aplicacao
createApp(App).use(router).mount('#app')
