import {Router} from 'express';
import EntradaController  from '../controllers/EntradaController';


const router = Router();

router.get('/', EntradaController.index); // Rota para listar todas as saídas
router.post('', EntradaController.store); // Rota para criar uma nova saída
router.delete('/:id', EntradaController.delete); // Rota para deletar uma saída
router.get('/:id', EntradaController.show); // Rota para exibir detalhes de uma saída
router.put('/:id', EntradaController.update); // Rota para atualizar uma saída

export default router;

