<script setup>
import Sidebar from './Sidebar.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const nome = ref('')
const tempo = ref('')
const descricao = ref('')

const adicionarMateria = () => {
  // Validar campos
  if (!nome.value.trim()) {
    alert('Por favor, preencha o nome da disciplina')
    return
  }

  // Criar objeto da matéria
  const novaMateria = {
    nome: nome.value,
    tempo: tempo.value || 'Não especificado',
    descricao: descricao.value || 'Sem descrição'
  }

  // Obter disciplinas do localStorage
  const disciplinas = JSON.parse(localStorage.getItem('disciplinas')) || []

  // Adicionar a nova matéria
  disciplinas.push(novaMateria)

  // Salvar no localStorage
  localStorage.setItem('disciplinas', JSON.stringify(disciplinas))

  // Limpar formulário
  nome.value = ''
  tempo.value = ''
  descricao.value = ''

  alert('Matéria adicionada com sucesso!')

  // Redirecionar para home
  router.push('/home')
}
</script>

<template>
  <div class="registro-container">
    <Sidebar />

    <main class="registro-content">
      <div class="formulario-container">
        <h1>Adicionar Matéria</h1>

        <form @submit.prevent="adicionarMateria" class="formulario">
          <div class="form-group">
            <label for="nome">Nome da Disciplina *</label>
            <input
              id="nome"
              v-model="nome"
              type="text"
              placeholder="Ex: Programação"
              required
            />
          </div>

          <div class="form-group">
            <label for="tempo">Tempo de Estudo</label>
            <input
              id="tempo"
              v-model.number="tempoEmMinutos"
              type="number"
              placeholder="Digite o tempo em minutos"
            />
          </div>

          <div class="form-group">
            <label for="descricao">Descrição</label>
            <textarea
              id="descricao"
              v-model="descricao"
              placeholder="Descreva o conteúdo ou objetivos de estudo"
              rows="5"
            ></textarea>
          </div>

          <button type="submit" class="btn-adicionar">Adicionar Matéria</button>
        </form>
      </div>
    </main>
  </div>
</template>

<style scoped>
.registro-container {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

.registro-content {
  flex: 1;
  margin-left: 250px;
  padding: 30px;
  overflow-y: auto;
  background-color: var(--cor-background, #412B6B);
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.formulario-container {
  width: 100%;
  max-width: 500px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 30px;
  margin-top: 20px;
}

.formulario-container h1 {
  color: #ffffff;
  font-size: 28px;
  margin-bottom: 30px;
  text-align: center;
}

.formulario {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 600;
}

.form-group input,
.form-group textarea {
  padding: 12px 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  font-size: 14px;
  font-family: inherit;
  transition: all 0.3s ease;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.4);
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 15px rgba(92, 62, 148, 0.3);
}

.btn-adicionar {
  padding: 12px 24px;
  background-color: var(--cor-botao, #5C3E94);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.btn-adicionar:hover {
  background-color: #6d4ca8;
  box-shadow: 0 0 20px rgba(92, 62, 148, 0.5);
}

.btn-adicionar:active {
  transform: scale(0.98);
}

@media (max-width: 768px) {
  .registro-content {
    margin-left: 0;
    padding: 20px;
  }

  .formulario-container {
    max-width: 100%;
  }
}
</style>