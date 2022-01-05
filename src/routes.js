import { Router } from 'express';

import produtoController from './app/controllers/produtoController';
import InsumoController from './app/controllers/InsumoController';
import ProdutoInsumoController from './app/controllers/ProdutoInsumoController';
import CategoriaController from './app/controllers/CategoriaController';
import UsuariosController from './app/controllers/UsuariosController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions/create', SessionController.store)

routes.get('/produtos', produtoController.list)
routes.get('/produtos/:nomeProduto', produtoController.index)
routes.get('/produtos/getId/:IDProduto', produtoController.findID)
routes.post('/produtos/createProduto', produtoController.store)
routes.delete('/produtos/exclude/:idProduto', produtoController.delete)
routes.put('/produtos/update/:idProduto', produtoController.update)

routes.get('/insumos', InsumoController.list)
routes.get('/insumos/:nomeInsumo', InsumoController.index)
routes.get('/insumos/getId/:IDInsumo', InsumoController.findID)
routes.post('/insumos/create', InsumoController.store)
routes.delete('/insumos/exclude/:idInsumo', InsumoController.delete)
routes.put('/insumos/update/:idInsumo', InsumoController.update)

routes.get('/produtoInsumos/:produtoId', ProdutoInsumoController.index)
routes.post('/storeProdutoInsumo/:produtoId/:insumoId/:insumoQtd', ProdutoInsumoController.store)
routes.delete('/ProdutoInsumo/exclude/:idProduto', ProdutoInsumoController.delete)
routes.get('/ProdutoInsumo/subtotalProduct', ProdutoInsumoController.subtotalProduct)
// routes.get('/detalhescomposicao/:CODIGO_DA_COMPOSICAO/', InsumoController.index)

routes.post('/usuarios/create', UsuariosController.store);

routes.get('/categorias', CategoriaController.list)

routes.use(authMiddleware)
routes.put('/usuarios/update', UsuariosController.update);


export default routes;
