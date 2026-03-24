<script setup>
    import { ref } from 'vue'
    import axios from 'axios';

    // Variável reativa para alternar entre as abas
    const isLogin = ref(true) 
    
    const name = ref('')
    const email = ref('')
    const password = ref('')
    
    const login = async(event) => {
        event.preventDefault();

        try {
            const resposta = await axios.post('http://localhost:3000/login', {
                email: email.value,
                senha: password.value
            });
            alert(`Usuário ${email.value} logado com sucesso!`);
            localStorage.setItem('token', resposta.data.token);
            console.log("Token:", resposta.data.token);
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert(error.response?.data?.message || "Falha ao realizar login.");
        }

    }

    const register = async(event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:3000/register', {
                nome: name.value,
                email: email.value,
                senha: password.value
            });
            
            alert(response.data.message);
            console.log("Dados do usuário:", response.data.user);
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert(error.response?.data?.message || "Falha ao realizar cadastro.");
        }
    }

</script>

<template>   
    <main>
        <div class="caixa" :class="{ active: !isLogin }">
            <div class="login_form">
                <h1>Login</h1>
        
                <form @submit.prevent="login">
                    <div class="input-box">
                        <span class="icon"></span>
                        <input v-model="email" type="email" required>
                        <label>Email</label>
                    </div>
                    <div class="input-box">
                        <span class="icon"></span>
                        <input v-model="password" type="password" required>
                        <label>Senha</label>
                    </div>
        
                    <button type="submit">Entrar</button>
                    <div class="remember_password">
                        <a href="recuperar">Esqueci minha senha</a>
                    </div>
                    <div class="register">
                        <p>Não tem uma conta? <a href="register" @click.prevent="isLogin = false">Cadastrar-se</a></p>
                    </div>
                </form>
            </div>

            <div class="registration_form">
                <h1>Criar Conta</h1>
        
                <form @submit.prevent="register">
                    <div class="input-box">
                        <span class="icon"></span>
                        <input v-model="name" type="text" required>
                        <label>Nome</label>
                    </div>

                    <div class="input-box">
                        <span class="icon"></span>
                        <input v-model="email" type="email" required>
                        <label>Email</label>
                    </div>

                    <div class="input-box">
                        <span class="icon"></span>
                        <input v-model="password" type="password" required>
                        <label>Senha</label>
                    </div>
        
                    <button type="submit">Cadastrar</button>

                    <div class="login">
                        <p>Já tem uma conta? <a href="login" @click.prevent="isLogin = true">Entrar</a></p>
                    </div>
                </form>
            </div>

        </div>
    </main>
</template>