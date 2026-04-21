<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Obter dados do usuário do localStorage
const user = ref(JSON.parse(localStorage.getItem('user')) || {})

// Função para fazer logout
const logout = () => {
  // Confirmar logout
  if (confirm('Tem certeza que deseja fazer logout?')) {
    // Limpar dados do localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    // Redirecionar para login
    router.push('/login')
    alert('Logout realizado com sucesso!')
  }
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h2><i class="fa-solid fa-graduation-cap"></i> | sStudy</h2>
    </div>

    <nav class="sidebar-nav">
      <router-link to="/home" class="nav-item" active-class="active">
        <i class="fa-solid fa-house"></i>
        <span class="label">Home</span>
      </router-link>
      <router-link to="/about" class="nav-item" active-class="active">
        <i class="fa-solid fa-info-circle"></i>
        <span class="label">Sobre</span>
      </router-link>
    </nav>

    <div class="sidebar-footer">
      <div class="user-info" v-if="user.nome">
        <p class="user-name">{{ user.nome }}</p>
        <p class="user-email">{{ user.email }}</p>
      </div>

      <button class="logout-btn" @click="logout">
        <i class="fa-solid fa-sign-out-alt"></i>
        <span class="label">Logout</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 250px;
  background: linear-gradient(135deg, rgba(65, 43, 107, 0.9) 0%, rgba(92, 62, 148, 0.9) 100%);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.sidebar-header {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.sidebar-header h2 {
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 15px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.15);
  color: #ffffff;
}

.nav-item.active {
  background-color: rgba(255, 255, 255, 0.25);
  color: #ffffff;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
}

.nav-item .icon {
  font-size: 18px;
}

.nav-item .label {
  font-size: 14px;
}

.sidebar-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 20px;
}

.user-info {
  margin-bottom: 15px;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.user-name {
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 4px 0;
  word-break: break-word;
}

.user-email {
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  margin: 0;
  word-break: break-word;
}

.logout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 15px;
  background-color: rgba(255, 65, 65, 0.8);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.logout-btn:hover {
  background-color: rgba(255, 65, 65, 1);
  box-shadow: 0 0 15px rgba(255, 65, 65, 0.5);
}

.logout-btn .icon {
  font-size: 16px;
}

.logout-btn .label {
  font-size: 13px;
}
</style>
