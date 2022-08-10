const sql = require("./db.js");

// constructor
const Marca = function(marca) {
  this.nome = marca.nome;
  this.fabricante = marca.fabricante;

};

Marca.create = (newMarca, result) => {
  sql.query("INSERT INTO modelo_veiculo SET ?", newMarca, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created marca: ", { id: res.insertId, ...newMarca });
    result(null, { id: res.insertId, ...newMarca });
  });
};

Marca.findById = (id, result) => {
  sql.query(`SELECT * FROM modelo_veiculo WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found marca: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Marca with the id
    result({ kind: "not_found" }, null);
  });
};

Marca.getAll = (fabricante, result) => {
  let query = "SELECT * FROM modelo_veiculo";

  if (fabricante) {
    query += ` WHERE fabricante LIKE '%${fabricante}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("marcas: ", res);
    result(null, res);
  });
};

Marca.remove = (id, result) => {
  sql.query("DELETE FROM modelo_veiculo WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Marca with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted marca with id: ", id);
    result(null, res);
    });
  };


module.exports = Marca;
