const Marca = require("../models/marca.model.js");

// Cria e Salva um novo Marca
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Cria um marca
  const marca = new Marca({
    nome: req.body.nome,
    fabricante: req.body.fabricante

  });

  // Sava um Marca no banco de dados
  Marca.create(marca, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Marca."
      });
    else res.send(data);
  });
};

// Lista todos as marcas do banco de dados
exports.findAll = (req, res) => {
  const title = req.query.title;

  Marca.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving marcas."
      });
    else res.send(data);
  });
};

// Encontra um marca por ID
exports.findOne = (req, res) => {
  Marca.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found marca with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Marca with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Atualiza um marca por ID
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Marca.updateById(
    req.params.id,
    new Marca(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Marca with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Marca with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Marca with the specified id in the request
exports.delete = (req, res) => {
  Marca.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Marca with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete marca with id " + req.params.id
        });
      }
    } else res.send({ message: `Veiculo was deleted successfully!` });
  });
};

// Delete all Marcas from the database.
exports.deleteAll = (req, res) => {
  Marca.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all marcas."
      });
    else res.send({ message: `All Marcas were deleted successfully!` });
  });
};
