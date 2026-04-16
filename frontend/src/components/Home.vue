<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import materiaService from '../services/materiaService.js'

const router = useRouter()

// Estados
const materias = ref([])
const carregando = ref(false)
const mostraForm = ref(false)
const mostraEdicao = ref(false)
const materiaEmEdicao = ref(null)

// Formulário para nova matéria
const formulario = ref({
  nome: '',
  tempo_estimado_horas: '',
  importancia: '',
  descricao: ''
})

// Mensagens de feedback
const mensagem = ref({
  texto: '',
  tipo: ''
})

// Carregar matérias ao montar componente
onMounted(() => {
  carregarMaterias()
})

// Carregar matérias
const carregarMaterias = async () => {
  try {
    carregando.value = true
    const resposta = await materiaService.listar()
    materias.value = resposta.materias || []
  } catch (erro) {
    exibirMensagem('Erro ao carregar matérias', 'erro')
    console.error(erro)
  } finally {
    carregando.value = false
  }
}

// Adicionar matéria
const adicionarMateria = async () => {
  try {
    carregando.value = true

    await materiaService.criar({
      nome: formulario.value.nome,
      tempo_estimado_horas: parseInt(formulario.value.tempo_estimado_horas),
      importancia: parseInt(formulario.value.importancia),
      descricao: formulario.value.descricao
    })

    // Limpar formulário
    formulario.value = {
      nome: '',
      tempo_estimado_horas: '',
      importancia: '',
      descricao: ''
    }
    mostraForm.value = false

    carregarMaterias()
    exibirMensagem('Matéria adicionada com sucesso!', 'sucesso')

  } catch (erro) {
    exibirMensagem(erro.erro || 'Erro ao adicionar matéria', 'erro')
    console.error(erro)
  } finally {
    carregando.value = false
  }
}

// Abrir modal de edição
const abrirEdicao = (materia) => {
  materiaEmEdicao.value = { ...materia }
  mostraEdicao.value = true
}

// Salvar edição
const salvarEdicao = async () => {
  try {
    carregando.value = true

    await materiaService.atualizar(materiaEmEdicao.value.id, {
      nome: materiaEmEdicao.value.nome,
      tempo_estimado_horas: parseInt(materiaEmEdicao.value.tempo_estimado_horas),
      importancia: parseInt(materiaEmEdicao.value.importancia),
      descricao: materiaEmEdicao.value.descricao,
      status: materiaEmEdicao.value.status
    })

    cancelarEdicao()
    carregarMaterias()
    exibirMensagem('Matéria atualizada com sucesso!', 'sucesso')

  } catch (erro) {
    exibirMensagem(erro.erro || 'Erro ao atualizar matéria', 'erro')
    console.error(erro)
  } finally {
    carregando.value = false
  }
}

// Cancelar edição
const cancelarEdicao = () => {
  mostraEdicao.value = false
  materiaEmEdicao.value = null
}

// Deletar matéria
const deletarMateria = async (id) => {
  if (confirm('Tem certeza que deseja deletar esta matéria?')) {
    try {
      await materiaService.deletar(id)
      carregarMaterias()
      exibirMensagem('Matéria deletada com sucesso!', 'sucesso')
    } catch (erro) {
      exibirMensagem(erro.erro || 'Erro ao deletar matéria', 'erro')
      console.error(erro)
    }
  }
}

// Iniciar estudos
const iniciarEstudo = (materia) => {
  salvarComStatus(materia, 'em_progresso')
  alert(`Iniciando estudos de "${materia.nome}"!\n\nTempo estimado: ${materia.tempo_estimado_horas}h\nImportância: ${materia.importancia}/5`)
}

// Salvar matéria com novo status
const salvarComStatus = async (materia, novoStatus) => {
  try {
    await materiaService.atualizar(materia.id, {
      status: novoStatus
    })
    carregarMaterias()
  } catch (erro) {
    console.error(erro)
  }
}

// Exibir mensagem
const exibirMensagem = (texto, tipo) => {
  mensagem.value = { texto, tipo }
  
  setTimeout(() => {
    mensagem.value = { texto: '', tipo: '' }
  }, 3000)
}

// Formatar status
const formatarStatus = (status) => {
  const statusMap = {
    'pendente': 'Pendente',
    'em_progresso': 'Em Progresso',
    'concluida': 'Concluída'
  }
  return statusMap[status] || status
}

