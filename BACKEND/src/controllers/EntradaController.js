import Entrada from "../models/Entrada";

class EntradaController {
async index(req, res) {
    try {
            console.log("Iniciando busca de entradas...");
            const { id_usuario } = req.query;
            const where = id_usuario ? { id_usuario } : {};

            const entradas = await Entrada.findAll({
                attributes: ['id', 'id_conta', 'id_descricaoEntrada',  'valorItem', 'pago'], where
            });

            console.log("Entradas encontradas:", entradas);

            if (!entradas) {
                return res.status(404).json({ error: 'Nenhuma entrada encontrada' });
            }

            return res.json(entradas);

        } catch (error) {
            console.error("Erro ao listar entradas:", error);
            return res.status(500).json({ error: 'Erro ao listar entradas ' });
        }
    }

            async store(req, res) {
            try {
                const { id_conta, id_descricaoEntrada,  pago, valorItem, id_usuario } = req.body;

                if (!id_usuario) {
                return res.status(400).json({ error: 'id_usuario é obrigatório' });
                }

                const entrada = await Entrada.create({
                    id_conta,
                    id_descricaoEntrada,
                    pago,
                    valorItem,
                    id_usuario
                });

                return res.status(201).json(entrada);
            } catch (error) {
                console.error("Erro ao criar conta:", error);
                return res.status(500).json({ error: 'Erro ao criar conta' });
            }
            }
            async show(req, res) {
                try {
                    const id = req.params.id;
                    const entradas = await Entrada.findAll({
                        where: { id_conta: id }
                    });

                    return res.status(200).json(entradas); // <-- aqui faltava o retorno
                } catch (error) {
                    console.error("Erro ao buscar entrada:", error);
                    return res.status(500).json({ error: 'Erro ao buscar entrada' });
                }
            }




async delete(req, res) {
    try {
        const { id } = req.params;
        const entrada = await Entrada.findByPk(id);

        if (!entrada) {
            return res.status(404).json({ error: 'Entrada não encontrada' });
        }

        await entrada.destroy();

        return res.status(200).json({ message: `Item deletado ${id}` });

    } catch (error) {
        console.error("Erro ao apagar entrada:", error);
        return res.status(500).json({ error: 'Erro ao apagar entrada' });
    }
}

async update(req, res) {
    try {
        const { id } = req.params;
        const entrada = await Entrada.findByPk(id);

        if (!entrada) {
            return res.status(404).json({ error: 'Entrada não encontrada' });
        }

        const updatedEntrada = await entrada.update(req.body);
        return res.json(updatedEntrada);
    } catch (error) {
        console.error("Erro ao atualizar entrada:", error);
        return res.status(500).json({ error: 'Erro ao atualizar entrada' });
    }

}

}
export default new EntradaController();