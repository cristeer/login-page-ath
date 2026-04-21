import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import materiaController from "../controllers/materiaController.js";

const materiaRoutes = express.Router();

materiaRoutes.post("/materia", authMiddleware, materiaController.cadastrarMaterias);
materiaRoutes.get("/materia", authMiddleware, materiaController.listarMaterias);
materiaRoutes.put("/materia/:id", authMiddleware, materiaController.updateMaterias);
materiaRoutes.delete("/materia/:id", authMiddleware, materiaController.deleteMaterias);

export default materiaRoutes;