//Modulo createAPP
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import './style.css';

// incorporar o router na aplicacao
createApp(App).use(router).mount('#app')