// Formatar data
const formatarData = (data) => {
  return new Date(data).toLocaleDateString('pt-BR')
}

// Logout
function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<template>
  <header class="home-header">
    <div class="header-div">
      <nav class="nav-links">
        <a href="/home" class="nav-link">Home</a>
        <a href="/about" class="nav-link">About</a>
        <a href="/contato" class="nav-link">Contact</a>
      </nav>
      <button class="logout-button" type="button" @click="logout">Sair</button>
    </div>
  </header>

  <main class="main-content">
    <!-- Título da página -->
    <div class="page-header">
      <h1 class="titulo">Minhas Matérias</h1>
      <button class="btn-adicionar" @click="mostraForm = !mostraForm">
        {{ mostraForm ? '✕ Cancelar' : '+ Adicionar Matéria' }}
      </button>
    </div>

    <!-- Formulário para adicionar matéria -->
    <div v-if="mostraForm" class="form-section">
      <form @submit.prevent="adicionarMateria">
        <div class="form-group">
          <label for="nome">Nome da Matéria *</label>
          <input 
            id="nome"
            v-model="formulario.nome" 
            type="text" 
            placeholder="Ex: Cálculo I"
            required
          >
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="tempo">Tempo Estimado (horas) *</label>
            <input 
              id="tempo"
              v-model.number="formulario.tempo_estimado_horas" 
              type="number" 
              min="1"
              placeholder="Ex: 40"
              required
            >
          </div>

          <div class="form-group">
            <label for="importancia">Importância *</label>
            <select 
              id="importancia"
              v-model.number="formulario.importancia"
              required
            >
              <option value="">Selecione...</option>
              <option value="1">Baixa (1)</option>
              <option value="2">Média-Baixa (2)</option>
              <option value="3">Média (3)</option>
              <option value="4">Média-Alta (4)</option>
              <option value="5">Alta (5)</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="descricao">Descrição (opcional)</label>
          <textarea 
            id="descricao"
            v-model="formulario.descricao" 
            placeholder="Detalhes sobre a matéria..."
            rows="3"
          ></textarea>
        </div>

        <button type="submit" class="btn-submit" :disabled="carregando">
          {{ carregando ? 'Adicionando...' : 'Adicionar Matéria' }}
        </button>
      </form>

      <div v-if="mensagem.texto" :class="['mensagem', mensagem.tipo]">
        {{ mensagem.texto }}
      </div>
    </div>

    <!-- Lista de Matérias -->
    <section class="materias-container">
      <h2 class="subtitle">{{ materias.length }} matéria{{ materias.length !== 1 ? 's' : '' }}</h2>

      <div v-if="materias.length === 0" class="sem-materias">
        <p>Nenhuma matéria adicionada ainda.</p>
        <p>Comece adicionando uma!</p>
      </div>

      <div v-else class="grid-materias">
        <div v-for="materia in materias" :key="materia.id" class="card-materia">
          <!-- Badges -->
          <div class="badges">
            <span :class="['badge-importancia', 'imp-' + materia.importancia]">
              ⭐ {{ materia.importancia }}/5
            </span>
            <span :class="['badge-status', 'status-' + materia.status]">
              {{ formatarStatus(materia.status) }}
            </span>
          </div>

          <!-- Conteúdo -->
          <h3 class="card-titulo">{{ materia.nome }}</h3>
          
          <p v-if="materia.descricao" class="card-descricao">
            {{ materia.descricao }}
          </p>

          <div class="card-info">
            <div class="info-item">
              <span class="info-label">⏱️ Tempo:</span>
              <span class="info-valor">{{ materia.tempo_estimado_horas }}h</span>
            </div>
            <div class="info-item">
              <span class="info-label">📅 Data:</span>
              <span class="info-valor">{{ formatarData(materia.data_criacao) }}</span>
            </div>
          </div>

          <!-- Botões de Ação -->
          <div class="botoes-acao">
            <button @click="iniciarEstudo(materia)" class="btn-estudar">
              Iniciar
            </button>
            <button @click="abrirEdicao(materia)" class="btn-editar">
              Editar
            </button>
            <button @click="deletarMateria(materia.id)" class="btn-deletar">
              Deletar
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal de Edição -->
    <div v-if="mostraEdicao" class="modal-overlay">
      <div class="modal">
        <h3 class="modal-titulo">Editar Matéria</h3>
        <form @submit.prevent="salvarEdicao">
          <div class="form-group">
            <label>Nome da Matéria</label>
            <input v-model="materiaEmEdicao.nome" type="text" required>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Tempo Estimado (horas)</label>
              <input v-model.number="materiaEmEdicao.tempo_estimado_horas" type="number" min="1" required>
            </div>

            <div class="form-group">
              <label>Importância</label>
              <select v-model.number="materiaEmEdicao.importancia" required>
                <option value="1">Baixa (1)</option>
                <option value="2">Média-Baixa (2)</option>
                <option value="3">Média (3)</option>
                <option value="4">Média-Alta (4)</option>
                <option value="5">Alta (5)</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Descrição</label>
            <textarea v-model="materiaEmEdicao.descricao" rows="3"></textarea>
          </div>

          <div class="form-group">
            <label>Status</label>
            <select v-model="materiaEmEdicao.status" required>
              <option value="pendente">Pendente</option>
              <option value="em_progresso">Em Progresso</option>
              <option value="concluida">Concluída</option>
            </select>
          </div>

          <div class="botoes-modal">
            <button type="submit" class="btn-salvar">Salvar</button>
            <button type="button" @click="cancelarEdicao" class="btn-cancelar-modal">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap');

