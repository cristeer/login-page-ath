<script setup>
    import { ref } from 'vue';
    let email = ref('');
</script>

<template>
    <input v-model="email" placeholder="Digite seu email">
    <p> {{ email }}</p>
</template>