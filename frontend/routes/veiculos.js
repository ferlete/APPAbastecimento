var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

// display veiculo page
router.get('/', function(req, res, next) {

    dbConn.query('SELECT v.*, m.fabricante, m.nome FROM	veiculo v INNER JOIN modelo_veiculo m ON v.modelo_veiculo_id=m.id ORDER BY id desc',function(err,rows)     {

        if(err) {
            req.flash('error', err);
            // render to views/veiculos/index.ejs
            res.render('veiculos',{data:''});
        } else {
            console.log(rows);
            // render to views/veiculos/index.ejs
            res.render('veiculos',{data:rows});
        }
    });


});

// display add veiculos page
router.get('/add', function(req, res, next) {
    // render to add.ejs
    res.render('veiculos/add', {
        placa: '',
        volume_reservatorio: '',
        ano_fabricacao: '',
        ano_modelo: '',
        hodometro_inicial: '',
        modelo_veiculo_id : ''
    })
})

// add a new veiculos
router.post('/add', function(req, res, next) {

    let placa = req.body.placa;
    let volume_reservatorio = req.body.volume_reservatorio;
    let ano_fabricacao = req.body.ano_fabricacao;
    let ano_modelo = req.body.ano_modelo;
    let hodometro_inicial = req.body.hodometro_inicial;
    let modelo_veiculo_id = req.body.modelo_veiculo_id;

    let errors = false;

    if(placa.length === 0 || volume_reservatorio.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Informe a Placa e Volume Rerservatorio");
        // render to add.ejs with flash message
        res.render('veiculos/add', {
            placa: placa,
            volume_reservatorio: volume_reservatorio,
            ano_fabricacao: ano_fabricacao,
            ano_modelo: ano_modelo,
            hodometro_inicial: hodometro_inicial,
            modelo_veiculo_id: modelo_veiculo_id

        })
    }

    // if no error
    if(!errors) {

        var form_data = {
          placa: placa,
          volume_reservatorio: volume_reservatorio,
          ano_fabricacao: ano_fabricacao,
          ano_modelo: ano_modelo,
          hodometro_inicial: hodometro_inicial,
          modelo_veiculo_id: modelo_veiculo_id
        }

        // insert query
        dbConn.query('INSERT INTO veiculo SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)

                // render to add.ejs
                res.render('veiculos/add', {
                    placa: form_data.placa,
                    volume_reservatorio: form_data.volume_reservatorio,
                    ano_fabricacao: form_data.ano_fabricacao,
                    ano_modelo: form_data.ano_modelo,
                    hodometro_inicial: form_data.hodometro_inicial,
                    modelo_veiculo_id: form_data.modelo_veiculo_id

                })
            } else {
                req.flash('success', 'Veiculo successfully added');
                res.redirect('/veiculos');
            }
        })
    }
})

// display edit veiculos page
router.get('/edit/(:id)', function(req, res, next) {

    let id = req.params.id;

    dbConn.query('SELECT * FROM veiculo WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err

        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Veiculo not found with id = ' + id)
            res.redirect('/veiculos')
        }
        // if veiculo found
        else {
            // render to edit.ejs
            res.render('veiculos/edit', {
                id: rows[0].id,
                placa: rows[0].placa,
                volume_reservatorio: rows[0].volume_reservatorio,
                ano_fabricacao: rows[0].ano_fabricacao,
                ano_modelo: rows[0].ano_modelo,
                hodometro_inicial: rows[0].hodometro_inicial,
                modelo_veiculo_id: rows[0].modelo_veiculo_id

            })
        }
    })
})

// update veiculos data
router.post('/update/:id', function(req, res, next) {

    let id = req.params.id;
    let placa = req.body.placa;
    let volume_reservatorio = req.body.volume_reservatorio;
    let ano_fabricacao = req.body.ano_fabricacao;
    let ano_modelo = req.body.ano_modelo;
    let hodometro_inicial = req.body.hodometro_inicial;
    let modelo_veiculo_id = req.body.modelo_veiculo_id;

    let errors = false;

    if(placa.length === 0 || volume_reservatorio.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Informe e Placa e Volume do Rerservatorio");
        // render to add.ejs with flash message
        res.render('veiculos/edit', {
            id: req.params.id,
            placa: placa,
            volume_reservatorio: volume_reservatorio,
            ano_fabricacao: ano_fabricacao,
            ano_modelo: ano_modelo,
            hodometro_inicial: hodometro_inicial,
            modelo_veiculo_id: modelo_veiculo_id

        })
    }

    // if no error
    if( !errors ) {

        var form_data = {
          id: id,
          placa: placa,
          volume_reservatorio: volume_reservatorio,
          ano_fabricacao: ano_fabricacao,
          ano_modelo: ano_modelo,
          hodometro_inicial: hodometro_inicial,
          modelo_veiculo_id: modelo_veiculo_id,
        }
        // update query
        dbConn.query('UPDATE veiculo SET ? WHERE id = ' + id, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('veiculos/edit', {
                    id: req.params.id,
                    placa: form_data.placa,
                    volume_reservatorio: form_data.volume_reservatorio,
                    ano_fabricacao: form_data.ano_fabricacao,
                    ano_modelo: form_data.ano_modelo,
                    hodometro_inicial: form_data.hodometro_inicial,
                    modelo_veiculo_id: form_data.modelo_veiculo_id
                })
            } else {
                req.flash('success', 'veiculo successfully updated');
                res.redirect('/veiculos');
            }
        })
    }
})

// delete Veiculos
router.get('/delete/(:id)', function(req, res, next) {

    let id = req.params.id;

    dbConn.query('DELETE FROM veiculo WHERE id = ' + id, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to veiculos page
            res.redirect('/veiculos')
        } else {
            // set flash message
            req.flash('success', 'Veiculo successfully deleted! ID = ' + id)
            // redirect to veiculos page
            res.redirect('/veiculos')
        }
    })
})

module.exports = router;
