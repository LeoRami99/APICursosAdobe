const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cursoRoutes = require('./api/cursos/controllerCurso');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swaggerOptions'); // Importa la configuración

const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Configura Swagger
const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', cursoRoutes);

// Middleware de manejo de errores
app.use(function (err, req, res, next) {
  res.status(500).send('Ocurrió un error en el servidor');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

module.exports = app;
