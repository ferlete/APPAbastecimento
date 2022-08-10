const db = require("../lib/db");
const request = require('request');

exports.findDataByCNPJ = async (req, res) => {
          const { cnpj } = req.body;

        const options = {
          method: 'GET',
          url: 'https://receitaws.com.br/v1/cnpj/',
        };

          // request(options, (error, response, body) => {
          //
          //     if (!error && response.statusCode == 200) {
          //        //obter dados do corpo ... por exemplo título
          //         const data = JSON.parse(body);
          //         const fantasia = data.nome || '';
          //
          //          ( async (err, done) => {
          //             done();
          //             // Handle connection errors
          //             if(err) {
          //                 console.log(err);
          //                 return res.status(500).json({success: false, data: err});
          //             }
          //             // SQL Query > Insert Data
          //             const { rows } = await db.query(
          //             'INSERT INTO posto (id, fantasia) values ($1, $2)',
          //             [id, fantasia],
          //             );
          //
          //               res.status(201).send({
          //               message: 'Posto Incluido Com Successo',
          //               body: {
          //                 order: { id, fantasia }
          //
          //               },
          //             });
          //         });
          //     }
          // }
          //);
      };
