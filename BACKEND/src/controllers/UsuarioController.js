import Usuario from '../models/Usuario'
import bcrypt from 'bcryptjs';

class UsuarioController{
    async index(req, res){
        try {
            const usuarios = await Usuario.findAll();
            return res.status(200).json(usuarios);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async show(req, res){
        try {
            const { id } = req.params;
            const usuario = await Usuario.findByPk(id);
            if(!usuario){
                return res.status(404).json({message: 'Usuário não encontrado!'});
            }
            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }



async store(req, res) {
  try {
    const { nome, email, senha } = req.body;

    // Se quiser validar no backend também
    if (!nome || !email || !senha) {
      return res.status(400).json({ error: "Preencha todos os campos." });
    }

    // Cria usuário (hook já vai gerar hash)
    const usuario = await Usuario.create({ nome, email, senha });

    return res.status(201).json(usuario);
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    return res.status(500).json({ error: error.message });
  }
}



    async update(req, res){
        try {
            const { id } = req.params;
            const { nome, email, senha } = req.body;
            const usuario = await Usuario.findByPk(id);
            if(!usuario){
                return res.status(404).json({message: 'Usuário não encontrado!'});
            }
            await usuario.update({ nome, email, senha });
            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async delete(req, res){
        try {
            const { id } = req.params;
            const usuario = await Usuario.findByPk(id);
            if(!usuario){
                return res.status(404).json({message: 'Usuário não encontrado!'});
            }
            await usuario.destroy();
            return res.status(200).json({ message: 'Usuário deletado com sucesso.' });

        }catch(error){
            return res.status(500).json({error: error.message})
        }
        }
        }

export default new UsuarioController();

