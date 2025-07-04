import {Router} from 'express';
import ContaController from '../controllers/ContaController';

const router = Router();
// Definindo as rotas para o recurso "conta"
router.get('/', ContaController.index); // Rota para listar todas as contas
router.get('/:id', ContaController.show); // Rota para listar todas as contas
router.post('/', ContaController.store); // Rota para criar uma nova conta
router.put('/:id', ContaController.update); // Rota para atualizar uma conta
router.delete('/:id', ContaController.delete); // Rota para deletar uma conta


export default router;