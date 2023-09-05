module.exports = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API de Cursos Adobe',
        version: '1.0.0',
      },
    },
    apis: ['./api/cursos/controllerCurso.js'], // Ruta al controlador
  };
  