import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'

// Define todas as rotas da aplicação
const routes = [
  {
    // Rota raiz (/) mostra o componente Login
    path: '/',
    component: Login,
    meta: { requiresAuth: false }  // Não precisa estar logado
  },
  {
    // Rota do dashboard (/dashboard) mostra o Dashboard após login
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }   // Precisa estar logado para acessar
  }
]

// Cria o router
const router = createRouter({
  history: createWebHistory(),  // Usa History API (URLs limpas)
  routes
})

// Proteção de rotas: valida se o usuário está logado
router.beforeEach((to, from, next) => {
  // Obtém o token do localStorage
  const token = localStorage.getItem('token')
  
  // Se a rota requer autenticação (requiresAuth: true)
  if (to.meta.requiresAuth && !token) {
    // Redireciona para login se não tiver token
    next('/')
  } else {
    // Caso contrário, segue normalmente
    next()
  }
})

export default router
