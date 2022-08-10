var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

// display marcas page
router.get('/', function(req, res, next) {

    dbConn.query('SELECT * FROM	modelo_veiculo ORDER BY id desc',function(err,rows)     {

        if(err) {
            req.flash('error', err);
            // render to views/marcas/index.ejs
            res.render('marcas',{data:''});
        } else {
            console.log(rows);
            // render to views/marcas/index.ejs
            res.render('marcas',{data:rows});
        }
    });
});

// display add veiculos page
router.get('/add', function(req, res, next) {
    // render to add.ejs
    res.render('marcas/add', {
        nome: '',
        fabricante: ''
    })
})

// add a new veiculos
router.post('/add', function(req, res, next) {

    let nome = req.body.nome;
    let fabricante = req.body.fabricante;

    let errors = false;

    if(nome.length === 0 || fabricante.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Informe a Nome e Fabricante");
        // render to add.ejs with flash message
        res.render('marcas/add', {
            nome: nome,
            fabricante: fabricante

        })
    }

    // if no error
    if(!errors) {

        var form_data = {
          nome: nome,
          fabricante: fabricante
        }

        // insert query
        dbConn.query('INSERT INTO modelo_veiculo SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)

                // render to add.ejs
                res.render('marcas/add', {
                    nome: form_data.nome,
                    fabricante: form_data.fabricante

                })
            } else {
                req.flash('success', 'Marca adicionado com sucesso');
                res.redirect('/marcas');
            }
        })
    }
})

// display edit marcas page
router.get('/edit/(:id)', function(req, res, next) {

    let id = req.params.id;

    dbConn.query('SELECT * FROM modelo_veiculo WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err

        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Marca nao encontrada com id = ' + id)
            res.redirect('/marcas')
        }
        // if marca found
        else {
            // render to edit.ejs
            res.render('marcas/edit', {
                id: rows[0].id,
                nome: rows[0].nome,
                fabricante: rows[0].fabricante

            })
        }
    })
})

// update marcas data
router.post('/update/:id', function(req, res, next) {

    let id = req.params.id;
    let nome = req.body.nome;
    let fabricante = req.body.fabricante;

    let errors = false;

    if(nome.length === 0 || fabricante.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Informe Nome e Fabricante");
        // render to add.ejs with flash message
        res.render('marcas/edit', {
            id: req.params.id,
            nome: nome,
            fabricante: fabricante

        })
    }

    // if no error
    if( !errors ) {

        var form_data = {
          id: id,
          nome: nome,
          fabricante: fabricante
        }
        // update query
        dbConn.query('UPDATE modelo_veiculo SET ? WHERE id = ' + id, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('marcas/edit', {
                    id: req.params.id,
                    nome: form_data.nome,
                    fabricante: form_data.fabricante
                })
            } else {
                req.flash('success', 'Marca atualizado com sucesso');
                res.redirect('/marcas');
            }
        })
    }
})

// delete Veiculos
router.get('/delete/(:id)', function(req, res, next) {

    let id = req.params.id;

    dbConn.query('DELETE FROM modelo_veiculo WHERE id = ' + id, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to marcas page
            res.redirect('/marcas')
        } else {
            // set flash message
            req.flash('success', 'Marca excluida com sucesso! ID = ' + id)
            // redirect to marcas page
            res.redirect('/marcas')
        }
    })
})

module.exports = router;
