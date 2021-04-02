const porta = 3003;

const express = require('express');
const app = express();
const bancoDeDados = require('./bancoDeDados');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/produtos', (request, response, next) => {
  response.send(bancoDeDados.getProdutos()); // converter para JSON automaticamente
});

app.get('/produtos/:id', (request, response, next) => {
  response.send(bancoDeDados.getProduto(request.params.id))
})

app.post('/produtos', (request, response, next) => {
  const produto = bancoDeDados.salvarProduto({
    nome: request.body.nome,
    preco: request.body.preco
  })

  response.send(produto); // CONVERTE PARA JSON
})

app.put('/produtos/:id', (request, response, next) => {
  const produto = bancoDeDados.salvarProduto({
    id: request.params.id,
    nome: request.body.nome,
    preco: request.body.preco
  })

  response.send(produto); // CONVERTE PARA JSON
})

app.delete('/produtos/:id', (request, response, next) => {
  const produto = bancoDeDados.excluirProduto(request.params.id)

  response.send(produto); // CONVERTE PARA JSON
})

app.listen(porta, () => {
  console.log(`Servidor está sendo executado na porta ${porta}.`);
});

