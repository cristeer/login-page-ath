<script setup>
    import { ref } from 'vue'
    
    // Variável para alternar entre as abas login/cadastro
    const isLogin = ref(true) 

    const name = ref('')
    const email = ref('')
    const password = ref('')

    //evento de submit do login
    const login = () => {
        console.log("Tentativa de login:", email.value, password.value)
    }

    //evento de submit do cadastro
    const register = () => {
        console.log("Tentativa de registro:", name.value, email.value, password.value)
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
                        <a href="#">Esqueci minha senha</a>
                    </div>
                    <div class="register">
                        <p>Não tem uma conta? <a href="#" @click.prevent="isLogin = false">Cadastrar-se</a></p>
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
                        <p>Já tem uma conta? <a href="#" @click.prevent="isLogin = true">Entrar</a></p>
                    </div>
                </form>
            </div>

        </div>
    </main>
</template>

