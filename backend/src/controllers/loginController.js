// // ============================================================================
// 📌 ARQUIVO: loginController.js
// DESCRIÇÃO: Controlador de lógica de negócio para autenticação
// FUNÇÃO: Processar requisições de registro e login
// ============================================================================

// Importa o modelo para operações no banco de dados
import loginModel from "../models/loginModel.js";

// Importa JWT para gerar tokens de autenticação
import jwt from 'jsonwebtoken';

// Classe loginController contém os métodos para registro e login
class loginController {

    // ========================================================================
    // MÉTODO 1: cadastrarLogin(req, res)
    // DESCRIÇÃO: Registra um novo usuário no sistema
    // PARÂMETROS: req.body deve ter { nome, email, senha }
    // RETORNO: HTTP 201 se sucesso, 400 se erro de validação, 500 se erro BD
    // ========================================================================

    // Registrar novo usuário no sistema
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
            // Código 23505: PostgreSQL erro de UNIQUE constraint (email duplicado)
            if (error.code === '23505') {
                res.status(400).json({ message: "Email já cadastrado" });
            } else {
                res.status(500).json({ 
                    message: `Erro interno no servidor ao salvar dados ${error.message}` 
                });
            }
        }
    }

    // ========================================================================
    // MÉTODO 2: verificarLogin(req, res)
    // DESCRIÇÃO: Autentica um usuário e retorna um JWT
    // PARÂMETROS: req.body deve ter { email, senha }
    // RETORNO: HTTP 200 + token se sucesso, 401 se credenciais inválidas
    // ========================================================================

    // Verificar credenciais do usuário e gerar token JWT
    static async verificarLogin(req, res){
        const { email, senha } = req.body;

        // VALIDAÇÃO: Verifica se email e senha foram fornecidos
        if (!email || !senha) {
            return res.status(400).json({ 
                message: "Email e senha são obrigatórios" 
            });
        }

        try {
            // Tenta encontrar e validar o usuário
            const user = await loginModel.findByEmailAndPassword(email, senha);

            // Se usuário existe e senha está correta
            if(user){
                // Cria um JWT (token) válido por 1 hora
                const token = jwt.sign(
                    { id: user.id, email: user.email },              // dados do token
                    process.env.JWT_SECRET || 'secret',              // chave secreta
                    { expiresIn: '1h' }                              // validade
                );
                
                // Retorna 200 (OK) com token e dados do usuário
                return res.status(200).json({ 
                    message: "Login realizado com sucesso", 
                    token, 
                    user 
                });
            }
            
            // Se email não existe ou senha errada: 401 (Unauthorized)
            res.status(401).json({ message: "Credenciais inválidas" });
        } catch (error) {
            // Erro interno do servidor
            res.status(500).json({ 
                message: `Erro interno no servidor ${error.message}` 
            })
        }
    }
}

export default loginController;