const express = require("express")
const app = express()
const router = express.Router()
let port = 3000

router.use((req, res, next) => {
    console.log('Rodando...')
    next()
})

app.route('/users/:id')
    .get((req, res) => {
        let parametros = req.params
        res.send('Tome as informacoes do cliente ' + parametros.id)
    })

    .post((req, res) => {
        res.send('Insira as info')
    })


app.listen(port)