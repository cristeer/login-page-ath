// // criar o controlador de rotas do login
import loginModel from "../models/loginModel.js";

class loginController {

    static async cadastrarLogin(req, res){
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ message : "Os campos: Nome, email e senha são obrigatórios" });
        }

        try {
            const novoUsuario = await loginModel.create(nome, email, senha);
            res.status(201).json(novoUsuario);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: `Erro interno no servidor ao salvar dados ${error.message}` });
        }
    }

    static async verificarLogin(req, res){
        const { email } = req.body;
        try {
            const procurarEmail = await loginModel.findByEmail(email);

            if(procurarEmail){
                return res.status(201).send("Usuário existe no banco de dados.");
            }
            res.status(400).json({ message: "Não foi possível obter o login do usuário" });
        } catch (error) {
            res.status(500).json({ message: `Erro interno no servidor ao salvar dados ${error.message}` })
        }
    }
}

export default loginController;