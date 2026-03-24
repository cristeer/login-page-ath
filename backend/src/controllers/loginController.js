// // criar o controlador de rotas do login
import loginModel from "../models/loginModel.js";
import jwt from 'jsonwebtoken';

class loginController {

    static async cadastrarLogin(req, res){
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ message : "Os campos: Nome, email e senha são obrigatórios" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Email inválido" });
        }

        try {
            const novoUsuario = await loginModel.create(nome, email, senha);
            res.status(201).json({ message: "Usuário cadastrado com sucesso", user: novoUsuario });
        } catch (error) {
            console.error(error);
            if (error.code === '23505') { //erro definido pelo Postgres quando tem valor duplicado
                res.status(400).json({ message: "Email já cadastrado" });
            } else {
                res.status(500).json({ message: `Erro interno no servidor ao salvar dados ${error.message}` });
            }
        }
    }

    static async verificarLogin(req, res){
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ message: "Email e senha são obrigatórios" });
        }

        try {
            const user = await loginModel.findByEmailAndPassword(email, senha);

            if(user){
                const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
                return res.status(200).json({ message: "Login realizado com sucesso", token, user });
            }
            res.status(401).json({ message: "Credenciais inválidas" });
        } catch (error) {
            res.status(500).json({ message: `Erro interno no servidor ${error.message}` })
        }
    }
}

export default loginController;