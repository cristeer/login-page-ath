// ============================================================================
// 📌 ARQUIVO: materiaController.js
// DESCRIÇÃO: Lógica de negócio para matérias
// FUNÇÃO: Validar dados, processar requisições e retornar respostas
// ============================================================================

import materiaModel from "../models/materiaModel.js";

const materiaController = {
    // ========================================================================
    // CRIAR MATÉRIA
    // ========================================================================
    createMateria: async (req, res) => {
        try {
            const user_id = req.user.id; // Vem do middleware auth
            const { nome, tempo_estimado_horas, importancia, descricao } = req.body;

            // Validações
            if (!nome || !tempo_estimado_horas || !importancia) {
                return res.status(400).json({ 
                    erro: "Nome, tempo estimado e importância são obrigatórios" 
                });
            }

            if (importancia < 1 || importancia > 5) {
                return res.status(400).json({ 
                    erro: "Importância deve ser entre 1 e 5" 
                });
            }

            if (tempo_estimado_horas <= 0) {
                return res.status(400).json({ 
                    erro: "Tempo estimado deve ser maior que 0" 
                });
            }

            // Chamar model para criar no BD
            const novaMateria = await materiaModel.create(
                user_id, 
                nome, 
                tempo_estimado_horas, 
                importancia, 
                descricao
            );

            return res.status(201).json({ 
                mensagem: "Matéria criada com sucesso",
                materia: novaMateria 
            });

        } catch (erro) {
            console.error("Erro ao criar matéria:", erro);
            return res.status(500).json({ erro: "Erro ao criar matéria" });
        }
    },

    // ========================================================================
    // LISTAR MATÉRIAS DO USUÁRIO
    // ========================================================================
    listMateria: async (req, res) => {
        try {
            const user_id = req.user.id;

            const materias = await materiaModel.getAllByUserId(user_id);

            return res.status(200).json({
                mensagem: "Matérias carregadas com sucesso",
                materias: materias
            });

        } catch (erro) {
            console.error("Erro ao listar matérias:", erro);
            return res.status(500).json({ erro: "Erro ao listar matérias" });
        }
    },

    // ========================================================================
    // BUSCAR MATÉRIA POR ID
    // ========================================================================
    getMateria: async (req, res) => {
        try {
            const user_id = req.user.id;
            const { id } = req.params;

            const materia = await materiaModel.getById(id, user_id);

            if (!materia) {
                return res.status(404).json({ erro: "Matéria não encontrada" });
            }

            return res.status(200).json({
                mensagem: "Matéria encontrada",
                materia: materia
            });

        } catch (erro) {
            console.error("Erro ao buscar matéria:", erro);
            return res.status(500).json({ erro: "Erro ao buscar matéria" });
        }
    },

    // ========================================================================
    // ATUALIZAR MATÉRIA
    // ========================================================================
    updateMateria: async (req, res) => {
        try {
            const user_id = req.user.id;
            const { id } = req.params;
            const dados = req.body;

            const materiaAtualizada = await materiaModel.update(id, user_id, dados);

            if (!materiaAtualizada) {
                return res.status(404).json({ erro: "Matéria não encontrada" });
            }

            return res.status(200).json({
                mensagem: "Matéria atualizada com sucesso",
                materia: materiaAtualizada
            });

        } catch (erro) {
            console.error("Erro ao atualizar matéria:", erro);
            return res.status(500).json({ erro: "Erro ao atualizar matéria" });
        }
    },

    // ========================================================================
    // DELETAR MATÉRIA
    // ========================================================================
    deleteMateria: async (req, res) => {
        try {
            const user_id = req.user.id;
            const { id } = req.params;

            const resultado = await materiaModel.delete(id, user_id);

            if (!resultado) {
                return res.status(404).json({ erro: "Matéria não encontrada" });
            }

            return res.status(200).json({
                mensagem: "Matéria deletada com sucesso"
            });

        } catch (erro) {
            console.error("Erro ao deletar matéria:", erro);
            return res.status(500).json({ erro: "Erro ao deletar matéria" });
        }
    }
};

export default materiaController;
