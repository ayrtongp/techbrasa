import produto_insumo from '../models/produto_insumo';
import produto from '../models/produto';
import insumo from '../models/insumo';

import Sequelize, { DataTypes, QueryTypes } from 'sequelize';
require('dotenv/config');

const url = process.env.APP_URL;
const model = produto_insumo

class ProdutoInsumoController {

  async index(req, res) {

    const IDPesquisado = req.params.produtoId //req.params.produto_id;
    const numeroPagina = '1' // req.params.pageID;

    const url = process.env.APP_URL;

    const pageLimit = 20;
    const operador = Sequelize.Op;


    const insumos = await produto_insumo.findAndCountAll({
      where: {
        produto_id: IDPesquisado
      },
      include: [
        {
          model: insumo,
          as: 'insumo'
        },
      ]
    })

    const insumos2 = await produto_insumo.findAndCountAll({
      where: {
        produto_id: IDPesquisado
      },

      limit: 1,

      include: [
        {
          model: produto,
          as: 'produto'
        },
      ]
    })


    return res.json({
      rowsProd: insumos2.rows,
      count: insumos.count,
      rows: insumos.rows,
      // count: produtos.count,
      // pageLimit: pageLimit,
      // rows: produtos.rows,
      method: {
        type: 'GET',
        url: `${url}/produtoInsumos/${IDPesquisado}/${numeroPagina}`,
      }
    })
  }

  async store(req, res) {
    const { produtoId, insumoId, insumoQtd } = req.params

    const url = process.env.APP_URL;

    const isCreated = await produto_insumo.findOne({
      where: {
        produto_id: produtoId,
        insumo_id: insumoId
      }
    });

    if (isCreated) {
      return res.status(401).json({ error: "Insumo já cadastrado, disponível apenas para alteração." });
    }

    const novoProdutoInsumo = await produto_insumo.create({
      produto_id: produtoId,
      insumo_id: insumoId,
      insumo_quantidade: insumoQtd
    })

    return res.json({
      mensagem: "Insumo devidamento cadastrado ao produto!",
      method: {
        type: 'POST',
        url: `${url}/produtos/${produtoId}/${insumoId}/${insumoQtd}`,
      }
    });
  }

  async delete(req, res) {
    const { idProduto } = req.params

    const isProduct = await model.findOne({
      where: {
        id: idProduto
      }
    })

    console.log(isProduct)

    if (!isProduct) {
      return res.status(401).json({ error: "Produto inexistente ou excluído anteriormente." });
    }

    const exclude = await model.destroy({
      where: {
        id: idProduto
      }
    })

    return res.json({
      mensagem: "Produto devidamento excluído!",
      method: {
        type: 'DELETE',
        url: `${url}/produtos/exclude/${idProduto}`,
      }
    });
  }

  async subtotalProduct(req, res) {

    const url = process.env.APP_URL;

    const insumos = await produto_insumo.findAndCountAll({
      include: [
        {
          model: insumo,
          as: 'insumo',
          attributes: ['preco']
        },
      ],
      attributes: [
        'produto_id',
        'insumo_quantidade'
      ]
    })

    var newOBJ = {}
    insumos.rows.forEach((e, index) => {
      let subtotal = parseFloat((e['insumo']['preco'] * e['insumo_quantidade'])).toFixed(2)
      let produtoID = e['produto_id']
      if (newOBJ[produtoID] == undefined) {
        newOBJ[produtoID] = 0
      }
      newOBJ[produtoID] = (parseFloat(newOBJ[produtoID]) + parseFloat(subtotal)).toFixed(2)

    })
    console.log(newOBJ)

    return res.json({
      message: 'Não consegui usar Sequelize ou Rawquery do sql e então  criei esse metodo dentro do controller',
      rows: newOBJ,
      method: {
        type: 'GET',
        url: `${url}/subtotalProduct}`,
      }
    })
  }

}

export default new ProdutoInsumoController();