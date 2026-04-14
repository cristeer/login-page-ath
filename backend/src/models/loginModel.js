import pool from "../config/dbConnection.js";
import bcrypt from 'bcrypt';

const loginModel = {
    // Criar novo usuário no banco de dados
    create: async(nome, email, senha) => {
        // Converter senha em HASH
        const hashedPassword = await bcrypt.hash(senha, 10);
        const query = 'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email'
        const values = [nome, email, hashedPassword];
        
        // Executar query no bd
        const { rows } = await pool.query(query, values);
        
        return rows[0];
    },

    // Buscar usuário no BD pelo email
    findByEmail: async (email) => {
        const query = 'SELECT * FROM usuarios WHERE email = $1';
        const { rows } = await pool.query(query, [email]);
        return rows[0];
    },

    findByEmailAndPassword: async (email, senha) => {
        const user = await loginModel.findByEmail(email);

        if (user && await bcrypt.compare(senha, user.senha)) {
            return { id: user.id, nome: user.nome, email: user.email };
        }
        return null;
    }
};

export default loginModel;