:root {
    --font-principal: 'Google Sans', sans-serif;
    --cor-background: #412B6B;
    --cor-secundaria: rgba(255, 255, 255, 0.123);
    --cor-botao: #5C3E94;
    --cor-texto: #FFFFFF;
    --cor-sucesso: #4caf50;
    --cor-erro: #f44336;
    --cor-card: rgba(92, 62, 148, 0.2);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

.home-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, var(--cor-background) 0%, var(--cor-botao) 100%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.header-div {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.nav-links {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  max-width: 500px;
  gap: 16px;
}

.nav-link {
  font-family: var(--font-principal);
  text-decoration: none;
  color: var(--cor-texto);
  font-weight: 500;
  transition: all 0.3s;
  padding: 8px 12px;
  border-radius: 4px;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
}

.logout-button {
  padding: 8px 14px;
  width: 120px;
  border: none;
  border-radius: 6px;
  background: var(--cor-botao);
  color: var(--cor-texto);
  font-family: var(--font-principal);
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.logout-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.main-content {
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #412B6B 0%, #5C3E94 100%);
  padding: 40px 20px;
}

.page-header {
  max-width: 1200px;
  margin: 0 auto 30px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  align-self: flex-start;
  justify-self: flex-start;
}

.titulo {
  font-family: var(--font-principal);
  color: var(--cor-texto);
  font-size: 2.5em;
  margin: 0;
}

.btn-adicionar {
  padding: 12px 24px;
  background: var(--cor-botao);
  color: var(--cor-texto);
  border: none;
  border-radius: 8px;
  font-family: var(--font-principal);
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1em;
}

.btn-adicionar:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

/* ========== FORMULÁRIO ========== */

.form-section {
  max-width: 600px;
  margin: 0 auto 40px;
  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: var(--cor-texto);
  font-weight: 600;
  font-family: var(--font-principal);
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px;
  background: var(--cor-secundaria);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  color: var(--cor-texto);
  font-family: var(--font-principal);
  font-size: 1em;
  transition: all 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--cor-texto);
  background: var(--cor-secundaria);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.btn-submit {
  width: 100%;
  padding: 12px;
  background: var(--cor-botao);
  color: var(--cor-texto);
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-family: var(--font-principal);
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1em;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(92, 62, 148, 0.4);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ========== MENSAGENS ========== */

.mensagem {
  margin-top: 15px;
  padding: 15px;
  border-radius: 8px;
  font-weight: bold;
  animation: slideIn 0.3s ease-in;
  text-align: center;
}

.mensagem.sucesso {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.mensagem.erro {
  background: rgba(244, 67, 54, 0.2);
  color: #f44336;
  border: 1px solid rgba(244, 67, 54, 0.3);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ========== LISTAGEM DE MATÉRIAS ========== */

.materias-container {
  max-width: 1200px;
  margin: 0 auto;
}

.subtitle {
  font-family: var(--font-principal);
  color: var(--cor-texto);
  font-size: 1.5em;
  margin-bottom: 20px;
  text-transform: capitalize;
}

.sem-materias {
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  padding: 60px 20px;
}

.sem-materias p {
  font-family: var(--font-principal);
  font-size: 1.1em;
  margin: 10px 0;
}

.grid-materias {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 25px;
}

/* ========== CARD DE MATÉRIA ========== */

.card-materia {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 20px;
  backdrop-filter: blur(10px);
  transition: all 0.3s;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.card-materia:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
}

.badges {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.badge-importancia,
.badge-status {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85em;
  font-weight: bold;
  font-family: var(--font-principal);
}

.badge-importancia {
  color: white;
}

.imp-1 { background: rgba(76, 175, 80, 0.3); }
.imp-2 { background: rgba(255, 193, 7, 0.3); }
.imp-3 { background: rgba(255, 152, 0, 0.3); }
.imp-4 { background: rgba(244, 67, 54, 0.3); }
.imp-5 { background: rgba(156, 39, 176, 0.3); }

.badge-status {
  background: rgba(92, 62, 148, 0.3);
  color: rgba(255, 255, 255, 0.9);
}

.status-pendente { background: rgba(255, 193, 7, 0.2); }
.status-em_progresso { background: rgba(33, 150, 243, 0.2); }
.status-concluida { background: rgba(76, 175, 80, 0.2); }

.card-titulo {
  font-family: var(--font-principal);
  color: var(--cor-texto);
  font-size: 1.4em;
  margin: 0;
}

.card-descricao {
  color: rgba(255, 255, 255, 0.8);
  font-family: var(--font-principal);
  font-size: 0.95em;
  margin: 0;
  line-height: 1.5;
}

.card-info {
  display: flex;
  gap: 20px;
  padding: 15px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-family: var(--font-principal);
}

.info-label {
  font-weight: 600;
}

.info-valor {
  color: var(--cor-texto);
  font-weight: 500;
}

/* ========== BOTÕES DE AÇÃO ========== */

.botoes-acao {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}

.btn-estudar,
.btn-editar,
.btn-deletar {
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-family: var(--font-principal);
  transition: all 0.3s;
  font-size: 0.9em;
}

.btn-estudar {
  background: var(--cor-botao);
  color: var(--cor-texto);
}

.btn-estudar:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(92, 62, 148, 0.4);
}

.btn-editar {
  background: rgba(76, 175, 80, 0.3);
  color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(76, 175, 80, 0.5);
}

.btn-editar:hover {
  background: rgba(76, 175, 80, 0.5);
  transform: translateY(-2px);
}

.btn-deletar {
  background: rgba(244, 67, 54, 0.3);
  color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(244, 67, 54, 0.5);
}

.btn-deletar:hover {
  background: rgba(244, 67, 54, 0.5);
  transform: translateY(-2px);
}

/* ========== MODAL ========== */

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal {
  background: linear-gradient(135deg, #412B6B 0%, #5C3E94 100%);
  padding: 30px;
  border-radius: 15px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.modal-titulo {
  color: var(--cor-texto);
  font-family: var(--font-principal);
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.5em;
}

.botoes-modal {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 20px;
}

.btn-salvar,
.btn-cancelar-modal {
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-family: var(--font-principal);
  transition: all 0.3s;
}

.btn-salvar {
  background: rgba(76, 175, 80, 0.3);
  color: var(--cor-texto);
  border: 1px solid rgba(76, 175, 80, 0.5);
}

.btn-salvar:hover {
  background: rgba(76, 175, 80, 0.5);
  transform: translateY(-2px);
}

.btn-cancelar-modal {
  background: rgba(244, 67, 54, 0.3);
  color: var(--cor-texto);
  border: 1px solid rgba(244, 67, 54, 0.5);
}

.btn-cancelar-modal:hover {
  background: rgba(244, 67, 54, 0.5);
  transform: translateY(-2px);
}

/* ========== RESPONSIVO ========== */

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 20px;
  }

  .titulo {
    font-size: 2em;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .grid-materias {
    grid-template-columns: 1fr;
  }

  .botoes-acao {
    grid-template-columns: 1fr;
  }

  .nav-links {
    max-width: 100%;
  }

  .card-info {
    flex-direction: column;
    gap: 10px;
  }
}
</style>