import materiaModel from "../models/materiaModel.js";

class materiaController {

    static async cadastrarMaterias(req, res) {
        const { nome, prioridade, tempo_estudo, descricao } = req.body;
        const user_id = req.user.id;

        if(!nome || !prioridade || !tempo_estudo)
            return res.status(404).json({message: "Os campos de nome, prioridade e tempo de estudo são obrigatórios!"});

        if(tempo_estudo <= 0){
            return res.status(400).json({message: "O tempo de estudo não pode ser igual ou menor que 0!"});
        }

        try {
            const novaMateria = await materiaModel.createMaterias(nome, prioridade, tempo_estudo, descricao, user_id);
            return res.status(201).json({message: "Matéria criada com sucesso!", materia: novaMateria});
        } catch (error) {
            if(error.code == "23505"){
                return res.status(400).json({message: "Matéria já cadastrada!"});
            }else{
                console.log("Erro:", error);
                return res.status(500).json({message: "Erro não foi possível cadastrar matéria."});
            }
        }
    }
    
    static async listarMaterias(req, res) {
        const user_id = req.user.id;

        if(!user_id)
            return res.status(404).json({message: "ID de usuário não existe!"});
        
        try {
            const materias = await materiaModel.listMaterias(user_id);
            return res.status(201).json({message: "Listar matérias...", materias: materias});
        } catch (error) {
            console.log("Erro:", error);
            return res.status(500).json({message: "Não foi possível listar as matérias."});
        }
    }
    
    static async updateMaterias(req, res) {
        const user_id = req.user.id;
        const dados = req.body;
        const { id } = req.params; //params vem da rota.

        try {
            const materiaAtualizada = await materiaModel.updateMaterias(id, user_id, dados);

            if(!materiaAtualizada)
                return res.status(404).json({message: "Materia não encontrada"});

            return res.status(201).json({message: "Matéria atualizada com sucesso!", materia: materiaAtualizada});

        } catch (error) {
            console.log("Erro:", error);
            return res.status(500).json({message: "Erro ao atualizar a matéria."});
        }
    }

    static async deleteMaterias(req, res) {
        const user_id = req.user.id;
        const { id } = req.params;

        try {
            const resultado = await materiaModel.deleteMaterias(id, user_id);

            if(!resultado)
                return res.status(404).json({message: "Não foi possível encontrar a matéria"});

            return res.status(200).json({message: "Matéria deletada com sucesso!"});
        } catch (error) {
            console.log("Erro:", error);
            return res.status(500).json({message: error.message});
        }
    }
}

export default materiaController;