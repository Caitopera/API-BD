const express = require("express")
const app = express()
let port = 3000
const fs = require('fs')

app.route('/users/:name')
    .get((req, res) => {
        let parametros = req.params
        parametros.name.toLowerCase()
        //res.send('Tome as informacoes do cliente ' + parametros.name) 
            // Não dá pra enviar duas informaçoes de tipos diferentes no mesmo response
        fs.readFile('clientes.json', (err, data) => {
            const loja = JSON.parse(data)
            //const cliente = clientes.find(c => c["nome"] === parametros.name)
            let clientes = loja['clientes']
            console.log(clientes)
            res.json(clientes.find(c => parametros.name.toUpperCase() === c.nome.toUpperCase()))
            //res.json(clientes)
        })
    })

    .post((req, res) => {
        res.send('Insira as info')
    })


app.listen(port)