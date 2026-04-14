import loginModel from "../models/loginModel.js";
import jwt from 'jsonwebtoken';


// métodos para registro e login
class loginController {
    static async cadastrarLogin(req, res){
        // Extrai os dados do corpo da requisição
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ 
                message : "Os campos: Nome, email e senha são obrigatórios" 
            });
        }

        // Verificar se o email tem formato válido
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                message: "Email inválido" 
            });
        }

        try {
            // Criar o novo usuário no banco de dados
            const novoUsuario = await loginModel.create(nome, email, senha);
            res.status(201).json({ 
                message: "Usuário cadastrado com sucesso", 
                user: novoUsuario 
            });
        } catch (error) {
            if (error.code === '23505') {
                res.status(400).json({ message: "Email já cadastrado" });
            } else {
                res.status(500).json({ 
                    message: `Erro interno no servidor ao salvar dados ${error.message}` 
                });
            }
        }
    }

    static async verificarLogin(req, res){
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ 
                message: "Email e senha são obrigatórios" 
            });
        }

        try {
            // Tenta encontrar e validar o usuário
            const user = await loginModel.findByEmailAndPassword(email, senha);

            if(user){
                const token = jwt.sign(
                    { id: user.id, email: user.email },       
                    process.env.JWT_SECRET || 'secret',
                    { expiresIn: '1h' }
                );
                
                return res.status(200).json({ 
                    message: "Login realizado com sucesso", 
                    token, 
                    user 
                });
            }
            
            res.status(401).json({ message: "Credenciais inválidas" });
        } catch (error) {
            res.status(500).json({ 
                message: `Erro interno no servidor ${error.message}` 
            })
        }
    }
}

export default loginController;