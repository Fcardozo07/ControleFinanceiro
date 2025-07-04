import {Router} from 'express';
import SaidaController  from '../controllers/SaidaController';

const router = Router();
router.get('/', SaidaController.index); // Rota para listar todas as saídas
router.post('/', SaidaController.store); // Rota para criar uma nova saída
router.delete('/:id', SaidaController.delete); // Rota para deletar uma saída
router.get('/:id', SaidaController.show); // Rota para exibir detalhes de uma saída
router.put('/:id', SaidaController.update); // Rota para atualizar uma saída


export default router;