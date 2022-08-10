module.exports = app => {
  const marcas = require("../controllers/marca.controller.js");

  var router = require("express").Router();

  // Cria um novo Marca
  router.post("/", marcas.create);

  // Lista todos Marcas
  router.get("/", marcas.findAll);

  // Lista Marcas por id
  router.get("/:id", marcas.findOne);

  // Atualiza Marcas with id
  router.put("/:id", marcas.update);

  // Excluir Marcas por id
  router.delete("/:id", marcas.delete);

  app.use('/api/marcas', router);
};
