const Ajv = require('ajv');
const ajv = new Ajv();

const schema = {
    type: "object",
    properties: {
        cpf: { type: "number" },
        nome: { type: "string" },
        data_nascimento: { type: "string" }
    },
    required: ["cpf", "nome", "data_nascimento"],
    additionalProperties: false
};

const validarSchemaJSON = (usuario) => {
    const validate = ajv.compile(schema);
    const valid = validate(usuario);
    if(!valid)
        throw "ERROR : JSON nao segue o schema correto"
    return valid
}

const validarDataNascimento = (dateString) => {
    const date = new Date(dateString);
    if(isNaN(date.getTime()))
        throw "ERROR : Data de nascimento nao e uma data no formato correto"
    
    const now = new Date();
    if (date > now) 
        throw "ERROR : Data de nascimento maior que a data atual"
    
    return true;
}

const validarCampos = (usuario) => {
    // / --> delimita a regex | \ --> indica que o proximo char nao representa um char normal, mas sim um caractere especial (como um digito)
    // {qntd} --> quantidade desse caractere especial | $ --> indica o fim do texto
    const regexCPF = /^\d{11}$/; 
    const regexNome = /^\D+$/; // \D --> representa qualquer char q nao seja um digito | + --> ocorre 1 ou mais vezes
    const validDataNascimento = validarDataNascimento(usuario.data_nascimento)
    if(!regexCPF.test(usuario.cpf))
        throw "ERROR : cpf deve ser inteiro e conter 11 digitos" 
    
    if(!regexNome.test(usuario.nome))
        throw "ERROR : nome deve conter apenas caracteres" 
    
    if(!validDataNascimento)
        throw "ERROR : data de nascimento deve estar no formato dd-mm-aaaa e deve ser uma data valida"
    
    return true
}

const validarJSON = (usuario) => {
    if(!validarSchemaJSON(usuario))
        return false
    if(!validarCampos(usuario))
        return false

    return true
}

/*console.log(validarJSON({
    "cpf" : 12345678987,
    "nome" : "Jorge",
    "data_nascimento" : "12-12-2004"
}))*/

module.exports = {
    validarJSON
}
