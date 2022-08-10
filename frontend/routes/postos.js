var express = require('express');
var router = express.Router();

const postosController = require('../controllers/posto.controller');

const request = require('request');
const hostname = "https://receitaws.com.br";
const path = "/v1/cnpj/";

// pega informacoes do posto
router.get('/(:cnpj)', function(req, res, next) {

    let cnpj = req.params.cnpj;
    console.log(cnpj);
    request(`${hostname}${path}${cnpj}`, (err, res, body) => {
      console.log(body);
    });

  });





// request('https://receitaws.com.br/v1/cnpj/16971093000131', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

module.exports = router;
