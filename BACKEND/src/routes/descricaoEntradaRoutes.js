import {Router} from 'express';
import DescricaoEntradaController from '../controllers/DescricaoEntradaController';

const router = Router();

router.get('/', DescricaoEntradaController.index);
router.post('/', DescricaoEntradaController.store);
router.put('/:id', DescricaoEntradaController.update); // Rota para criar uma nova descrição de saída
router.delete('/:id', DescricaoEntradaController.delete); // Rota para criar uma nova descrição de saída


export default router;