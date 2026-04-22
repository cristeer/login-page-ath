<script setup>
import Sidebar from './Sidebar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const irParaRegistro = () => {
  router.push('/registro')
}
</script>

<template>
  <div class="home-container">
    <Sidebar />
    
    <main class="home-content">
      <button class="btn-adicionar" @click="irParaRegistro">Iniciar Atividade</button>
    </main>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

.home-content {
  flex: 1;
  margin-left: 250px;
  padding: 20px;
  background-color: var(--cor-background, #412B6B);
  display: flex;
  flex-direction: column;
}

.btn-adicionar {
  background-color: var(--cor-botao, #5C3E94);
  color: #ffffff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 10px;
  transition: all 0.3s ease;
  width: fit-content;
}

.btn-adicionar:hover {
  background-color: #6d4ca8;
  box-shadow: 0 0 20px rgba(92, 62, 148, 0.5);
}

@media (max-width: 768px) {
  .home-content {
    margin-left: 0;
    padding: 20px;
  }
}
</style>

