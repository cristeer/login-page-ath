// criar o schema do login
import pool from "../config/dbConnection.js";

const loginModel = {
    create: async(nome, email, senha) => {
        const query = 'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *'
        const values = [nome, email, senha];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    findByEmail: async (email) => {
        const query = 'SELECT * FROM usuarios WHERE email = $1';
        const { rows } = await pool.query(query, [email]);
        return rows[0];
    }
};

export default loginModel;

