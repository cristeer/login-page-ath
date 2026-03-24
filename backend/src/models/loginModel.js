// criar o schema do login
import pool from "../config/dbConnection.js";
import bcrypt from 'bcrypt';

const loginModel = {
    create: async(nome, email, senha) => {
        const hashedPassword = await bcrypt.hash(senha, 10);
        const query = 'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email'
        const values = [nome, email, hashedPassword];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

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

