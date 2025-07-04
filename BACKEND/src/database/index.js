import { Sequelize } from "sequelize";
import databaseConfig from "../config/database";
import Conta from "../models/Conta";
import DescricaoEntrada from "../models/DescricaoEntrada";
import DescricaoSaida from "../models/DescricaoSaida";
import Entrada from "../models/Entrada";
import Saida from "../models/Saida";
import Usuario from "../models/Usuario";
import FotoUsuarios from "../models/FotoUsuarios";




const models = [Conta, DescricaoEntrada, DescricaoSaida, Entrada, Saida, Usuario, FotoUsuarios];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));