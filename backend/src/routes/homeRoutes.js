// ============================================================================
// 📌 ARQUIVO: homeRoutes.js
// DESCRIÇÃO: Rotas protegidas (requerem autenticação JWT)
// FUNÇÃO: Definir endpoints que só podem ser acessados com token válido
// ============================================================================

// Importa Express para criar router
import express from "express";

// Importa o middleware que verifica o JWT
import authMiddleware from "../middlewares/authMiddleware.js";

// Cria um novo router
const homeRouter = express.Router();

// ROTA: GET /home
// DESCRIÇÃO: Retorna dados do usuário autenticado
// PROTEÇÃO: authMiddleware valida o token antes de executar
// FUNÇÃO: Exibe informações do usuário logado
homeRouter.get("/home", authMiddleware, (req, res) => {
    // req.user contém os dados decodificados do JWT
    // Se chegou aqui, o token foi validado com sucesso
    res.json({ 
        message: "Dados do usuário: ", 
        user: req.user  // Retorna { id, email, iat, exp }
    })
});

// Exporta as rotas protegidas
export default homeRouter;