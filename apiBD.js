const usuariosBD = require('./usuariosBD')
const express = require('express')
const app = express()
const port = process.env.PORT || 80;
const swaggerSetup = require('./swagger');

swaggerSetup(app);

app.use(express.json())

app.route('/users')
    .get((req, res) => {
        if(!req.is('json'))
            res.status(404).json({message : "ERROR : Envie um arquivo do tipo JSON"})
        try{
            usuariosBD.getUser(req.body, (user) => {
                if(user)
                    res.status(200).json(user)
                else
                    res.status(404).json({message : "ERROR : Usuario nao encontrado"})
            })
        }
        catch (err){
            res.status(404).json({message : err})
        }
    })

    .post((req, res) => {
        if(!req.is('json'))
            res.status(404).json({message : "ERROR : Envie um arquivo do tipo JSON"})

        try{
            if(!usuariosBD.pushUser(req.body))
                res.status(404).json({message : "ERROR : Usuario já está cadastrado"})
            else
            res.status(200).json({message : "Usuario cadastrado"})
        }
        catch (err){
            res.status(404).json({message : err})
        }
    })
    
    .put((req, res) => {
        if(!req.is('json'))
            res.status(404).json({message : "ERROR : Envie um arquivo do tipo JSON"})
        try{
            usuariosBD.updateUser(req.body)
            res.status(200).json({message : "Usuario atualizado"})
        }
        catch (err){
            res.status(404).json({message : err})
        }
    })


app.listen(port)
