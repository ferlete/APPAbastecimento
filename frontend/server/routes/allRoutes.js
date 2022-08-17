const express = require('express')
const router = express.Router()
const services = require('../services/render')

//API functions 
router.get('/',services.indexRoutes)
router.get('/veiculos',services.indexVeiculos)
router.get('/veiculos/edit/:id',services.editVeiculo)
router.get('/veiculos/add',services.createVeiculo)


module.exports = router