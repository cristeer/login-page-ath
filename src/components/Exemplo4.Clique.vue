<script setup>
    function message() {
        alert('Trabalhando com eventos de cliques');
    }
</script>
<template>
    <button @click="message()">Clique aqui</button>
</template>