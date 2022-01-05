import categoria from '../models/categoria';
import { Sequelize, QueryTypes } from 'sequelize';

require('dotenv/config');

const url = process.env.APP_URL;
const model = categoria

class CategoriaControllerjs {

  async list(req, res) {
    const todasCategorias = await categoria.findAndCountAll({
      order: [['nome_categoria', 'ASC']],
    })

    return res.json({
      count: todasCategorias.count,
      rows: todasCategorias.rows,
      method: {
        type: 'GET',
        url: `${url}/produtos`,
      }
    })
  }

  // async index(req, res) {

  //   const textoInserido = req.params.nomeProduto //req.params.nome_produto;
  //   const numeroPagina = '1' // req.params.pageID;


  //   const pageLimit = 20;
  //   const Op = Sequelize.Op;

  //   const produtos = await produto.findAndCountAll({
  //     where: {
  //       [Op.or]: [
  //         { nome_produto: { [Op.like]: `%${textoInserido}%` } },
  //         // { CODIGO_DA_COMPOSICAO: { [Op.like]: `%${textoInserido}%` } },
  //       ],
  //       // TIPO_ITEM: ''
  //     },
  //     limit: pageLimit,
  //     order: [['nome_produto', 'ASC']],
  //     offset: (numeroPagina - 1) * pageLimit
  //   })

  //   return res.json({
  //     count: produtos.count,
  //     pageLimit: pageLimit,
  //     rows: produtos.rows,
  //     method: {
  //       type: 'GET',
  //       url: `${url}/produtos/${textoInserido}/${numeroPagina}`,
  //     }
  //   })
  // }

  // async findID(req, res) {

  //   const produtoInserido = req.params.IDProduto //req.params.nome_insumo;

  //   const url = process.env.APP_URL;

  //   const produtos = await produto.findAndCountAll({
  //     where: { id: produtoInserido },
  //   })

  //   return res.json({
  //     count: produtos.count,
  //     rows: produtos.rows,
  //     method: {
  //       type: 'GET',
  //       url: `${url}/produtos/getId/${produtoInserido}`,
  //     }
  //   })
  // }

  // async store(req, res) {
  //   const { nomeProduto, categoria, precoVenda, descricao, idFranqueado } = req.query
  //   const agora = new Date
  //   console.log(req.query)
  //   console.log("nome: " + nomeProduto)
  //   const isCreated = await model.findOne({
  //     where: {
  //       nome_produto: nomeProduto,
  //     }
  //   });

  //   if (isCreated) {
  //     return res.status(401).json({ error: "Produto já cadastrado, disponível apenas para alteração." });
  //   }

  //   const novoProdut = await model.create({
  //     nome_produto: nomeProduto,
  //     categoria: categoria,
  //     preco_venda: precoVenda,
  //     descricao: descricao,
  //     id_franqueado: idFranqueado,
  //     createdAt: agora,
  //     updatedAt: agora,
  //   })

  //   return res.json({
  //     mensagem: "Produto devidamento cadastrado ao produto!",
  //     method: {
  //       type: 'POST',
  //       url: `${url}/produtos/${nomeProduto}`,
  //     }
  //   });
  // }

  // async delete(req, res) {
  //   const { idProduto } = req.params

  //   const isProduct = await model.findOne({
  //     where: {
  //       id: idProduto
  //     }
  //   })

  //   console.log(isProduct)

  //   if (!isProduct) {
  //     return res.status(401).json({ error: "Produto inexistente ou excluído anteriormente." });
  //   }

  //   const exclude = await model.destroy({
  //     where: {
  //       id: idProduto
  //     }
  //   })

  //   return res.json({
  //     mensagem: "Produto devidamento excluído!",
  //     method: {
  //       type: 'DELETE',
  //       url: `${url}/produtos/exclude/${idProduto}`,
  //     }
  //   });
  // }

  // async update(req, res) {
  //   const { idProduto } = req.params
  //   const { nomeProduto, categoria, precoVenda, descricao, idFranqueado, updatedAt } = req.query


  //   const isProduct = await model.findOne({
  //     where: {
  //       id: idProduto
  //     }
  //   })

  //   if (!isProduct) {
  //     return res.status(401).json({ error: "Produto inexistente ou excluído anteriormente." });
  //   }

  //   const loopObject = {};
  //   const agora = new Date;

  //   nomeProduto != "" ? loopObject['nome_produto'] = nomeProduto : null
  //   categoria != "" ? loopObject['categoria'] = categoria : null
  //   precoVenda != "" ? loopObject['preco_venda'] = precoVenda : null
  //   descricao != "" ? loopObject['descricao'] = descricao : null
  //   loopObject['updatedAt'] = agora

  //   const update = await model.update(
  //     loopObject,
  //     {
  //       where: {
  //         id: idProduto
  //       }
  //     }
  //   )

  //   return res.json({
  //     mensagem: "Produto devidamento alterado!",
  //     method: {
  //       type: 'PUT',
  //       url: `${url}/produtos/update/${idProduto}`,
  //     }
  //   });
  // }

}

export default new CategoriaControllerjs();