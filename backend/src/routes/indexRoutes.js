// ============================================================================
// 📌 ARQUIVO: indexRoutes.js
// DESCRIÇÃO: Agregador de rotas - concentra todas as rotas da aplicação
// FUNÇÃO: Registrar todas as rotas (login, home, etc) na aplicação
// ============================================================================

import express from "express";

// Importa as rotas de autenticação (registro e login)
import loginRoutes from "./loginRoutes.js";

// Importa as rotas protegidas (home)
import homeRoutes from "./homeRoutes.js"

// Função que registra todas as rotas na aplicação
const routes = (app) => {
    // ROTA DE TESTE: GET /
    // Descrição: Simples teste para verificar se servidor está respondendo
    app.route("/").get((req, res) => res.status(200).send("Testando"));

    // Middleware JSON: converte corpo das requisições de JSON para objeto JS
    // Registra todas as rotas de autenticação (POST /register, POST /login)
    // Registra todas as rotas protegidas (GET /home)
    app.use(express.json(), loginRoutes, homeRoutes);
};

export default routes;