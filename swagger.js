const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Minha API',
        version: '1.0.0',
        description: 'Documentação da API usando Swagger',
      },
      servers: [
        {
          url: 'http://localhost:80',
        },
      ],
      paths: {
        '/users': {
          get: {
            summary: 'Retorna um usuário especificado pelo cpf',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      cpf: {
                        type: 'integer',
                        description: '- cpf do usuário \n- Deve conter 11 digitos',
                      },
                    },
                  },
                },
              },
            },
            responses: {
              200: {
                description: 'Usuário encontrado',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        cpf: {
                          type: 'integer',
                        },
                        nome: {
                          type: 'string',
                        },
                        data_nascimento: {
                            type: 'string'
                        },
                      },
                    },
                  },
                },
              },
              404: {
                description: 'Usuário não encontrado / erro no formato do arquivo JSON / erro no servidor',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        message: {
                          type: 'string',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          post: {
            summary: 'Cadastra um novo usuário',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      cpf: {
                        type: 'integer',
                        description: '- cpf do usuário \n- Deve conter 11 digitos',
                      },
                      nome: {
                        type: 'string',
                        description: '- Nome do usuário\n- Não pode possuir digitos na string',
                      },
                      data_nascimento: {
                        type: 'string',
                        description: '- Data de nascimento do usuário\n- Deve ser uma data válida no formato MM-DD-YYYY e não pode ser maior que a data atual'
                      },
                    },
                  },
                },
              },
            },
            responses: {
              200: {
                description: 'Usuário cadastrado',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        message: {
                          type: 'string',
                        },
                      },
                    },
                  },
                },
              },
              404: {
                description: 'Erro ao cadastrar usuário ou usuário já cadastrado',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        message: {
                          type: 'string',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          put: {
            summary: 'Atualiza um usuário existente',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      cpf: {
                        type: 'integer',
                        description: '- cpf do usuário \n- Deve conter 11 digitos',
                      },
                      nome: {
                        type: 'string',
                        description: '- Nome do usuário\n- Não pode possuir digitos na string',
                      },
                      data_nascimento: {
                        type: 'string',
                        description: '- Data de nascimento do usuário\n- Deve ser uma data válida no formato MM-DD-YYYY e não pode ser maior que a data atual'
                      },
                    },
                  },
                },
              },
            },
            responses: {
              200: {
                description: 'Usuário atualizado',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        message: {
                          type: 'string',
                        },
                      },
                    },
                  },
                },
              },
              404: {
                description: 'Erro ao atualizar usuário ou erro no formato do arquivo',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        message: {
                          type: 'string',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    apis: ['./routes/apiBD.js'], // Caminho para os arquivos de rotas
  };
  

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};









/*
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Minha API',
      version: '1.0.0',
      description: 'Documentação da API usando Swagger',
    },
    servers: [
      {
        url: 'http://localhost:80',
      },
    ],
  },
  apis: ['./routes/apiBD.js'],
};*/