import DescricaoEntrada   from "../models/DescricaoEntrada";

class DescricaoEntradaController {
    async index(req, res) {
        try {
            const { id_usuario } = req.query;
            const where = id_usuario ? { id_usuario } : {};

            const descricaoEntradas = await DescricaoEntrada.findAll({attributes: ['id', 'descricaoEntrada'],where});
            if (!descricaoEntradas) {
                return res.status(404).json({ error: 'Nenhuma descrição de entrada encontrada' });
            }
            return res.json(descricaoEntradas);
        } catch (error) {
            console.error("Erro ao criar conta:", error);
            return res.status(500).json({ error: 'Erro ao listar descrição de entrada' });
    }
    }
async store(req, res) {
  try {
    const { descricaoEntrada, id_usuario } = req.body;

    const novaDescricao = await DescricaoEntrada.create({
      descricaoEntrada,
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
            const descricaoEntrada = await DescricaoEntrada.findByPk(id);
            if (!descricaoEntrada) {
                return res.status(404).json({ error: 'Descrição de entrada não encontrada' });
            }
            await descricaoEntrada.update(req.body);
            return res.json(descricaoEntrada);
        } catch (error) {
                console.error("Erro ao criar conta:", error);
                return res.status(500).json({ error: 'Erro ao editar descriçãp de entrada' });
    }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            const descricaoEntrada = await DescricaoEntrada.findByPk(Number(id));


            if (!descricaoEntrada) {
                return res.status(404).json({ error: 'Descrição entrada não encontrada ' + 'Id ' + id });
            }

            await descricaoEntrada.destroy();
            return res.status(200).json({ message: 'Descrição de entrada excluída com sucesso' });

        } catch (error) {
            console.error("Erro ao apagar descrição entrada:", error);
            return res.status(500).json({ error: 'Erro ao apagar descricao entrada' });
        }
    }
   
    }


    



export default new DescricaoEntradaController();

