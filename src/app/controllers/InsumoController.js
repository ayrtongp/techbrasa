import insumo from '../models/insumo';
import Sequelize, { QueryTypes } from 'sequelize';
require('dotenv/config');

const url = process.env.APP_URL;
const model = insumo

class InsumoController {

  async list(req, res) {
    const todosInsumos = await model.findAndCountAll({
      order: [['nome_insumo', 'ASC']],
    })

    return res.json({
      count: todosInsumos.count,
      rows: todosInsumos.rows,
      method: {
        type: 'GET',
        url: `${url}/insumos`,
      }
    })
  }

  async index(req, res) {

    const insumoInserido = req.params.nomeInsumo //req.params.nome_insumo;
    const numeroPagina = '1' // req.params.pageID;

    const url = process.env.APP_URL;

    const pageLimit = 20;
    const Op = Sequelize.Op;

    const insumos = await insumo.findAndCountAll({
      where: {
        [Op.or]: [
          { nome_insumo: { [Op.like]: `%${insumoInserido}%` } },
          // { CODIGO_DA_COMPOSICAO: { [Op.like]: `%${insumoInserido}%` } },
        ],
        // TIPO_ITEM: ''
      },
      limit: pageLimit,
      order: [['nome_insumo', 'ASC']],
      offset: (numeroPagina - 1) * pageLimit
    })

    return res.json({
      count: insumos.count,
      pageLimit: pageLimit,
      rows: insumos.rows,
      method: {
        type: 'GET',
        url: `${url}/insumos/${insumoInserido}/${numeroPagina}`,
      }
    })
  }

  async findID(req, res) {

    const insumoInserido = req.params.IDInsumo //req.params.nome_insumo;

    const url = process.env.APP_URL;

    const insumos = await insumo.findAndCountAll({
      where: { id: insumoInserido },
    })

    return res.json({
      count: insumos.count,
      rows: insumos.rows,
      method: {
        type: 'GET',
        url: `${url}/insumos/getId/${insumoInserido}`,
      }
    })
  }

  async store(req, res) {
    const { nomeInsumo, unidade, preco, categoria, descricao, idFranqueado } = req.query

    const isCreated = await model.findOne({
      where: {
        nome_insumo: nomeInsumo,
      }
    });

    if (isCreated) {
      return res.status(401).json({ error: "Insumo já cadastrado, disponível apenas para alteração." });
    }

    const novoInsu = await model.create({
      nome_insumo: nomeInsumo,
      unidade: unidade,
      preco: preco,
      descricao: descricao,
      categoria: categoria,
      id_franqueado: idFranqueado,
    })

    return res.json({
      mensagem: "Insumo devidamento cadastrado ao produto!",
      method: {
        type: 'POST',
        url: `${url}/insumos/${nomeInsumo}`,
      }
    });
  }

  async update(req, res) {
    const { idInsumo } = req.params
    const { nomeInsumo, categoria, preco, descricao, unidade } = req.query


    const isProduct = await model.findOne({
      where: {
        id: idInsumo
      }
    })

    if (!isProduct) {
      return res.status(401).json({ error: "Insumo inexistente ou excluído anteriormente." });
    }

    const loopObject = {};

    nomeInsumo != "" ? loopObject['nome_insumo'] = nomeInsumo : null
    categoria != "" ? loopObject['categoria'] = categoria : null
    preco != "" ? loopObject['preco'] = preco : null
    descricao != "" ? loopObject['descricao'] = descricao : null
    unidade != "" ? loopObject['unidade'] = unidade : null

    const update = await model.update(
      loopObject,
      {
        where: {
          id: idInsumo
        }
      }
    )

    return res.json({
      mensagem: "Insumo alterado!",
      method: {
        type: 'PUT',
        url: `${url}/insumos/update/${idInsumo}`,
      }
    });
  }

  async delete(req, res) {
    const { idInsumo } = req.params

    const isProduct = await model.findOne({
      where: {
        id: idInsumo
      }
    })

    console.log(isProduct)

    if (!isProduct) {
      return res.status(401).json({ error: "Insumo inexistente ou excluído anteriormente." });
    }

    const exclude = await model.destroy({
      where: {
        id: idInsumo
      }
    })

    return res.json({
      mensagem: "Insumo devidamento excluído!",
      method: {
        type: 'DELETE',
        url: `${url}/insumos/exclude/${idInsumo}`,
      }
    });
  }

}

export default new InsumoController();