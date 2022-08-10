var express = require('express');
var router = express.Router();
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
        name: '',
        author: ''
    })
})

// add a new abastecimentos
router.post('/add', function(req, res, next) {

    let name = req.body.name;
    let author = req.body.author;
    let errors = false;

    if(name.length === 0 || author.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Please enter name and author");
        // render to add.ejs with flash message
        res.render('abastecimentos/add', {
            name: name,
            author: author
        })
    }

    // if no error
    if(!errors) {

        var form_data = {
            name: name,
            author: author
        }

        // insert query
        dbConn.query('INSERT INTO lancamento_abastecimento SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)

                // render to add.ejs
                res.render('abastecimentos/add', {
                    name: form_data.name,
                    author: form_data.author
                })
            } else {
                req.flash('success', 'Abastecimento successfully added');
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
            req.flash('error', 'Abastecimento not found with id = ' + id)
            res.redirect('/abastecimentos')
        }
        // if abastecimento found
        else {
            // render to edit.ejs
            res.render('abastecimentos/edit', {
                title: 'Edit Book',
                id: rows[0].id,
                name: rows[0].name,
                author: rows[0].author
            })
        }
    })
})

// update abastecimentos data
router.post('/update/:id', function(req, res, next) {

    let id = req.params.id;
    let name = req.body.name;
    let author = req.body.author;
    let errors = false;

    if(name.length === 0 || author.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Please enter name and author");
        // render to add.ejs with flash message
        res.render('abastecimentos/edit', {
            id: req.params.id,
            name: name,
            author: author
        })
    }

    // if no error
    if( !errors ) {

        var form_data = {
            name: name,
            author: author
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
                    name: form_data.name,
                    author: form_data.author
                })
            } else {
                req.flash('success', 'abastecimento successfully updated');
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
