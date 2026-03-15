// criar somente as rotas do login
import express from "express";
import loginController from "../controllers/loginController.js";

const routes = express.Router();

routes.post("/", loginController.cadastrarLogin);

export default routes;