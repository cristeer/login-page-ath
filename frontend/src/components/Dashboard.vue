<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentPage = ref('inicio')

// Ao montar o componente, verifica se está logado
onMounted(() => {
  const token = localStorage.getItem('token')
  
  // Se não tiver token, volta para login
  if (!token) {
    router.push('/')
  }
})

// Função para fazer logout
const logout = () => {
  localStorage.removeItem('token')
  router.push('/')
}

// Função para navegar entre páginas
const navigateTo = (page) => {
  currentPage.value = page
}
</script>

<template>
  <div class="dashboard-container">
    <!-- HEADER com navegação -->
    <header class="dashboard-header">
      <div class="header-content">
        <h1 class="logo">sStudy</h1>
        
        <nav class="nav-menu">
          <button 
            class="nav-link" 
            :class="{ active: currentPage === 'inicio' }"
            @click="navigateTo('inicio')">
            Início
          </button>
          <button 
            class="nav-link" 
            :class="{ active: currentPage === 'tarefa' }"
            @click="navigateTo('tarefa')">
            Cadastrar Tarefa
          </button>
          <button 
            class="nav-link" 
            :class="{ active: currentPage === 'sobre' }"
            @click="navigateTo('sobre')">
            Sobre Nós
          </button>
        </nav>

        <button class="logout-btn" @click="logout">Sair</button>
      </div>
    </header>

    <!-- MAIN: Conteúdo dinâmico baseado na navegação -->
    <main class="dashboard-main">
      <!-- Página: Início -->
      <div v-if="currentPage === 'inicio'" class="page-content">
        <h2>Bem-vindo ao sStudy!</h2>
        <p>Aqui você pode gerenciar suas tarefas e melhorar sua produtividade nos estudos.</p>
      </div>

      <!-- Página: Cadastrar Tarefa -->
      <div v-if="currentPage === 'tarefa'" class="page-content">
        <h2>Cadastrar Nova Tarefa</h2>
        <p>Esta seção será usada para criar e gerenciar suas tarefas.</p>
      </div>

      <!-- Página: Sobre Nós -->
      <div v-if="currentPage === 'sobre'" class="page-content">
        <h2>Sobre o sStudy</h2>
        <p>O sStudy é uma plataforma desenvolvida para ajudar você a organizar e acompanhar suas atividades acadêmicas.</p>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Container principal */
.dashboard-container {
  min-height: 100vh;
  background-color: #16121a;
  display: flex;
  flex-direction: column;
}

/* Header do dashboard */
.dashboard-header {
  background: oklch(20.463% 0.00002 271.152 / 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 2px solid #fffefe9c;
  padding: 15px 0;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
}

/* Logo */
.logo {
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  margin: 0;
  min-width: 120px;
}

/* Menu de navegação */
.nav-menu {
  display: flex;
  gap: 20px;
  flex: 1;
}

.nav-link {
  background: transparent;
  color: #ffffff;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 12px;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
  position: relative;
}

.nav-link:hover {
  color: rgb(137, 71, 241);
}

.nav-link.active {
  color: rgb(137, 71, 241);
  border-bottom-color: rgb(137, 71, 241);
}

/* Botão de logout */
.logout-btn {
  padding: 8px 20px;
  background: #40017a;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
  min-width: 70px;
}

.logout-btn:hover {
  background: #28014d;
}

/* Conteúdo principal */
.dashboard-main {
  flex: 1;
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* Conteúdo da página */
.page-content {
  animation: fadeIn 0.3s ease;
}

.page-content h2 {
  color: #ffffff;
  font-size: 28px;
  margin-bottom: 20px;
}

.page-content p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  line-height: 1.6;
}

/* Animação de transição */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Responsivo */
@media (max-width: 768px) {
  .header-content {
    flex-wrap: wrap;
    gap: 15px;
  }

  .nav-menu {
    flex-basis: 100%;
    gap: 10px;
  }

  .nav-link {
    font-size: 0.9rem;
    padding: 6px 8px;
  }

  .logo {
    font-size: 20px;
  }
}
</style>
