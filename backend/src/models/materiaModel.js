// ============================================================================
// 📌 ARQUIVO: materiaModel.js
// DESCRIÇÃO: Modelo de dados para operações de matérias no banco
// FUNÇÃO: Executar queries SQL de CRUD (Create, Read, Update, Delete)
// ============================================================================

import pool from "../config/dbConnection.js";

const materiaModel = {
    // ========================================================================
    // CRIAR MATÉRIA
    // ENTRADA: user_id, nome, tempo_estimado_horas, importancia, descricao
    // RETORNO: Objeto com dados da matéria criada
    // ========================================================================
    create: async (user_id, nome, tempo_estimado_horas, importancia, descricao = '') => {
        const query = `
            INSERT INTO materias 
            (user_id, nome, tempo_estimado_horas, importancia, descricao, status) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *
        `;
        const values = [user_id, nome, tempo_estimado_horas, importancia, descricao, 'pendente'];
        
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    // ========================================================================
    // LISTAR TODAS AS MATÉRIAS DE UM USUÁRIO
    // ENTRADA: user_id
    // RETORNO: Array de matérias
    // ========================================================================
    getAllByUserId: async (user_id) => {
        const query = `
            SELECT * FROM materias 
            WHERE user_id = $1 
            ORDER BY importancia DESC, data_criacao DESC
        `;
        
        const { rows } = await pool.query(query, [user_id]);
        return rows;
    },

    // ========================================================================
    // BUSCAR UMA MATÉRIA ESPECÍFICA
    // ENTRADA: id, user_id (para garantir que é do usuário)
    // RETORNO: Objeto com dados da matéria ou undefined
    // ========================================================================
    getById: async (id, user_id) => {
        const query = `
            SELECT * FROM materias 
            WHERE id = $1 AND user_id = $2
        `;
        
        const { rows } = await pool.query(query, [id, user_id]);
        return rows[0];
    },

    // ========================================================================
    // ATUALIZAR MATÉRIA
    // ENTRADA: id, user_id, dados a atualizar
    // RETORNO: Objeto com dados atualizados
    // ========================================================================
    update: async (id, user_id, dados) => {
        const { nome, tempo_estimado_horas, importancia, descricao, status } = dados;
        
        const query = `
            UPDATE materias 
            SET nome = COALESCE($1, nome),
                tempo_estimado_horas = COALESCE($2, tempo_estimado_horas),
                importancia = COALESCE($3, importancia),
                descricao = COALESCE($4, descricao),
                status = COALESCE($5, status),
                data_atualizacao = CURRENT_TIMESTAMP
            WHERE id = $6 AND user_id = $7
            RETURNING *
        `;
        
        const values = [nome, tempo_estimado_horas, importancia, descricao, status, id, user_id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    // ========================================================================
    // DELETAR MATÉRIA
    // ENTRADA: id, user_id
    // RETORNO: Mensagem de sucesso ou erro
    // ========================================================================
    delete: async (id, user_id) => {
        const query = `
            DELETE FROM materias 
            WHERE id = $1 AND user_id = $2
            RETURNING id
        `;
        
        const { rows } = await pool.query(query, [id, user_id]);
        return rows[0];
    }
};

export default materiaModel;
