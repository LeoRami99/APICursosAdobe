const express = require("express");
const router = express.Router();
const Curso = require("./clase/Curso");
/**
 * @swagger
 * /api/:
 *   get:
 *     summary: Obtiene todos los clientes
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida correctamente
 *       500:
 *         description: Ocurrió un error en el servidor
 */

router.get("/", (req, res) => {
	res.send("API de Cursos Adobe");
});

/**
 * @swagger
 * /api/create-client:
 *   post:
 *     summary: Crea un cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - nit
 *             properties:
 *               nombre:
 *                 type: string
 *               nit:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente creado correctamente
 *         content:
 *           application/json:
 *             example:
 *               mensaje: Cliente creado correctamente
 *               idCliente: 123
 *               codigo: ABC123
 *       400:
 *         description: No se pudo crear el cliente
 *         content:
 *           application/json:
 *             example:
 *               mensaje: No se pudo crear el cliente
 *       500:
 *         description: Ocurrió un error en el servidor
 *         content:
 *           application/json:
 *             example:
 *               mensaje: Ocurrió un error en el servidor
 *               error: Detalles del error
 */

router.post("/create-client", async (req, res) => {
	try {
		const nombre = req.body.nombre;
		const nit = req.body.nit;
		const codigo = GenerarCodigo(nombre);
		const curso = new Curso();
		const cliente = await curso.createCliente(nombre, nit, codigo);
		console.log(cliente);
		if (cliente > 0) {
			res.status(200).send({
				mensaje: "Cliente creado correctamente",
				idCliente: cliente,
				codigo: codigo,
			});
		} else {
			res.status(400).send({mensaje: "No se pudo crear el cliente"});
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({
			mensaje: "Ocurrió un error en el servidor",
			error: error,
		});
	}
});
/**
 * @swagger
 * /api/get-all-clients:
 *   get:
 *     summary: Obtiene todos los clientes
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida correctamente
 *       500:
 *         description: Ocurrió un error en el servidor
 */
router.get("/get-all-clients", async (req, res) => {
	try {
		const curso = new Curso();
		const clientes = await curso.getClientes();
		res.status(200).send(clientes);
	} catch (error) {
		res.status(500).send({mensaje: "Ocurrió un error en el servidor"});
	}
});

/**
 * @swagger
 * /api/get-cliente/{id}:
 *   get:
 *     summary: Trae un cliente por su id
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: Id del cliente
 *       schema:
 *          type: integer
 *     responses:
 *       200:
 *          description: Cliente
 *       500:
 *          description: Ocurrió un error en el servidor
 
 */

router.get("/get-cliente/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const curso = new Curso();
		const cliente = await curso.getClientesById(id);
		res.status(200).send(cliente);
	} catch (error) {
		res.status(500).send({mensaje: "Ocurrió un error en el servidor"});
	}
});

/**
 * @swagger
 * /api/create-user:
 *   post:
 *     summary: Crea un usuario
 *     requestBody:
 *       description: Datos del usuario a crear
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_cliente
 *               - nombre
 *               - apellido
 *               - num_doc
 *             properties:
 *               id_cliente:
 *                 type: string
 *                 description: ID del cliente al que pertenece el usuario
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario
 *               apellido:
 *                 type: string
 *                 description: Apellido del usuario
 *               num_doc:
 *                 type: string
 *                 description: Número de documento del usuario
 *     responses:
 *       200:
 *         description: Usuario creado correctamente
 *       400:
 *         description: No se pudo crear el usuario
 *       500:
 *         description: Ocurrió un error en el servidor
 */

router.post("/create-user", async (req, res) => {
	try {
		const id_cliente = req.body.id_cliente;
		const nombre = req.body.nombre;
		const apellido = req.body.apellido;
		const num_doc = req.body.num_doc;
		const curso = new Curso();
		const user = await curso.createUser(
			id_cliente,
			nombre,
			apellido,
			num_doc
		);

		if (user > 0) {
			res.status(200).send({
				mensaje: "Usuario creado correctamente",
				idUser: user,
			});
		} else {
			res.status(400).send({mensaje: "No se pudo crear el usuario"});
		}
	} catch (error) {
		res.status(500).send({mensaje: "Ocurrió un error en el servidor"});
	}
});
/**
 * @swagger
 * /api/get-all-users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *       500:
 *         description: Ocurrió un error en el servidor
 */

