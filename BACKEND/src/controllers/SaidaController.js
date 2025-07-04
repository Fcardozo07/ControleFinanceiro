import Saida from "../models/Saida";

class SaidaController {
    async index(req, res) {
        try {

            const { id_usuario } = req.query;
            const where = id_usuario ? { id_usuario } : {};           
            const saidas = await Saida.findAll({attributes: ['id', 'id_conta', 'id_descricaoSaida',  'valorItem', 'pago'], where});
            if (!saidas) {
                return res.status(404).json({ error: 'Nenhuma saída encontrada' });
            }
            return res.json(saidas);
        } catch (error) {
            console.error("Erro ao criar conta:", error);
            return res.status(500).json({ error: 'Erro ao listar saídas' });
    }
    }
            async store(req, res) {
            try {
                const { id_conta, id_descricaoSaida,  pago, valorItem, id_usuario } = req.body;

                if (!id_usuario) {
                return res.status(400).json({ error: 'id_usuario é obrigatório' });
                }

                const saida = await Saida.create({
                    id_conta,
                    id_descricaoSaida,
                    pago,
                    valorItem,
                    id_usuario
                });

                return res.status(201).json(saida);
            } catch (error) {
                console.error("Erro ao criar conta:", error);
                return res.status(500).json({ error: 'Erro ao criar conta' });
            }
            }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const saida = await Saida.findByPk(id);
            if (!saida) {
                return res.status(404).json({ error: 'Saída não encontrada' });
            }
            await saida.destroy();
            
            return res.status(200).json({ message: `Item deletado ${id}` });
            
        } catch (error) {
            console.error("Erro ao criar conta:", error);
            return res.status(500).json({ error: 'Erro ao apagar saída' });
    }
        }
        async show(req, res) {
            try {
                const id = req.params.id;
                const saidas = await Saida.findAll({
                    where: { id_conta: id }
                });
        
                return res.status(200).json(saidas); // <-- aqui faltava o retorno
            } catch (error) {
                console.error("Erro ao buscar Saida:", error);
                return res.status(500).json({ error: 'Erro ao buscar Saida' });
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

                        usuario.nome = nome;
                        usuario.email = email;

                        if (senha) {
                            usuario.senha = senha; // dispara hash
                        }

                        await usuario.save();

                        return res.status(200).json(usuario);
                    } catch (error) {
                        return res.status(500).json({error: error.message});
                    }
                }

        
    }


export default new SaidaController();