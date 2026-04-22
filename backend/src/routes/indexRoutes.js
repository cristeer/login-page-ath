import express from "express";
import loginRoutes from "./loginRoutes.js";
import homeRoutes from "./homeRoutes.js"
import materiaRoutes from "./materiaRoutes.js";

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("Testando"));

    // Middleware JSON: converte corpo das requisições de JSON para objeto JS
    // Registra todas as rotas de autenticação (POST /register, POST /login)
    // Registra todas as rotas protegidas (GET /home)
    app.use(express.json(), loginRoutes, homeRoutes, materiaRoutes);
};

export default routes;