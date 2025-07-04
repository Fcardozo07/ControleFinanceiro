import {Router} from 'express';
import UsuarioController from '../controllers/UsuarioController';

const router = Router();
// Definindo as rotas para o recurso "conta"
router.get('/', UsuarioController.index); // Rota para listar todas as contas
router.get('/:id', UsuarioController.show); // Rota para listar todas as contas
router.post('/', UsuarioController.store); // Rota para criar uma nova conta
router.put('/:id', UsuarioController.update); // Rota para atualizar uma conta
router.delete('/:id', UsuarioController.delete); // Rota para deletar uma conta


export default router;