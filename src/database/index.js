import Sequelize from 'sequelize';
import mysql from 'mysql2';

import franquias from '../app/models/franquias';
import Usuarios from '../app/models/Usuarios';
import produto from '../app/models/produto';
import insumo from '../app/models/insumo';
import produto_insumo from '../app/models/produto_insumo';
import categoria from '../app/models/categoria';

import databaseConfig from '../config/database';

const models = [franquias, Usuarios, produto, insumo, produto_insumo, categoria];

class Database {
    constructor() {
        this.init();
        this.mysql()
    }

    init() {
        this.conection = new Sequelize(databaseConfig);

        models
            .map(model => model.init(this.conection))
            .map(model => model.associate && model.associate(this.conection.models));
    };

    mysql() {
        this.mysqlConnection = mysql.createConnection({
            host: process.env.MYSQL_URL,
            user: process.env.MYSQL_DB_USER,
            password: process.env.MYSQL_DB_PASS
        });
    }
}

export default new Database();