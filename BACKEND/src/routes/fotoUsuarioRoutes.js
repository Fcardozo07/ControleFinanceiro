import { Router } from 'express';
import FotoUsuarioController from '../controllers/FotoUsuarioController';



const router = Router();

router.post('/', FotoUsuarioController.store);
router.get('/usuario/:id', FotoUsuarioController.listByusuario);
router.delete('/:id', FotoUsuarioController.delete);


export default router;