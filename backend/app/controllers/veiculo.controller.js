const Veiculo = require("../models/veiculo.model.js");

// Cria e Salva um novo Veiculos
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Cria um veiculo
  const veiculo = new Veiculo({
    placa: req.body.placa,
    volume_reservatorio: req.body.volume_reservatorio,
    ano_fabricacao: req.body.ano_fabricacao,
    ano_modelo: req.body.ano_modelo,
    hodometro_inicial: req.body.hodometro_inicial,
    modelo_veiculo_id: req.body.modelo_veiculo_id

  });

  // Sava um veiculo no banco de dados
  Veiculo.create(veiculo, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Veiculo."
      });
    else res.send(data);
  });
};

// Lista todos os veiculos do banco de dados
exports.findAll = (req, res) => {
  const title = req.query.title;

  Veiculo.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving veiculos."
      });
    else res.send(data);
  });
};

// Encontra um veiculo por ID
exports.findOne = (req, res) => {
  Veiculo.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Veiculo with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Veiculo with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Atualiza um veiculo por ID
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Veiculo.updateById(
    req.params.id,
    new Veiculo(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Veiculo with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Veiculo with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Veiculo with the specified id in the request
exports.delete = (req, res) => {
  Veiculo.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Veiculo with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Veiculo with id " + req.params.id
        });
      }
    } else res.send({ message: `Veiculo was deleted successfully!` });
  });
};

// Delete all Veiculos from the database.
exports.deleteAll = (req, res) => {
  Veiculo.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all veiculos."
      });
    else res.send({ message: `All Veiculos were deleted successfully!` });
  });
};
