<script setup>

</script>

<template>
    <div class="caixa">
        <div class="login_form">
            <h1>Login</h1>
            
            <form>
                <div class="input-box">
                    <span class="icon"></span>
                    <input v-model="email" type="email" placeholder="Email">Email</input>
                </div>
                <div class="input-box">
                    <span class="icon"></span>
                    <input v-model="password" type="password" placeholder="Password">Senha</input>
                </div>
            
                <button @click="login">Entrar</button>

                <div class="remember_password">
                    <a href="#">Esqueci minha senha</a>
                </div>
            </form>
        </div>
    </div>
    
    
    
    
    <!-- <div class="login_page">
        <div class="login_form">
            <h1>Login</h1>

            <input v-model="email" type="email" placeholder="Email">
            <input v-model="password" type="password" placeholder="Password">
            <button @click="login">Login</button>
        </div>
    </div> -->
</template>

<style>
    /* body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
    }

    .login_page {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .login_form {
        display: flex;
        flex-direction: column;
        border: 2px solid #ccc;
        padding: 60px;
        align-items: center;
    } */
</style>