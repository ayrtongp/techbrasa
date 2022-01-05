import 'dotenv/config';

import express from 'express';
import path from 'path';
import routes from './routes';
import Cors from 'cors';

import './database';

class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(Cors());
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;
