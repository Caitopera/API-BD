const usuariosBD = require('./usuariosBD')
const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.route('/users/:cpf')
    .get((req, res) => {
        let parametros = req.params
        usuariosBD.getUser(parametros.cpf, (user) => {
            if(user){
                res.send(user)
            }
            else
                res.send("ERROR : Usuario nao encontrado")
        })
    })

app.route('/users')
    .post((req, res) => {
        if(!req.is('json'))
            throw 'ERROR : Envie um arquivo no formato .json'
        if(!usuariosBD.pushUser(req.body))
            res.send('Usuario ja esta cadastrado')
        else
            res.send('Usuario Cadastrado')
    })

    .put((req, res) => {
        if(!req.is('json'))
            throw 'ERROR : Envie um arquivo no formato .json'
        usuariosBD.updateUser(req.body)
        res.send('Usuario Atualizado')
    })


app.listen(port)
