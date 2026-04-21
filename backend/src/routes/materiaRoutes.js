// ============================================================================
// 📌 ARQUIVO: materiaRoutes.js
// DESCRIÇÃO: Define todas as rotas relacionadas a matérias
// FUNÇÃO: Registrar endpoints CRUD de matérias com autenticação obrigatória
// ============================================================================

import express from "express";
import materiaController from "../controllers/materiaController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

// Cria um novo router (um conjunto de rotas)
const materiaRoutes = express.Router();

// ROTA 1: POST /materias
// DESCRIÇÃO: Cria uma nova matéria
// PROTEÇÃO: authMiddleware valida o JWT
// FUNÇÃO: Chama createMateria do controller
materiaRoutes.post("/materias", authMiddleware, materiaController.createMateria);

// ROTA 2: GET /materias
// DESCRIÇÃO: Lista todas as matérias do usuário autenticado
// PROTEÇÃO: authMiddleware valida o JWT
// FUNÇÃO: Chama listMateria do controller
materiaRoutes.get("/materias", authMiddleware, materiaController.listMateria);

// ROTA 3: GET /materias/:id
// DESCRIÇÃO: Busca uma matéria específica por ID
// PROTEÇÃO: authMiddleware valida o JWT
// FUNÇÃO: Chama getMateria do controller
materiaRoutes.get("/materias/:id", authMiddleware, materiaController.getMateria);

// ROTA 4: PUT /materias/:id
// DESCRIÇÃO: Atualiza uma matéria existente
// PROTEÇÃO: authMiddleware valida o JWT
// FUNÇÃO: Chama updateMateria do controller
materiaRoutes.put("/materias/:id", authMiddleware, materiaController.updateMateria);

// ROTA 5: DELETE /materias/:id
// DESCRIÇÃO: Deleta uma matéria
// PROTEÇÃO: authMiddleware valida o JWT
// FUNÇÃO: Chama deleteMateria do controller
materiaRoutes.delete("/materias/:id", authMiddleware, materiaController.deleteMateria);

export default materiaRoutes;
