const axios = require('axios')

// GET home page
exports.indexRoutes = (req, res) => {
    res.render('index', { title: 'T Transportadora LTDA' });
}

// Listagem de Veiculos
exports.indexVeiculos = (req, res) => {

    axios.get('http://localhost:8000/veiculos')
        .then(allveiculo => {
            res.render('veiculos', {
                data: allveiculo.data
            })
        })
        .catch(err => {
            res.send(err)
        })


}
// Busca veiculo por ID
exports.editVeiculo = (req, res) => {

    id = req.params.id;

    axios.get('http://localhost:8000/veiculos/' + id)
        .then(veiculo => {

            res.render('veiculos/edit', {
                data: veiculo.data
            })
        })
        .catch(err => {
            res.send(err)
        })

}

// Create a new veiculo
exports.createVeiculo = (req, res) => {

    console.log(res)
    res.render('veiculos/add', {
        data:''

    })



}