const db = require("../lib/db");
const request = require('request');

exports.findDataByCNPJ = async (req, res) => {
          const { cnpj } = req.body;

        const options = {
          method: 'GET',
          url: 'https://receitaws.com.br/v1/cnpj/',
        };

          
      };
