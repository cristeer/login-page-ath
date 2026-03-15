// // criar o controlador de rotas do login
import loginModel from "../models/loginModel.js";

class loginController {

    static async cadastrarLogin(req, res){
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ message : "Email e senha são obrigatórios" });
        }

        try {
            const novoUsuario = await loginModel.create(email, senha);
            res.status(201).json(novoUsuario);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: `Erro interno no servidor ao salvar dados ${error.message}` });
        }
    }
}

export default loginController;