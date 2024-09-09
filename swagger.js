const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'API-BD',
        version: '1.0.0',
        description: 'Documentação da atividade API de Banco de Dados I usando Swagger',
      },
      servers: [
        {
          url: 'http://44.196.19.42:80',
        },
      ],
      paths: {
        '/users': {
          get: {
            summary: 'Retorna um usuário especificado pelo cpf',
            parameters: [
                {
                    "name": "cpf",
                    "in": "query",
                    "required": true,
                    "description": "CPF do usuário que deseja buscar.",
                    "schema": {
                        "type": "string",
                        "example": "12345678900"
                    }
                }
            ],
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
                            description: '- cpf do usuário \n- Deve conter 11 digitos',
                            example: 12345678912,
                        },
                        nome: {
                            type: 'string',
                            description: '- Nome do usuário\n- Não pode possuir digitos na string',
                            example: "Jose",
                        },
                        data_nascimento: {
                            type: 'string',
                            description: '- Data de nascimento do usuário\n- Deve ser uma data válida no formato MM-DD-YYYY e não pode ser maior que a data atual',
                            example: '12-23-1979',
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
                        example: 12345678912,
                      },
                      nome: {
                        type: 'string',
                        description: '- Nome do usuário\n- Não pode possuir digitos na string',
                        example: "Jose",
                      },
                      data_nascimento: {
                        type: 'string',
                        description: '- Data de nascimento do usuário\n- Deve ser uma data válida no formato MM-DD-YYYY e não pode ser maior que a data atual',
                        example: '12-23-1979',
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
                        example: 12345678912,
                      },
                      nome: {
                        type: 'string',
                        description: '- Nome do usuário\n- Não pode possuir digitos na string',
                        example: "Jose",
                      },
                      data_nascimento: {
                        type: 'string',
                        description: '- Data de nascimento do usuário\n- Deve ser uma data válida no formato MM-DD-YYYY e não pode ser maior que a data atual',
                        example: '12-23-1979',
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
        '/users/admin':{
         get: {
            summary: 'Retorna uma lista dos usuários do sistema',
            requestBody: {
              required: false,
            },
            responses: {
              200: {
                description: 'Lista de usuários',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        usuarios: {
                            type: 'array',
                            description: '- Lista de usuários do sistema',
                            items: {
                                type: 'object',
                                properties: {
                                    cpf: {
                                        type: 'integer',
                                        description: '- cpf do usuário \n- Deve conter 11 digitos',
                                        example: 12345678912,
                                      },
                                    nome: {
                                        type: 'string',
                                        description: '- Nome do usuário\n- Não pode possuir digitos na string',
                                        example: "Jose",
                                      },
                                    data_nascimento: {
                                        type: 'string',
                                        description: '- Data de nascimento do usuário\n- Deve ser uma data válida no formato MM-DD-YYYY e não pode ser maior que a data atual',
                                        example: '12-23-1979',
                                      },
                                }
                            }
                        },
                      },
                    },
                  },
                },
              },
              404: {
                description: 'Erro na leitura do arquivo de usuários',
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
          delete: {
            summary: 'Deleta um usuário do sistema',
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
                        example: 12345678912,
                      },
                    },
                  },
                },
              },
            },
            responses: {
              200: {
                description: 'Usuário deletado',
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
                description: 'Erro em deletar um usuário',
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
