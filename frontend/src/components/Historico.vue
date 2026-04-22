<script setup>
import Sidebar from './Sidebar.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import materiaService from '../services/materiaService.js'

const router = useRouter()
const disciplinas = ref([])

onMounted(async () => {
  try {
    const data = await materiaService.listar()
    disciplinas.value = data.materias || []
  } catch (erro) {
    console.error('Erro ao carregar matérias:', erro)
  }
})

const irParaRegistro = () => {
  router.push('/registro')
}
</script>

<template>
  <div class="historico-container">
    <Sidebar />

    <main class="historico-content">
      <h1>Histórico de Matérias</h1>

      <div class="lista-area">
        <div v-if="disciplinas.length === 0" class="vazio">
          <p>Nenhuma disciplina cadastrada ainda</p>
        </div>

        <div v-else class="lista-disciplinas">
          <div v-for="(disciplina, index) in disciplinas" :key="index" class="disciplina-item">
            <h3>{{ disciplina.nome }}</h3>
            <p v-if="disciplina.tempo_estudo"><strong>Tempo:</strong> {{ disciplina.tempo_estudo }} min</p>
            <p v-if="disciplina.descricao"><strong>Descrição:</strong> {{ disciplina.descricao }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.historico-container {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

.historico-content {
  flex: 1;
  margin-left: 250px;
  padding: 20px;
  background-color: var(--cor-background, #412B6B);
  display: flex;
  flex-direction: column;
}

.historico-content h1 {
  color: #ffffff;
  font-size: 28px;
  margin-bottom: 20px;
}

.lista-area {
  margin-top: 10px;
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
  .historico-content {
    margin-left: 0;
    padding: 20px;
  }
}
</style>