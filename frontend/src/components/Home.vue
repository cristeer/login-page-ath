<script setup>
import Sidebar from './Sidebar.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const disciplinas = ref([])


//mudar quando conectar com backend e bd
// onMounted(() => {
//   // Carregar disciplinas do localStorage
//   const saved = localStorage.getItem('disciplinas')
//   if (saved) {
//     disciplinas.value = JSON.parse(saved)
//   }
// })

const irParaRegistro = () => {
  router.push('/registro')
}
</script>

<template>
  <div class="home-container">
    <Sidebar />
    
    <main class="home-content">
      <button class="btn-adicionar" @click="irParaRegistro">Iniciar Atividade</button>

      <div class="historico">
        <div v-if="disciplinas.length === 0" class="vazio">
          <p>Nenhuma disciplina cadastrada ainda</p>
        </div>
        
        <div v-else class="lista-disciplinas">
          <div v-for="(disciplina, index) in disciplinas" :key="index" class="disciplina-item">
            <h3>{{ disciplina.nome }}</h3>
            <p v-if="disciplina.tempo"><strong>Tempo:</strong> {{ disciplina.tempo }}</p>
            <p v-if="disciplina.descricao"><strong>Descrição:</strong> {{ disciplina.descricao }}</p>
          </div>
        </div>
      </div>
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

.historico {
  margin-top: 20px;
}

.vazio {
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  padding: 40px 20px;
}

.lista-disciplinas {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.disciplina-item {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 15px;
  color: #ffffff;
}

.disciplina-item h3 {
  margin: 0 0 10px 0;
  font-size: 18px;
  color: #ffffff;
}

.disciplina-item p {
  margin: 5px 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

@media (max-width: 768px) {
  .home-content {
    margin-left: 0;
    padding: 20px;
  }
}
</style>

