import DescricaoSaida from "../models/DescricaoSaida";

class DescricaoSaidaController {
    async index(req, res) {
        try {
            const { id_usuario } = req.query;
            const where = id_usuario ? { id_usuario } : {};
            const descricaoSaidas = await DescricaoSaida.findAll({attributes: ['id', 'descricaoSaida'], where});
            if (!descricaoSaidas) {
                return res.status(404).json({ error: 'Nenhuma descrição de saída encontrada' });
            }
            return res.json(descricaoSaidas);
        } catch (error) {
            console.error("Erro ao criar conta:", error);
            return res.status(500).json({ error: 'Erro ao listar descrição de saída' });
}
    }

async store(req, res) {
  try {
    const { descricaoSaida, id_usuario } = req.body;

    const novaDescricao = await DescricaoSaida.create({
      descricaoSaida,
      id_usuario
    });

    return res.status(201).json(novaDescricao);
  } catch (error) {
    console.error("Erro ao criar descrição de entrada:", error);
    return res.status(500).json({ error: "Erro ao criar descrição de entrada" });
  }
}

    async update(req, res) {
        try {
            const { id } = req.params;
            const descricaoSaida = await DescricaoSaida.findByPk(id);
            if (!descricaoSaida) {
                return res.status(404).json({ error: 'Descrição de saída não encontrada' });
            }
            await descricaoSaida.update(req.body);
            return res.json(descricaoSaida);
        } catch (error) {
                console.error("Erro ao criar conta:", error);
                return res.status(500).json({ error: 'Erro ao editar descrição de saída' });
    }
    }

        async delete(req, res) {
            try {
                const { id } = req.params;
                const descricaoSaida = await DescricaoSaida.findByPk(Number(id));
    
    
                if (!descricaoSaida) {
                    return res.status(404).json({ error: 'Descrição saida não encontrada ' + 'Id ' + id });
                }
    
                await descricaoSaida.destroy();
                return res.status(200).json({ message: 'Descrição de saida excluída com sucesso' });
    
            } catch (error) {
                console.error("Erro ao apagar descrição saida:", error);
                return res.status(500).json({ error: 'Erro ao apagar descricao saida' });
            }
        }
    

}



export default new DescricaoSaidaController();