router.get("/get-all-users", async (req, res) => {
	try {
		const curso = new Curso();
		const users = await curso.getUsers();
		res.status(200).send(users);
	} catch (error) {
		res.status(500).send({mensaje: "Ocurrió un error en el servidor"});
	}
});
/**
 * @swagger
 * /api/get-user/{id}:
 *   get:
 *     summary: Obtiene un usuario por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del usuario a obtener
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario obtenido correctamente
 *       400:
 *         description: No se pudo obtener el usuario
 *       500:
 *         description: Ocurrió un error en el servidor
 */

router.get("/get-user/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const curso = new Curso();
		const user = await curso.getUsersById(id);
		res.status(200).send(user);
	} catch (error) {
		res.status(500).send({mensaje: "Ocurrió un error en el servidor"});
	}
});
/**
 * @swagger
 * /api/create-curso:
 *   post:
 *     summary: Crea un nuevo curso con sus lecciones
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Datos del curso y sus lecciones a crear
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *             descripcion:
 *               type: string
 *             url_imagen:
 *               type: string
 *             nombre_docente:
 *               type: string
 *             precio:
 *               type: number
 *             lecciones:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   url_video:
 *                     type: string
 *     responses:
 *       200:
 *         description: Curso creado correctamente
 *       400:
 *         description: No se pudo crear el curso
 *       500:
 *         description: Ocurrió un error en el servidor
 */
router.post("/create-curso", async (req, res) => {
	try {
		const {
			nombre,
			descripcion,
			url_imagen,
			nombre_docente,
			precio,
			lecciones,
		} = req.body;

		const curso = new Curso();
		const cursoCreado = await curso.createCurso(
			nombre,
			descripcion,
			url_imagen,
			nombre_docente,
			precio
		);

		if (cursoCreado > 0) {
			const leccionesPromises = lecciones.map((leccion) =>
				curso.createLeccion(
					cursoCreado,
					leccion.nombre,
					leccion.descripcion,
					leccion.url_video
				)
			);
			await Promise.all(leccionesPromises);

			res.status(200).send({
				mensaje: "Curso creado correctamente",
				idCurso: cursoCreado,
			});
		} else {
			res.status(400).send({mensaje: "No se pudo crear el curso"});
		}
	} catch (error) {
		console.error(error); // Usar console.error para errores
		res.status(500).send({
			mensaje: `Ocurrió un error en el servidor: ${error.message}`,
		});
	}
});
/**
 * @swagger
 * /api/create-leccion:
 *   post:
 *     summary: Crea una nueva lección para un curso
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Datos de la lección a crear
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id_curso:
 *               type: number
 *             nombre:
 *               type: string
 *             descripcion:
 *               type: string
 *             url_video:
 *               type: string
 *     responses:
 *       200:
 *         description: Lección creada correctamente
 *       400:
 *         description: No se pudo crear la lección
 *       500:
 *         description: Ocurrió un error en el servidor
 */

router.post("/create-leccion", async (req, res) => {
	try {
		const {id_curso, nombre, descripcion, url_video} = req.body;
		const curso = new Curso();
		const leccion = await curso.createLeccion(
			id_curso,
			nombre,
			descripcion,
			url_video
		);
		if (leccion > 0) {
			res.status(200).send({
				mensaje: "Lección creada correctamente",
				idLeccion: leccion,
			});
		} else {
			res.status(400).send({mensaje: "No se pudo crear la lección"});
		}
	} catch (error) {
		res.status(500).send({mensaje: "Ocurrió un error en el servidor"});
	}
});
/**
 * @swagger
 * /api/update-curso:
 *   put:
 *     summary: Actualiza los datos de un curso existente
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Datos del curso a actualizar
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id_curso:
 *               type: number
 *             nombre:
 *               type: string
 *             descripcion:
 *               type: string
 *             url_imagen:
 *               type: string
 *             nombre_docente:
 *               type: string
 *             precio:
 *               type: number
 *     responses:
 *       200:
 *         description: Curso actualizado correctamente
 *       400:
 *         description: No se pudo actualizar el curso
 *       500:
 *         description: Ocurrió un error en el servidor
 */

