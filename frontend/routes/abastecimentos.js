var express = require('express');
var router = express.Router();
var moment = require('moment')
var dbConn  = require('../lib/db');

// display abastecimentos page
router.get('/', function(req, res, next) {

    dbConn.query('SELECT * FROM	lancamento_abastecimento ORDER BY id desc',function(err,rows)     {

        if(err) {
            req.flash('error', err);
            // render to views/abastecimentos/index.ejs
            res.render('abastecimentos',{data:''});
        } else {
            console.log(rows);
            // render to views/abastecimentos/index.ejs
            res.render('abastecimentos',{data:rows});
        }
    });
});

// display add abastecimento page
router.get('/add', function(req, res, next) {
    // render to add.ejs
    res.render('abastecimentos/add', {
        data: '',
        volume: '',
        hodometro: '',
        valor_litro: '',
        veiculo_id : '',
        posto_id : ''
    })
})

// add a new abastecimentos
router.post('/add', function(req, res, next) {

    //let data = req.body.data;
    let data =  moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    let volume = req.body.volume;
    let hodometro = req.body.hodometro;

    //fazer calculo de valor por litro
    let valor_litro = req.body.valor_abastecimento/ req.body.volume;
    let veiculo_id = req.body.veiculo_id;
    let posto_id = req.body.posto_id;

    let errors = false;

    if(veiculo_id.length === 0 || posto_id.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Informe Veiculo e Posto");
        // render to add.ejs with flash message
        res.render('abastecimentos/add', {
            //data: data,
            data: Date.now(),
            volume: volume,
            hodometro: hodometro,
            valor_litro: valor_litro,
            veiculo_id: veiculo_id,
            posto_id: posto_id


        })
    }

    // if no error
    if(!errors) {

        var form_data = {
          data: data,
          volume: volume,
          hodometro: hodometro,
          valor_litro: valor_litro,
          veiculo_id: veiculo_id,
          posto_id: posto_id
        }

        // insert query
        dbConn.query('INSERT INTO lancamento_abastecimento SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)

                // render to add.ejs
                res.render('abastecimentos/add', {
                    data: form_data.data,
                    volume: form_data.volume,
                    hodometro: form_data.hodometro,
                    valor_litro: form_data.valor_litro,
                    veiculo_id: form_data.veiculo_id,
                    posto_id: form_data.posto_id
                })
            } else {
                req.flash('success', 'Abastecimento incluido com sucesso');
                res.redirect('/abastecimentos');
            }
        })
    }
})

// display edit abastecimento page
router.get('/edit/(:id)', function(req, res, next) {

    let id = req.params.id;

    dbConn.query('SELECT * FROM lancamento_abastecimento WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err

        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Abastecimento nao encontrado com id = ' + id)
            res.redirect('/abastecimentos')
        }
        // if abastecimento found
        else {
            // render to edit.ejs
            res.render('abastecimentos/edit', {
              data: rows[0].data,
              volume: rows[0].volume,
              hodometro: rows[0].hodometro,
              valor_litro: rows[0].valor_litro,
              veiculo_id: rows[0].veiculo_id,
              posto_id: rows[0].posto_id

            })
        }
    })
})

// update abastecimentos data
router.post('/update/:id', function(req, res, next) {

    let id = req.params.id;
    let data = req.body.data;
    let volume = req.body.volume;
    let hodometro = req.body.hodometro;
    let valor_litro = req.body.valor_litro;
    let veiculo_id = req.body.veiculo_id;
    let posto_id = req.body.posto_id;

    let errors = false;

    if(veiculo_id.length === 0 || posto_id.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Informe o Veiculo e Posto");
        // render to add.ejs with flash message
        res.render('abastecimentos/edit', {
            id: req.params.id,
            data: data,
            volume: volume,
            hodometro: hodometro,
            valor_litro: valor_litro,
            veiculo_id: veiculo_id,
            posto_id: posto_id
        })
    }

    // if no error
    if( !errors ) {

        var form_data = {
          data: data,
          volume: volume,
          hodometro: hodometro,
          valor_litro: valor_litro,
          veiculo_id: veiculo_id,
          posto_id: posto_id
        }
        // update query
        dbConn.query('UPDATE lancamento_abastecimento SET ? WHERE id = ' + id, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('abastecimentos/edit', {
                    id: req.params.id,
                    data: form_data.data,
                    volume: form_data.volume,
                    hodometro: form_data.hodometro,
                    valor_litro: form_data.valor_litro,
                    veiculo_id: form_data.veiculo_id,
                    posto_id: form_data.posto_id
                })
            } else {
                req.flash('success', 'Abastecimento Atualizado com Sucesso');
                res.redirect('/abastecimentos');
            }
        })
    }
})

// delete abastecimentos
router.get('/delete/(:id)', function(req, res, next) {

    let id = req.params.id;

    dbConn.query('DELETE FROM lancamento_abastecimento WHERE id = ' + id, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to abastecimentos page
            res.redirect('/abastecimentos')
        } else {
            // set flash message
            req.flash('success', 'abastecimentos successfully deleted! ID = ' + id)
            // redirect to abastecimentos page
            res.redirect('/abastecimentos')
        }
    })
})


module.exports = router;
