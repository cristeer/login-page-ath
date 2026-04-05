<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    
    // Importa axios para fazer requisições HTTP ao backend
    import axios from 'axios';
    
    // Usar useRouter para redirecionamento
    const router = useRouter()
   
    // Variavel reativa para controlar forms: true = login, false = register
    const isLogin = ref(true) 
    
    const name = ref('')
    const email = ref('')
    const password = ref('')
    
    //fazer login do usuário
    const login = async(event) => {
        // Previnir comportamento padrão do form (recarregar página)
        event.preventDefault();

        try {
            // Faz requisição POST ao endpoint /login do backend
            const resposta = await axios.post('http://localhost:3000/login', {
                email: email.value,
                senha: password.value
            });

            alert(`Usuário ${email.value} logado com sucesso!`);
            localStorage.setItem('token', resposta.data.token);
            localStorage.setItem('user', JSON.stringify(resposta.data.user));
            console.log("Token:", resposta.data.token);
            
            // Limpar campos do formulário
            email.value = '';
            password.value = '';
            
            // Redirecionar para home
            router.push('/home');
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert(error.response?.data?.message || "Falha ao realizar login.");
        }
    }

    //registrar novo usuário
    const register = async(event) => {
        event.preventDefault();
        
        try {
            // Faz requisição POST ao endpoint /register do backend
            const response = await axios.post('http://localhost:3000/register', {
                nome: name.value,
                email: email.value,
                senha: password.value
            });
            
            alert(response.data.message);
            console.log("Dados do usuário:", response.data.user);

            // Limpar campos do formulário após realizar cadastro
            name.value = '';
            email.value = '';
            password.value = '';

            //Volta para aba de login
            isLogin.value = true; 
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert(error.response?.data?.message || "Falha ao realizar cadastro.");
        }
    }
</script>

<template>   
    <main>
        <!-- isLogin = true form de login, isLogin = false form de registro -->
        <div class="caixa" :class="{ active: !isLogin }">
            <div class="login_form">
                <h1 class="title">Bem Vindo ao sStudy! </h1>
                <!-- Formulário com @submit.prevent="login" chama a função login -->
                <form @submit.prevent="login">
                    <div class="input-box">
                        <span class="icon"></span>
                        <!-- v-model vincula o valor do input ao ref email -->
                        <input v-model="email" type="email" required>
                        <label class="text">Email</label>
                    </div>
                    <div class="input-box">
                        <span class="icon"></span>
                        <!-- v-model vincula o valor do input ao ref password -->
                        <input v-model="password" type="password" required>
                        <label class="text">Senha</label>
                    </div>

                    <button type="submit" class="text">Entrar</button>

                    <div class="remember_password">
                        <a href="recuperar" class="text">Esqueci minha senha</a>
                    </div>
                    
                    <!-- @click.prevent="isLogin = false" muda isLogin para false -->
                    <div class="register">
                        <p class="text">Não tem uma conta? <a href="register" @click.prevent="isLogin = false">Cadastrar-se</a></p>
                    </div>
                </form>
            </div>

            <div class="registration_form">
                <h1 class="title">Criar Conta</h1>
                <form @submit.prevent="register">

                    <div class="input-box">
                        <span class="icon"></span>
                        <!-- v-model vincula o valor do input ao ref name -->
                        <input v-model="name" type="text" required>
                        <label>Nome</label>
                    </div>

                    <div class="input-box">
                        <span class="icon"></span>
                        <!-- v-model vincula o valor do input ao ref email -->
                        <input v-model="email" type="email" required>
                        <label class="text">Email</label>
                    </div>

                    <div class="input-box">
                        <span class="icon"></span>
                        <!-- v-model vincula o valor do input ao ref password -->
                        <input v-model="password" type="password" required>
                        <label class="text">Senha</label>
                    </div>

                    <button type="submit" class="text">Cadastrar</button>

                    <!-- @click.prevent="isLogin = true" muda isLogin para true -->
                    <div class="login">
                        <p class="text">Já tem uma conta? <a href="login" @click.prevent="isLogin = true">Entrar</a></p>
                    </div>
                </form>
            </div>
        </div>
    </main>
</template>