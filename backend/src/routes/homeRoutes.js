import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

// Cria um novo router
const homeRouter = express.Router();

// Rota protegida - só acessível com token válido
homeRouter.get("/home", authMiddleware, (req, res) => {
    res.json({ 
        message: "Dados do usuário: ", 
        user: req.user
    })
});

export default homeRouter;