import swaggerJSDoc, {OAS3Definition,OAS3Options} from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
    openapi: "3.0.0",
    info: {
        title: "Documentacion de API-Vacunacion",
        version: "1.0.0",
    },
    servers: [
        {
            url: "http://localhost:3000",
        },
    ],
    paths: {
        "/personas":{
            get: {
                summary: "Personas registradas",
                description: "Devuelve todas las personas registradas",
                responses: {
                    200: {
                        description: "OK"
                    }
                }
            },
            post: {
                summary: "Agregar persona",
                description: "Agrega a una persona al registro",
                requestBody: {
                    required: true,
                    content: {
                      "application/json": {
                        schema: {
                          $ref: "#/components/schemas/persona"
                        }
                      }
                    }
                  },
                responses: {
                    200: {
                        description: "OK - Se agrega la persona"
                    },
                    400: {
                        description: "BAD REQUEST - Ya hay una persona con el DNI ingresado"
                    }
                }
            }
        },
        "/personas/{dni}":{
            delete: {
                summary: "Borrar persona",
                description: "Borra a una persona al registro",
                parameters: [
                    {
                    name:"dni",
                    in: "path",
                    description: "Borra por DNI"
                }
                ],
                responses: {
                    204: {
                        description: "OK - Se borra la persona"
                    },
                    404: {
                        description: "NOT FOUND - No se encuentra a la persona"
                    }
                }
            },
            put: {
                summary: "Modificar persona",
                description: "Modifica totalmente a una persona del registro",
                parameters: [
                    {
                    name:"dni",
                    in: "path",
                    description: "Busca por DNI"
                }
                ],
                requestBody: {
                    required: true,
                    content: {
                      "application/json": {
                        schema: {
                          $ref: "#/components/schemas/persona"
                        }
                      }
                    }
                  },
                responses: {
                    204: {
                        description: "OK - Se modifica a la persona"
                    },
                    404: {
                        description: "NOT FOUND - No se encuentra a la persona"
                    }
                }
            },
            patch: {
                summary: "Actualizar persona",
                description: "Modifica parcialmente a una persona del registro",
                parameters: [
                    {
                    name:"dni",
                    in: "path",
                    description: "Busca por DNI"
                }
                ],
                requestBody: {
                    required: true,
                    content: {
                      "application/json": {
                        schema: {
                          $ref: "#/components/schemas/persona"
                        }
                      }
                    }
                },
                responses: {
                    204: {
                        description: "OK - Se modifica a la persona"
                    },
                    404: {
                        description: "NOT FOUND - No se encuentra a la persona"
                    }
                }
            }
        },
        "/personas/{dni}/aplicaciones":{
            get: {
                summary: "Aplicaciones de una persona",
                description: "Devuelve todas las aplicaciones de una persona",
                parameters: [
                    {
                    name:"dni",
                    in: "path",
                    description: "Busca por DNI"
                    }
                ],
                responses: {
                    200: {
                        description: "OK"
                    },
                    404: {
                        description: "NOT FOUND - No se encontró a la persona"
                    }
                }
            },
            post: {
                summary: "Agregar aplicacion",
                description: "Agrega una aplicacion a una persona",
                parameters: [
                    {
                    name:"dni",
                    in: "path",
                    description: "Busca por DNI"
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                      "application/json": {
                        schema: {
                          $ref: "#/components/schemas/aplicacion"
                        }
                      }
                    }
                  },
                responses: {
                    200: {
                        description: "OK - Se agrega la aplicacion"
                    },
                    404: {
                        description: "NOT FOUND - No se encontró a la persona"
                    }
                }
            }
        },
        "/personas/dosisFaltantes/{id}": {
            get: {
                summary: "Personas con dosis faltantes",
                description: "Devuelve todas las personas que requieren una dosis",
                parameters: [
                    {
                    name:"id",
                    in: "path",
                    description: "Busca por ID de vacuna"
                    }
                ],
                responses: {
                    200: {
                        description: "OK"
                    },
                    404: {
                        description: "NOT FOUND - No se encontró una vacuna con esa ID"
                    }
                }
            },
        },
        "/vacunas":{
            get: {
                summary: "Vacunas registradas",
                description: "Devuelve todas las Vacunas registradas",
                responses: {
                    200: {
                        description: "OK"
                    }
                }
            },
            post: {
                summary: "Agregar vacuna",
                description: "Agrega una vacuna al registro",
                requestBody: {
                    required: true,
                    content: {
                      "application/json": {
                        schema: {
                          $ref: "#/components/schemas/vacuna"
                        }
                      }
                    }
                  },
                responses: {
                    200: {
                        description: "OK - Se agrega la vacuna"
                    },
                    400: {
                        description: "BAD REQUEST - Ya hay una vacuna con ese ID"
                    }
                }
            }
        },
        "/vacunas/{id}":{
            delete: {
                summary: "Borrar vacuna",
                description: "Borra a una vacuna al registro",
                parameters: [
                    {
                    name:"id",
                    in: "path",
                    description: "Borra por ID"
                }
                ],
                responses: {
                    204: {
                        description: "OK - Se borra la vacuna"
                    },
                    404: {
                        description: "NOT FOUND - No se encuentra la vacuna"
                    }
                }
            },
            put: {
                summary: "Modificar vacuna",
                description: "Modifica totalmente a una vacuna del registro",
                parameters: [
                    {
                    name:"id",
                    in: "path",
                    description: "Busca por ID"
                }
                ],
                requestBody: {
                    required: true,
                    content: {
                      "application/json": {
                        schema: {
                          $ref: "#/components/schemas/vacuna"
                        }
                      }
                    }
                  },
                responses: {
                    204: {
                        description: "OK - Se modifica la vacuna"
                    },
                    404: {
                        description: "NOT FOUND - No se encuentra la vacuna"
                    }
                }
            },
            patch: {
                summary: "Actualizar vacuna",
                description: "Modifica parcialmente una vacuna del registro",
                parameters: [
                    {
                    name:"id",
                    in: "path",
                    description: "Busca por ID"
                }
                ],
                requestBody: {
                    required: true,
                    content: {
                      "application/json": {
                        schema: {
                          $ref: "#/components/schemas/vacuna"
                        }
                      }
                    }
                },
                responses: {
                    200: {
                        description: "OK - Se modifica la vacuna"
                    },
                    404: {
                        description: "NOT FOUND - No se encuentra la vacuna"
                    }
                }
            }
        },
        "/vacunas/porFabricante/{fabricante}": {
            get: {
                summary: "Filtrar vacunas",
                description: "Devuelve las vacunas que fabrica un laboratorio",
                parameters: [
                    {
                    name:"fabricante",
                    in: "path",
                    description: "Filtra por fabricante"
                }
                ],
                responses: {
                    200: {
                        description: "OK"
                    }
                }
            }
        }
    },
    components: {
        /*securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
            },
        },*/
        schemas:{
            persona:{
                type: "object",
                required: ["dni", "nombre", "apellido", "nacimiento", "sexo", "aplicaciones"],
                properties: {
                    dni: {
                        type: "number",
                    },
                    nombre: {
                        type: "string",
                    },
                    apellido: {
                        type: "string",
                    },
                    nacimiento: {
                        type: "string",
                        format: "date-time"
                    },
                    sexo: {
                        type: "string",
                        description: "M,F,X"
                    },
                    aplicaciones: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/aplicacion"
                        }
                    }
                }
            },
            vacuna:{
                type: "object",
                required: ["id", "descripcion", "fabricantes", "tipo", "dosisRequeridas"],
                properties: {
                    id: {
                        type: "number",
                    },
                    descripcion: {
                        type: "string",
                    },
                    fabricantes: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },
                    tipo: {
                        type: "string",
                    },
                    dosisRequeridas: {
                        type: "number",
                    }
                }
            },
            aplicacion:{
                type: "object",
                required: ["fechaDeAplicacion", "vacunaAplicada", "fabricante", "dosis"],
                properties: {
                    fechaDeAplicacion: {
                        type: "string",
                        format: "date-time"
                    },
                    vacunaAplicada: {
                        type: "number",
                    },
                    fabricante: {
                        type: "string",
                    },
                    dosis: {
                        type: "number",
                    },
                }
            }
        }
    }
};

const swaggerOptions: OAS3Options = {
    swaggerDefinition,
    apis: ["./routes/*.ts"]
}

export default swaggerJSDoc(swaggerOptions);