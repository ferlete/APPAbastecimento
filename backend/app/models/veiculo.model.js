const sql = require("./db.js");

// constructor
const Veiculo = function(veiculo) {
  this.placa = veiculo.placa;
  this.volume_reservatorio = veiculo.volume_reservatorio;
  this.ano_fabricacao = veiculo.ano_fabricacao;
  this.ano_modelo = veiculo.ano_modelo;
  this.hodometro_inicial = veiculo.hodometro_inicial;
  this.modelo_veiculo_id = veiculo.modelo_veiculo_id;
};

Veiculo.create = (newVeiculo, result) => {
  sql.query("INSERT INTO veiculo SET ?", newVeiculo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created veiculo: ", { id: res.insertId, ...newVeiculo });
    result(null, { id: res.insertId, ...newVeiculo });
  });
};

Veiculo.findById = (id, result) => {
  sql.query(`SELECT * FROM veiculo WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found veiculo id: ", res[0].id);
      result(null, res[0]);
      return;
    }

    // not found Veiculo with the id
    result({ kind: "not_found" }, null);
  });
};

Veiculo.getAll = (placa, result) => {
  let query = "SELECT * FROM veiculo";

  if (placa) {
    query += ` WHERE placa LIKE '%${placa}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Listagem de veículos realizada");
    result(null, res);
  });
};

Veiculo.remove = (id, result) => {
  sql.query("DELETE FROM veiculo WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Veiculo with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted veiculo with id: ", id);
    result(null, res);
    });
  };


module.exports = Veiculo;
