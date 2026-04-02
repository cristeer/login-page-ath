// ============================================================================
// 📌 ARQUIVO: loginModel.js
// DESCRIÇÃO: Modelo de dados para operações de usuário no banco
// FUNÇÃO: Executar queries SQL (INSERT, SELECT) de forma organizada
// ============================================================================

import pool from "../config/dbConnection.js";
import bcrypt from 'bcrypt';

// Objeto loginModel contém todos os métodos para operações com usuários
const loginModel = {
    // ========================================================================
    // MÉTODO 1: create(nome, email, senha)
    // DESCRIÇÃO: Cria um novo usuário no banco de dados
    // RETORNO: { id, nome, email } do usuário criado
    // ========================================================================

    // Criar novo usuário no banco de dados
    create: async(nome, email, senha) => {
        // Converter senha em HASH
        const hashedPassword = await bcrypt.hash(senha, 10);
        const query = 'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email'
        const values = [nome, email, hashedPassword];
        
        // Executar query no banco de dados
        const { rows } = await pool.query(query, values);
        
        // Retorna o primeiro resultado (o usuário criado)
        return rows[0];
    },

    // ========================================================================
    // MÉTODO 2: findByEmail(email)
    // DESCRIÇÃO: Busca um usuário pelo email
    // RETORNO: Objeto do usuário ou undefined se não encontrar
    // ========================================================================

    // Buscar usuário no BD pelo email
    findByEmail: async (email) => {
        const query = 'SELECT * FROM usuarios WHERE email = $1';
        const { rows } = await pool.query(query, [email]);
        
        // Retorna o primeiro resultado (ou undefined)
        return rows[0];
    },

    // ========================================================================
    // MÉTODO 3: findByEmailAndPassword(email, senha)
    // DESCRIÇÃO: Autentica um usuário verificando email e senha
    // RETORNO: { id, nome, email } se válido, null se inválido
    // ========================================================================
    findByEmailAndPassword: async (email, senha) => {
        // Primeiro: busca o usuário pelo email
        const user = await loginModel.findByEmail(email);
        
        // Verifica se usuário existe E se a senha está correta
        if (user && await bcrypt.compare(senha, user.senha)) {
            return { id: user.id, nome: user.nome, email: user.email };
        }
        
        // Se email não existe ou senha errada, retorna null
        return null;
    }
};

export default loginModel;

