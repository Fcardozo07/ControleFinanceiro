import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import contaRoutes from './src/routes/contaRoutes';
import descricaoEntradaRoutes from './src/routes/descricaoEntradaRoutes';
import descricaoSaidaRoutes from './src/routes/descricaoSaidaRoutes';
import entradaRoutes from './src/routes/entradaRoutes';
import saidaRoutes from './src/routes/saidaRoutes';
import usuarioRoutes from './src/routes/usuarioRoutes';
import authRoutes from './src/routes/authRoutes';
import fotoUsuarioRoutes from './src/routes/fotoUsuarioRoutes';
import cors from 'cors';

import './src/database';

const path = require('path');

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }


middlewares() {
    this.app.use(cors({
      origin: '*', // ou substitua pelo domínio do seu frontend, ex: 'http://localhost:3000'
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true // use apenas se estiver usando cookies/autenticação
    }));

    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
}

routes() {
    this.app.use("/contas", contaRoutes);
    this.app.use("/descricaoEntrada", descricaoEntradaRoutes);
    this.app.use("/descricaoSaida", descricaoSaidaRoutes);
    this.app.use("/entrada", entradaRoutes);
    this.app.use("/saida", saidaRoutes);
    this.app.use("/usuario", usuarioRoutes);
    this.app.use('/auth', authRoutes);
    this.app.use('/foto-usuario', fotoUsuarioRoutes);    
    this.app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));

}

}

export default new App().app;