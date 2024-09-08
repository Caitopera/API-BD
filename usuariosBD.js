const fs = require('fs')
const { validarJSON_Create, validarJSON_Get } = require('./validateJSON')

const searchUser = (usuarios, cpfSearch) => {
    userSearched = usuarios.find(u => u.cpf === parseInt(cpfSearch))
    if(userSearched === undefined)
        return false
    else
        return userSearched
}

function getUser(cpf, callback){
    try{
        fs.readFile('users.json', (err, data) => {
            if(err){
                callback(err, undefined)
                return
            } 

            let loja
            try{
                loja = JSON.parse(data)
            }
            catch (parseErr) {
                callback(new Error("ERROR: Falha ao parsear o arquivo JSON"), undefined);
                return;
            }

            let usuarios = loja['usuarios']
            const userSearched = searchUser(usuarios, cpf)
            if(!userSearched){
                callback(new Error("ERROR: Usuário não encontrado"), undefined);
                return
            }
            callback(null, userSearched)
        })
    }
    catch(err){
        throw err
    }
}

const listUsers = (callback) => {
    try{
        fs.readFile('users.json', (err, data) => {
            if(err){
                callback(err, undefined)
                return
            }

            let loja
            try{
                loja = JSON.parse(data)
            }
            catch (parseErr) {
                callback(new Error("ERROR: Falha ao parsear o arquivo JSON"), undefined);
                return;
            }

            callback(null, loja)
        })
    }
    catch(err){
        throw err
    }
}

const pushUser = function(user, callback){
    if(!validarJSON_Create(user))
        throw "ERROR : Erro no JSON para create"

    try{
        fs.readFile('users.json', (err, data) => {
            if(err){
                callback(err, undefined)
                return
            }

            let loja
            try{
                loja = JSON.parse(data)
            }
            catch (parseErr) {
                callback(new Error("ERROR: Falha ao parsear o arquivo JSON"), undefined);
                return;
            }

            if(searchUser(loja.usuarios, user.cpf)){
                callback(new Error("ERROR : Usuário já está cadastrado no sistema"), undefined)
                return
            }
            loja.usuarios.push(user)
            fs.writeFile("users.json", JSON.stringify(loja), (err) => {
                if(err) {
                    callback(err, undefined)
                    return
                }
                callback(null, "Usuário Cadastrado")
            })
        })
    }
    catch (err){
        throw err
    }
}

const updateUser = (user, callback) => {
    if(!validarJSON_Create(user))
        throw "ERROR : Erro no JSON para update"

    try{
        fs.readFile('users.json', (err, data) => {
            if(err){
                callback(err, undefined)
                return
            }

            let loja
            try{
                loja = JSON.parse(data)
            }
            catch (parseErr) {
                callback(new Error("ERROR: Falha ao parsear o arquivo JSON"), undefined);
                return;
            }

            if(!searchUser(loja.usuarios, user.cpf)){
                callback(new Error("ERROR : Usuário não está cadastrado no sistema"), undefined)
                return
            }
            const indexUser = loja.usuarios.findIndex((u) => {return u.cpf === parseInt(user.cpf)})
            loja.usuarios[indexUser] = user
            fs.writeFile("users.json", JSON.stringify(loja), (err) => {
                if(err) {
                    callback(err, undefined)
                    return
                }
                callback(null, "Usuário Atualizado")
            })
        })
    }
    catch(err){
        throw(err)
    }
}

const deleteUser = (json, callback) => {
    if(!validarJSON_Get(json))
        throw "ERROR : Erro no JSON para delete"

    try{
        fs.readFile('users.json', (err, data) => {
            if(err){
                callback(err, undefined)
                return
            }

            let loja
            try{
                loja = JSON.parse(data)
            }
            catch (parseErr) {
                callback(new Error("ERROR: Falha ao parsear o arquivo JSON"), undefined);
                return;
            }
            let usuarios = loja['usuarios']
            const userSearched = searchUser(usuarios, json.cpf)
            if(!userSearched){
                callback(new Error("ERROR : Usuario nao encontrado"), undefined)
                return
            }
    
            usuarios = usuarios.filter(user => user.cpf !== userSearched.cpf)
            loja['usuarios'] = usuarios;
            fs.writeFile('users.json', JSON.stringify(loja, null, 2), (err) => {
                if (err) {
                    callback(err, undefined)
                    return
                }
                callback(null, "Usuário deletado");
            });
        })
    }
    catch(err){
        throw err
    }
}

module.exports = {
    getUser,
    pushUser,
    updateUser,
    listUsers,
    deleteUser
}