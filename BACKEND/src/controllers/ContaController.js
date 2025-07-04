import Conta from '../models/Conta';

class ContaController {
  async index(req, res) {
  try {
    const { id_usuario } = req.query;

    const where = id_usuario ? { id_usuario } : {};

    const contas = await Conta.findAll({
      attributes: ['id', 'data', 'valorTotal'],
      where,
    });

    if (!contas || contas.length === 0) {
      return res.status(404).json({ error: 'Nenhuma conta encontrada' });
    }

    return res.json(contas);
  } catch (error) {
    console.error("Erro ao buscar contas:", error);
    return res.status(500).json({ error: 'Erro ao buscar contas' });
  }
}


    async store(req, res) {
    try {
        const { data, valorTotal, id_usuario } = req.body;

        if (!id_usuario) {
        return res.status(400).json({ error: 'id_usuario é obrigatório' });
        }

        const conta = await Conta.create({
        data,
        valorTotal,
        id_usuario,
        });

        return res.status(201).json(conta);
    } catch (error) {
        console.error("Erro ao criar conta:", error);
        return res.status(500).json({ error: 'Erro ao criar conta' });
    }
    }


  async show(req, res) {
    try {
      const { id } = req.params;
      const conta = await Conta.findByPk(id);
      if (!conta) {
        return res.status(404).json({ error: 'Conta não encontrada' });
      }
      return res.json(conta);
    } catch (error) {
        console.error("Erro ao criar conta:", error);
        return res.status(500).json({ error: 'Erro ao criar conta' });
}
  }
  async update(req, res) {
    try {
        const { id } = req.params;
        const conta = await Conta.findByPk(id);
        if(!conta) {
            return res.status(404).json({error: 'Conta não encontrada'});
        }
        const contaAtualizada = await conta.update(req.body);
        return res.json(contaAtualizada)
        }catch (error) {
                console.error("Erro ao criar conta:", error);
                return res.status(500).json({ error: 'Erro ao criar conta' });


  }
}

    async delete(req, res) {
        try {
            const { id } = req.params;
            const conta = await Conta.findByPk(id);
            if (!conta) {
                return res.status(404).json({ error: 'Conta não encontrada' });
            }
            await conta.destroy();
            return res.json({ message: 'Conta deletada com sucesso' });
        } catch (error) {
            console.error("Erro ao deletar conta:", error);
            return res.status(500).json({ error: 'Erro ao deletar conta' });
        }

}

}

export default new ContaController();