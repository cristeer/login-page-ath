<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<template>
  <header class="home-header">
    <div class="header-div">
      <nav class="nav-links">
        <a href="/home" class="text">Home</a>
        <a href="/registro" class="text">Registro</a>
        <a href="/statistics" class="text">Estatísticas</a>
      </nav>
      <button class="logout-button" type="button" @click="logout">Sair</button>
    </div>
  </header>
  <main>
    <div class="home-container">
      <h1 class="texto">Bem-vindo à Home!</h1>
      <p class="texto">Pronto para elevar sua nota?!</p>
    </div>
  </main>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap');

:root {
    --font-principal: 'Google Sans', sans-serif;
    --cor-background: #5C3E94;
    --cor-fundo: #5C3E94;
    --cor-secundaria: rgba(255, 255, 255, 0.123);
    --cor-botao: #7132CA;
    --cor-texto: #FFFFFF;
}
.texto {
  font-family: var(--font-principal);
  color: var(--cor-texto);
}

.home-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  background-color: var(--cor-fundo);
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

.nav-links a {
  font-family: var(--font-principal);
  text-decoration: none;
  color: inherit;
  color: var(--cor-texto);
}

.logout-button {
  padding: 8px 14px;
  width: 120px;
  border: none;
  border-radius: 6px;
  background: #8257d1;
  color: var(--cor-texto);
  font-family: var(--font-principal);
  cursor: pointer;
}

.logout-button:hover {
  background: #28014d;
}

.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
}
</style>