import multer from 'multer';
import multerConfig from '../config/multerConfig';

import FotoUsuarios from '../models/FotoUsuarios';


const upload = multer(multerConfig).single('foto');

class FotousuarioController {
    
    //Store
    store(req, res) {
        return upload(req, res, async (error) => {
          if (error) {
            return res.status(400).json({ errors: [error.code] });
          }
          console.log(req.file); // Verifique se o campo filename está presente
          const { originalname, filename } = req.file;
          const { id_usuario } = req.body;
      
          if (!originalname || !filename || !id_usuario) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
          }
      
          const fotousuarios = await FotoUsuarios.create({ originalname, filename, id_usuario });
          return res.json(fotousuarios);
        });
      }

      //Show
      async listByusuario(req, res) {
        const { id } = req.params;
      
        try {
          const fotos = await FotoUsuarios.findAll({ where: { id_usuario: id } });
      
          return res.json(fotos);
        } catch (error) {
          return res.status(500).json({ error: 'Erro ao buscar imagens.' });
        }
      }

      //Delete
      async delete(req, res) {
        const { id } = req.params;

        try {
          const foto = await FotoUsuarios.findByPk(id);
                if (!foto) {
            return res.status(404).json({ error: 'Foto não encontrada.' });
          }
          await foto.destroy();
          return res.json({ message: 'Foto excluída com sucesso.' });

        }catch (error) {
          return res.status(500).json({ error: 'Erro ao excluir a foto.' });
        }
      }

        
    
      
  
}



export default new FotousuarioController();