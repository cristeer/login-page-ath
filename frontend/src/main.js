//Modulo createAPP
import { createApp } from 'vue'

import App from './App.vue'
import router from './router.js'  // Importa as rotas

import './style.css';

createApp(App)
  .use(router)  // Ativa o router na aplicação
  .mount('#app')