router.put("/update-curso", async (req, res) => {
	try {
		const {
			id_curso,
			nombre,
			descripcion,
			url_imagen,
			nombre_docente,
			precio,
		} = req.body;
		const curso = new Curso();
		if (nombre && descripcion && url_imagen && nombre_docente && precio) {
			const cursoActualizado = await curso.updateCurso(
				id_curso,
				nombre,
				descripcion,
				url_imagen,
				nombre_docente,
				precio
			);
			if (cursoActualizado) {
				res.status(200).send({
					mensaje: "Curso actualizado correctamente",
				});
			} else {
				res.status(400).send({
					mensaje: "No se pudo actualizar el curso",
				});
			}
		} else {
			res.status(400).send({mensaje: "No se pudo actualizar el curso"});
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({mensaje: "Ocurrió un error en el servidor"});
	}
});
/**
 * @swagger
 * /api/update-leccion:
 *   put:
 *     summary: Actualiza los datos de una lección existente
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Datos de la lección a actualizar
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id_curso:
 *               type: number
 *             id_leccion:
 *               type: number
 *             nombre:
 *               type: string
 *             descripcion:
 *               type: string
 *             url_video:
 *               type: string
 *     responses:
 *       200:
 *         description: Lección actualizada correctamente
 *       400:
 *         description: No se pudo actualizar la lección
 *       500:
 *         description: Ocurrió un error en el servidor
 */

router.put("/update-leccion", async (req, res) => {
	try {
		const {id_curso, id_leccion, nombre, descripcion, url_video} = req.body;
		const curso = new Curso();
		if (nombre && descripcion && url_video) {
			const leccionActualizada = await curso.updateLeccion(
				id_curso,
				id_leccion,
				nombre,
				descripcion,
				url_video
			);
			if (leccionActualizada) {
				res.status(200).send({
					mensaje: "Lección actualizada correctamente",
				});
			} else {
				res.status(400).send({
					mensaje: "No se pudo actualizar la lección",
				});
			}
		}
	} catch (error) {
		res.status(500).send({mensaje: "Ocurrió un error en el servidor"});
	}
});
/**
 * @swagger
 * /api/delete-curso:
 *   delete:
 *     summary: Elimina un curso existente
 *     parameters:
 *       - in: body
 *         name: body
 *         description: ID del curso a eliminar
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id_curso:
 *               type: number
 *     responses:
 *       200:
 *         description: Curso eliminado correctamente
 *       400:
 *         description: No se pudo eliminar el curso
 *       500:
 *         description: Ocurrió un error en el servidor
 */

router.delete("/delete-curso", async (req, res) => {
	try {
		const {id_curso} = req.body;
		const curso = new Curso();
		if (id_curso) {
			const cursoEliminado = await curso.deleteCurso(id_curso);
			if (cursoEliminado) {
				res.status(200).send({
					mensaje: "Curso eliminado correctamente",
				});
			} else {
				console.log(cursoEliminado);
				res.status(400).send({mensaje: "No se pudo eliminar el curso"});
			}
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({mensaje: "Ocurrió un error en el servidor"});
	}
});
/**
 * @swagger
 * /api/delete-leccion:
 *   delete:
 *     summary: Elimina una lección de un curso
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Datos necesarios para eliminar una lección
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - id_curso
 *             - id_leccion
 *           properties:
 *             id_curso:
 *               type: number
 *             id_leccion:
 *               type: number
 *     responses:
 *       200:
 *         description: Lección eliminada correctamente
 *       400:
 *         description: No se pudo eliminar la lección
 *       500:
 *         description: Ocurrió un error en el servidor
 */

router.delete("/delete-leccion", async (req, res) => {
	try {
		const {id_curso, id_leccion} = req.body;
		const curso = new Curso();
		if (id_curso && id_leccion) {
			const leccionEliminada = await curso.deleteLecciones(
				id_curso,
				id_leccion
			);
			if (leccionEliminada) {
				res.status(200).send({
					mensaje: "Lección eliminada correctamente",
				});
			} else {
				res.status(400).send({
					mensaje: "No se pudo eliminar la lección",
				});
			}
		}
	} catch (error) {
		res.status(500).send({mensaje: "Ocurrió un error en el servidor"});
	}
});
/**
 * @swagger
 * /api/get-all-cursos:
 *   get:
 *     summary: Obtiene todos los cursos
 *     responses:
 *       200:
 *         description: Lista de cursos obtenida correctamente
 *       500:
 *         description: Ocurrió un error en el servidor
 */

router.get("/get-all-cursos", async (req, res) => {
	try {
		const curso = new Curso();
		const cursos = await curso.getCursos();
		res.status(200).send(cursos);
	} catch (error) {
		res.status(500).send({mensaje: "Ocurrió un error en el servidor"});
	}
});
/**
 * @swagger
 * /api/client-curso:
 *   post:
 *     summary: Asocia un cliente a un curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_cliente
 *               - id_curso
 *             properties:
 *               id_cliente:
 *                 type: number
 *               id_curso:
 *                 type: number
 *     responses:
 *       200:
 *         description: Relacción creada correctamente
 *         content:
 *           application/json:
 *             example:
 *               mensaje: Relacción creada correctamente
 *       400:
 *         description: No se pudo crear la relacción
 *         content:
 *           application/json:
 *             example:
 *               mensaje: No se pudo crear la relacción
 *       500:
 *         description: Ocurrió un error en el servidor
 *         content:
 *           application/json:
 *             example:
 *               mensaje: Ocurrió un error en el servidor
 *               error: Detalles del error
 */

router.post("/client-curso", async (req, res) => {
	try {
		const id_cliente = req.body.id_cliente;
		const id_curso = req.body.id_curso;
		const curso = new Curso();
		if (id_cliente || id_curso) {
			let checkRelacion = await curso.getCursosByCliente(
				id_curso,
				id_cliente
			);
            console.log(checkRelacion);
			if (!checkRelacion) {
				const client_curso = await curso.cursoCodigo(
					id_curso,
					id_cliente
				);
				if (client_curso) {
					res.status(200).send({
						mensaje: "Relacción creada correctamente",
					});
				} else {
					res.status(400).send({
						mensaje: "No se pudo crear la relacción",
					});
				}
			} else {
				res.status(400).send({mensaje: "La relacción ya existe"});
			}
		} else {
			res.status(400).send({mensaje: "No se pudo crear la relacción"});
		}
	} catch (error) {
        console.log(error);
		res.status(500).send({mensaje: "Ocurrió un error en el servidor"});
	}
});
/**
 * @swagger
 * /api/get-cursoxcliente/{id_curso}/{cod_cliente}:
 *   get:
 *     summary: Obtiene un curso asociado a un cliente por su código
 *     parameters:
 *       - in: path
 *         name: id_curso
 *         description: ID del curso
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: cod_cliente
 *         description: Código del cliente
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Curso obtenido correctamente
 *       400:
 *         description: No se pudo obtener el curso o la relación cliente-curso no existe
 *       500:
 *         description: Ocurrió un error en el servidor
 */

router.get("/get-cursoxcliente/:id_curso/:cod_cliente", async (req, res) => {
	try {
		const codigo_cliente = req.params.cod_cliente;
		const id_curso = req.params.id_curso;
		const curso = new Curso();
		const curso_completo = await curso.getCursosByCodigo(
			id_curso,
			codigo_cliente
		);
		if (curso_completo) {
			res.status(200).send(curso_completo);
		} else {
			res.status(400).send({mensaje: "No se pudo obtener el curso"});
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({mensaje: "Ocurrió un error en el servidor"});
	}
});

function GenerarCodigo(nombre) {
	var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
	var codigo = nombre.substring(0, 3); // Toma los primeros 3 caracteres del nombre

	for (var i = 0; i < 6; i++) {
		codigo += caracteres.charAt(
			Math.floor(Math.random() * caracteres.length)
		);
	}
	return codigo.toUpperCase();
}

module.exports = router;
