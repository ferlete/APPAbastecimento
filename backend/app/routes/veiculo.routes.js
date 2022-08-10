module.exports = app => {
  const veiculos = require("../controllers/veiculo.controller.js");

  var router = require("express").Router();

  // Cria um novo Veiculo
  router.post("/", veiculos.create);

  // Lista todos Veiculos
  router.get("/", veiculos.findAll);

  // Lista veiculo por id
  router.get("/:id", veiculos.findOne);

  // Atualiza Veiculo with id
  router.put("/:id", veiculos.update);

  // Excluir Veiculo por id
  router.delete("/:id", veiculos.delete);

  app.use('/api/veiculos', router);
};
