import pool from "../config/dbConnection.js";

const materiaModel = {
    createMaterias: async (nome, tempo_estudo, descricao, user_id) => {
        const query = `INSERT INTO materias (nome, tempo_estudo, descricao, user_id, materiaCreated) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING id, user_id, nome, materiaCreated`
        const values = [nome, tempo_estudo, descricao, user_id];
        const { rows } = await pool.query(query, values);

        return rows[0];
    },

    listMaterias: async(user_id) => {
        const query = `SELECT * FROM materias WHERE user_id = $1 ORDER BY materiaCreated DESC`;
        const { rows } = await pool.query(query, [user_id]);

        return rows;
    },

    deleteMaterias: async(id, user_id) => {
        const query = `DELETE FROM materias WHERE id = $1 AND user_id = $2 RETURNING id`;
        const { rows } = await pool.query(query, [id, user_id]);
        return rows[0];
    },

    updateMaterias: async(id, user_id, dados) => {
        const { nome, tempo_estudo, descricao } = dados;
        const query = `UPDATE materias 
                       SET nome = COALESCE($1, nome),
                            tempo_estudo = COALESCE($2, tempo_estudo),
                            descricao = COALESCE($3, descricao),
                            materiaCreated = CURRENT_TIMESTAMP
                        WHERE id = $4 AND user_id = $5 RETURNING *`;
        const values = [nome, tempo_estudo, descricao, id, user_id];
        const { rows } = await pool.query(query, values);

        return rows[0];
    }
}

export default materiaModel;