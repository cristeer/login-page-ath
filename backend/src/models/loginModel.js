// criar o schema do login
import pool from "../config/dbConnection.js";

const loginModel = {
    create: async(email, senha) => {
        const query = 'INSERT INTO login (email, senha) VALUES ($1, $2) RETURNING *'
        const values = [email, senha];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    findByEmail: async (email) => {
        const query = 'SELECT * FROM login WHERE email = $1';
        const { rows } = await pool.query(query, [email]);
        return rows[0];
    }
};

export default loginModel;

