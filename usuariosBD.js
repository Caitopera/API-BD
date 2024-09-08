const fs = require('fs')
const { validarJSON_Create, validarJSON_Get } = require('./validateJSON')

const searchUser = (usuarios, cpfSearch) => {
    userSearched = usuarios.find(u => u.cpf === parseInt(cpfSearch))
    if(userSearched === undefined)
        return false
    else
        return userSearched
}

function getUser(json, callback){
    if(!validarJSON_Get(json))
        throw "ERROR : Erro no JSON para get"
    fs.readFile('users.json', (err, data) => {
        const loja = JSON.parse(data)
        let usuarios = loja['usuarios']
        try{
            const userSearched = searchUser(usuarios, json.cpf)
            if(!userSearched)
                throw "ERROR : Usuario nao encontrado"
            callback(userSearched)
        }
        catch (error){
            console.log(error)
            callback(undefined)
        }
    })
}

const listUsers = (callback) => {
    fs.readFile('users.json', (err, data) => {
        const loja = JSON.parse(data)
        callback(loja)
    })
}

const pushUser = function(user){
    if(!validarJSON_Create(user))
        throw "ERROR : Erro no JSON para create"

    try{
        fs.readFile('users.json', (err, data) => {
            const loja = JSON.parse(data)
            if(searchUser(loja.usuarios, user.cpf))
                return false
            loja.usuarios.push(user)
            fs.writeFile("users.json", JSON.stringify(loja), (err) => {
                if(err) throw err
            })
        })
        return true
    }
    catch{
        return false
    }
}

const updateUser = (user) => {
    if(!validarJSON_Create(user))
        throw "ERROR : Erro no JSON para update"

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
    updateUser,
    listUsers
}
