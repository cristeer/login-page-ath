import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Registro from '../components/Registro.vue'
import Historico from '../components/Historico.vue'

// Mapeando cada rota para componentes
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro,
    meta: { requiresAuth: true }
  },
  {
    path: '/historico',
    name: 'Historico',
    component: Historico,
    meta: { requiresAuth: true }
  }
]

// define instancia de rotas
// import.meta.env.BASE_URL variavel ambiente do Vite 
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Guard de navegação para proteger rotas autenticadas
router.beforeEach((to, from, next) => {
  // Verifica se a rota requer autenticação
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  // Obtém o token do localStorage
  const token = localStorage.getItem('token')
  
  if (requiresAuth && !token) {
    // Se exigir autenticação mas não tem token, redireciona para login
    alert('Você precisa fazer login para acessar essa página')
    next('/login')
  } else if (to.path === '/login' && token) {
    // Se está tentando acessar login mas já está autenticado, redireciona para home
    next('/home')
  } else {
    // Permite a navegação
    next()
  }
})

export default router
