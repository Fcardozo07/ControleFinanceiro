import Usuario from '../models/Usuario';
import bcrypt from 'bcryptjs';


class AuthController {
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) {
        return res.status(401).json({ message: 'Usuário não encontrado.' });
      }

      // ⚡ CORRIGIDO AQUI
      const senhaValida = await bcrypt.compare(senha, usuario.password_hash);
      if (!senhaValida) {
        return res.status(401).json({ message: 'Senha incorreta.' });
      }


      return res.json({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,       
        message: 'Login realizado com sucesso',
      });
    } catch (error) {
      console.error("Erro no login:", error);
      return res.status(500).json({ message: 'Erro interno no login.' });
    }
  }
}

export default new AuthController();
