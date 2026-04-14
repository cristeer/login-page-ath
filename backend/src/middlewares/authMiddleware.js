import jwt from 'jsonwebtoken';

// Middleware valida o token JWT antes de permitir acesso à rota
const authMiddleware = (req, res, next) => {
    try {
        // Extrai o token do header Authorization
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Token não fornecido" });
        }
        // Verifica e decodifica o token usando a chave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = decoded;
        next();
        
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expirado" });
        }
        
        return res.status(401).json({ message: "Token inválido" });
    }
};

export default authMiddleware;
