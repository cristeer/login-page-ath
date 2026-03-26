import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const homeRouter = express.Router();

homeRouter.get("/home", authMiddleware, (req, res) => {
    res.json({ message: "Dados do usuário: ", user: req.user })
});

export default homeRouter;