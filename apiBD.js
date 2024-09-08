const usuariosBD = require('./usuariosBD')
const express = require('express')
const app = express()
const port = process.env.PORT || 80;
const swaggerSetup = require('./swagger');

swaggerSetup(app);

app.use(express.json())


app.route('/users')
    .get((req, res) => {
        try{
            const cpf = req.query.cpf;
            usuariosBD.getUser(cpf, (err, data) => {
                if(err)
                    res.status(404).json({message: err.message})
                else if(data)
                    res.status(200).json(data)
                else
                    res.status(404).json({message: "ERROR : Erro inesperado ao tentar encontrar usuario"})
            })
        }
        catch (err){
            res.status(404).json({message : err})
        }
    })

    .post((req, res) => {
        try{
            verificaTipoJSON(req, res)
            usuariosBD.pushUser(req.body, (err, data) => {
                if(err)
                    res.status(404).json({message: err.message})
                else if(data)
                    res.status(200).json({message: data})
                else
                    res.status(404).json({message: "ERROR : Erro inesperado ao tentar cadastrar usuario"})
            })
        }
        catch (err){
            res.status(404).json({message : err})
        }
    })
    
    .put((req, res) => {
        try{
            verificaTipoJSON(req, res)
            usuariosBD.updateUser(req.body, (err, data) => {
                if(err)
                    res.status(404).json({message: err.message})
                else if(data)
                    res.status(200).json({message: data})
                else
                    res.status(404).json({message: "ERROR : Erro inesperado ao tentar atualizar usuario"})
            })
        }
        catch (err){
            res.status(404).json({message : err})
        }
    })

app.route('/users/admin')
    .get((req, res) => {
        try{
            usuariosBD.listUsers((err, data) => {
                if(err)
                    res.status(404).json({message: err.message})
                else if(data)
                    res.status(200).json({data})
                else
                    res.status(404).json({message: "ERROR : Erro inesperado ao tentar atualizar usuario"})
            })
        }
        catch (err){
            res.status(404).json({message : err})
        }
    })

    .delete((req, res) => {
        try{
            verificaTipoJSON(req, res)
            usuariosBD.deleteUser(req.body, (err, data) => {
                if(err)
                    res.status(404).json({message: err.message})
                else if(data)
                    res.status(200).json({message: data})
                else
                    res.status(404).json({message: "ERROR : Erro inesperado ao tentar atualizar usuario"})
            })
        }
        catch (err){
            res.status(404).json({message : err})
        }
    })

const verificaTipoJSON = (req, res) => {
    if(!req.is('json'))
        throw "ERROR : Envie um arquivo do tipo JSON"
}

app.listen(port)
