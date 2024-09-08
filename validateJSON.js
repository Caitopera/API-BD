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
    if(valid)
        return valid;
    else
        return valid;
}

const validarDataNascimento = (dateString) => {
    const date = new Date(dateString);
    if(isNaN(date.getTime()))
        return false
    
    const now = new Date();
    if (date > now) 
        return false;
    
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

const data1 = {
    cpf: 123,
    nome: "José",
    data_nascimento: "12-23-2010" 
};

const data2 = {
    cpf: 12345678987,
    nome: "José",
    data_nascimento: "12-02-2030" 
};

if(validarSchemaJSON(data2))
    console.log(validarCampos(data2))
