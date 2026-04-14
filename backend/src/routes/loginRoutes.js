import express from "express";
import loginController from "../controllers/loginController.js";

// Cria um novo router (um conjunto de rotas)
const routes = express.Router();

// ROTA 1: POST /register
// DESCRIÇÃO: Registra um novo usuário
// FUNÇÃO: Chama cadastrarLogin do controller com dados do formulário
routes.post("/register", loginController.cadastrarLogin);

// ROTA 2: POST /login
// DESCRIÇÃO: Autentica um usuário existente
// FUNÇÃO: Chama verificarLogin do controller e retorna JWT se sucesso
routes.post("/login", loginController.verificarLogin);

export default routes;