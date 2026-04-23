import express from "express";
import loginController from "../controllers/loginController.js";

// Cria um novo router (um conjunto de rotas)
const routes = express.Router();

routes.post("/register", loginController.cadastrarLogin);

routes.post("/login", loginController.verificarLogin);

export default routes;