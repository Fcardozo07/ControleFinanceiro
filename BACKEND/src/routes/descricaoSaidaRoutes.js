import {Router} from 'express';
import DescricaoSaidaController from '../controllers/DescricaoSaidaController';

const router = Router();

router.get('/', DescricaoSaidaController.index);
router.post('/', DescricaoSaidaController.store); // Rota para criar uma nova descrição de saída
router.put('/:id', DescricaoSaidaController.update); // Rota para atualizar uma descrição de saída
router.delete('/:id', DescricaoSaidaController.delete); // Rota para excluir uma descrição de saída


export default router;