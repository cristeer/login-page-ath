<script setup>
    import { ref } from 'vue'

    const isLogin = ref(true) // Variável reativa para alternar entre as abas

    const name = ref('')
    const email = ref('')
    const password = ref('')

    const login = () => {
        console.log("Tentativa de login:", email.value, password.value)
    }

    const register = () => {
        console.log("Tentativa de registro:", name.value, email.value, password.value)
    }
</script>

<template>
    <body>
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
    </body>
</template>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: #c7c6c6;
    }
    .caixa {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 400px;
        height: 440px;
        background: transparent;
        border: 2px solid #c0bfbf;
        border-radius: 15px;
        backdrop-filter: blur(20px);
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
        overflow: hidden;
    }

    .login_form h1, .registration_form h1 {
        font-size: 2em;
        color: #333;
        text-align: center;
    }

    .login_form, .registration_form {
        position: absolute;
        width: 100%;
        padding: 40px;
        transition: transform 0.5s ease; /* Animação suave entre as abas */
    }
    
    .login_form {
        transform: translateX(0); /* Fica no centro por padrão */
    }

    .registration_form {
        transform: translateX(400px); /* Fica escondido na direita por padrão */
    }

    .caixa.active .login_form {
        transform: translateX(-400px); /* Quando ativo, desliza o login para a esquerda */
    }

    .caixa.active .registration_form {
        transform: translateX(0); /* Quando ativo, traz o registro para o centro */
    }
    
    .input-box {
        position: relative;
        width: 100%;
        height: 50px;
        /* border-bottom: 2px solid #0e0d0d; */
        margin: 30px 0;
    }

    .input-box label {
        position: absolute;
        top: 50%;
        left: 5px;
        transform: translateY(-50%);
        font-size: 1.1em;
        color:#0e0d0d;
        font-weight: 500 ;
        pointer-events: none;
        transition: 0.5s;
    }

    .input-box input:focus ~ label,
    .input-box input:valid ~ label {
        top: -10px;
    }

    .input-box input {
        width: 100%;
        height: 100%;
        background: transparent;
        border-radius: 10px;
        outline: none;
        padding: 0 5px;
        font-size: 1rem;
        color: #0e0d0d;
        font-weight: 500;
        padding: 0 35px 0 5px;
    }

    .remember_password {
        margin-top: 10px;
        text-align: center;
        font-size: 1rem;
    }

    .remember_password a {
        color: #2d07b6;
        text-decoration: none;
    }

    .remember_password a:hover {
        text-decoration: underline;
    }

    .register,  .login {
        margin-top: 10px;
        text-align: center;
        font-size: 1rem;
    }

    .register a, .login a {
        color: #2d07b6;
        text-decoration: none;
    }

    .register a:hover, .login a:hover {
        text-decoration: underline;
    }

    button {
        width: 100%;
        height: 45px;
        background: #40017a;
        border: none;
        outline: none;
        color: #fff;
        font-size: 1.1em;
        font-weight: 500;
        border-radius: 6px;
        cursor: pointer;
    }

    button:hover {
        background: #28014d;
    }
 </style>