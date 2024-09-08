const fs = require('fs')

const searchUser = (usuarios, cpfSearch) => {
    userSearched = usuarios.find(u => u.cpf === parseInt(cpfSearch))
    if(userSearched === undefined)
        throw "Error : Usuario nao encontrado"
    else
        return userSearched
}

function getUser(cpf, callback){
    fs.readFile('users.json', (err, data) => {
        const loja = JSON.parse(data)
        let usuarios = loja['usuarios']
        try{
            const userSearched = searchUser(usuarios, cpf)
            callback(userSearched)
        }
        catch (error){
            console.log(error)
            callback(undefined)
        }
    })
}

const pushUser = function(user){
    fs.readFile('users.json', (err, data) => {
        const loja = JSON.parse(data)
        loja.usuarios.push(user)
        fs.writeFile("users.json", JSON.stringify(loja), (err) => {
            if(err) throw err
        })
    })
}

const updateUser = (user) => {
    fs.readFile('users.json', (err, data) => {
        const loja = JSON.parse(data)
        const indexUser = loja.usuarios.findIndex((u) => {return u.cpf === parseInt(user.cpf)})
        loja.usuarios[indexUser] = user
        fs.writeFile("users.json", JSON.stringify(loja), (err) => {
            if(err) throw err
        })
    })
}

module.exports = {
    getUser,
    pushUser,
    updateUser
}
