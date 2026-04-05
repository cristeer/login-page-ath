// ============================================================================
// 📌 ARQUIVO: authMiddleware.js
// DESCRIÇÃO: Middleware de autenticação com JWT
// FUNÇÃO: Proteger rotas verificando se o token JWT é válido
// ============================================================================

import jwt from 'jsonwebtoken';

// Middleware que valida o token JWT antes de permitir acesso à rota
const authMiddleware = (req, res, next) => {
    try {
        // Extrai o token do header Authorization
        // Formato esperado: "Authorization: Bearer token_aqui"
        // split(' ') separa "Bearer" de "token_aqui", [1] pega só o token
        const token = req.headers.authorization?.split(' ')[1];

        // VALIDAÇÃO 1: Verifica se o token foi fornecido
        if (!token) {
            return res.status(401).json({ message: "Token não fornecido" });
        }

        // VALIDAÇÃO 2: Verifica se o token é válido
        // jwt.verify checa a assinatura e se não expirou
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        
        // Se tudo OK, adiciona os dados do token em req.user para usar no controller
        req.user = decoded;
        
        // Passa para o próximo middleware/controller
        next();
        
    } catch (error) {
        // Se o erro for token expirado
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expirado" });
        }
        
        // Qualquer outro erro: token inválido
        return res.status(401).json({ message: "Token inválido" });
    }
};

export default authMiddleware;
