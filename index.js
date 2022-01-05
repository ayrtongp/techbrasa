const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'labrasamarica',
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Bem vindo ao La Brasa!")
})

app.get("/results", (req, res) => {

  db.connect((err) => {

    const sql = `SELECT c.DESCRICAO_DA_CLASSE, c.DESCRIÇÃO_ITEM
    FROM comp_analit_rj_202012_deson c
    LIMIT 5`

    db.query(sql, (err, result, fields) => {
      if (err) {
        res.send(err)
      }
      res.send(result)
    });

  });

});

app.get("/searchbycomposicao", (req, res) => {

  const { descricaocomposicao } = req.params;

  db.connect((err) => {

    const sql = `
    SELECT c.CODIGO_DA_COMPOSICAO, c.DESCRICAO_DA_CLASSE, c.DESCRICAO_DA_COMPOSICAO, c.UNIDADE, c.CUSTO_TOTAL
    FROM comp_analit_rj_202012_deson c
    WHERE c.TIPO_ITEM = ''
    AND c.DESCRICAO_DA_COMPOSICAO LIKE '%?%'
    `

    db.query(sql, [descricaocomposicao], (err, result, fields) => {
    });

  });

});

app.listen(3001, () => {
  console.log("running on port 3001");
})