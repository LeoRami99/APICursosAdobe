const db = require("../../../config/config");

class Curso {
	constructor() {}
	async createCliente(nombre, nit, codigo) {
		try {
			let sql = `INSERT INTO Cliente (nombre, nit, codigo) VALUES (?,?,?)`;
			let result = await db.query(sql, [nombre, nit, codigo]);
			// obtener el el id del cliente recien creado

			let idCliente = result[0].insertId;
			return idCliente;
		} catch (error) {
			throw error;
		}
	}
	async getClientes() {
		try {
			let sql = `SELECT * FROM Cliente`;
			let result = await db.query(sql);
			return result[0];
		} catch (error) {
			throw error;
		}
	}
	async getClientesById(id) {
		try {
			let sql = `SELECT * FROM Cliente WHERE id = ?`;
			let result = await db.query(sql, [id]);
			return result[0];
		} catch (error) {
			throw error;
		}
	}
    
	// crear Curso

	async createUser(id_cliente, nombre, apellido, num_doc) {
		try {
			let sql = `INSERT INTO Usuario (id_cliente, nombre, apellido, num_doc) VALUES (?,?,?,?)`;
			let result = await db.query(sql, [
				id_cliente,
				nombre,
				apellido,
				num_doc,
			]);
			// obtener el el id del cliente recien creado

			let idUser = result[0].insertId;
			return idUser;
		} catch (error) {
			throw error;
		}
	}
	async getUsers() {
		try {
			let sql = "SELECT * FROM Usuario";
			let result = await db.query(sql);
			return result[0];
		} catch (error) {
			throw error;
		}
	}
	async getUsersById(id) {
		try {
			let sql = `SELECT * FROM Usuario WHERE id = ?`;
			let result = await db.query(sql, [id]);
			return result[0];
		} catch (error) {
			throw error;
		}
	}

	// Crear curso on lecciones
	async createCurso(nombre, descripcion, url_imagen, nombre_docente, precio) {
		try {
			let sql = `INSERT INTO Curso (nombre, descripcion, url_imagen, nombre_docente, precio) VALUES (?,?,?,?,?)`;
			let result = await db.query(sql, [
				nombre,
				descripcion,
				url_imagen,
				nombre_docente,
				precio,
			]);
			let idCurso = result[0].insertId;
			return idCurso;
		} catch (error) {
			throw error;
		}
	}
    async updateCurso(id_curso, nombre, descripcion, url_imagen, nombre_docente, precio){
        try{
            let query = " UPDATE Curso SET nombre = ?, descripcion = ?, url_imagen = ?, nombre_docente = ?, precio = ? WHERE id = ?"
            let result = await db.query(query, [nombre, descripcion, url_imagen, nombre_docente, precio, id_curso])
            if(result[0].affectedRows > 0){
                return true
            }else{
                return false
            }
        }catch(error){
            throw error
        }
    }
    async updateLeccion(id_curso, id_leccion, nombre, descripcion, url_video){
        try{
            let query = "UPDATE Lecciones SET nombre = ?, descripcion = ?, url_video = ? WHERE id_curso = ? AND id = ?"
            let result = await db.query(query, [nombre, descripcion, url_video, id_curso, id_leccion])
            if(result[0].affectedRows > 0){
                return true
            }else{
                return false
            }
        }catch(error){
            throw error
        }
    }
    async deleteLecciones(id_curso, id_leccion){
        try{
            let query = "DELETE FROM Lecciones WHERE id_curso = ? AND id = ?"
            let result = await db.query(query, [id_curso, id_leccion])
            if(result[0].affectedRows > 0){
                return true
            }else{
                return false
            }
        }catch(error){
            throw error
        }
    }
    async deleteCurso(id_curso) {
        try {
            const query_delete_lecciones = "DELETE FROM Lecciones WHERE id_curso = ?";
            const query_delete_curso = "DELETE FROM Curso WHERE id = ?";
            const delete_delete_codigo_cliente = "DELETE FROM CursoCodigo WHERE id_curso = ?";    
            const result_lecciones = await db.query(query_delete_lecciones, [id_curso]);
            const result_codigo_cliente = await db.query(delete_delete_codigo_cliente, [id_curso]);
    
            if (result_lecciones[0].affectedRows > 0) {
                const result_curso = await db.query(query_delete_curso, [id_curso]);
    
                if (result_curso[0].affectedRows > 0) {
                    return true; // Éxito al eliminar el curso y las lecciones
                } else {
                    return false; // No se pudo eliminar el curso
                }
            } else {
                return false; // No se encontraron lecciones para eliminar
            }
        } catch (error) {
            throw error; // Propaga el error para manejarlo más arriba
        }
    }

	async createLeccion(id_curso, nombre, descripcion, url_video) {
		try {
			let sql = `INSERT INTO Lecciones (id_curso, nombre, descripcion, url_video) VALUES (?,?,?,?)`;
			let result = await db.query(sql, [
				id_curso,
				nombre,
				descripcion,
				url_video,
			]);
			let idLeccion = result[0].insertId;
			return idLeccion;
		} catch (error) {
			throw error;
		}
	}
	// obtener los cursos con sus lecciones
	async getCursos() {
		try {
			let curso = [];
			let lecciones = [];

			let sql = `SELECT * FROM Curso`;
			let result = await db.query(sql);

			for (let i = 0; i < result[0].length; i++) {
				let sql_lecciones = `SELECT * FROM Lecciones WHERE id_curso = ?`;
				let result_lecciones = await db.query(sql_lecciones, [
					result[0][i].id,
				]);
				lecciones = result_lecciones[0];

				let cursoConLecciones = {
					...result[0][i],
					lecciones: [...lecciones],
				};

				curso.push(cursoConLecciones);
			}

			return curso;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
	async cursoCodigo(id_curso, id_cliente) {
		try {
			let query =
				"INSERT INTO CursoCodigo (id_curso, id_cliente) VALUES (?,?)";
			let result = await db.query(query, [id_curso, id_cliente]);
			if (result[0].affectedRows > 0) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			throw error;
		}
	}
	async getCursosByCliente(id_curos, id_cliente) {
		try {
			let sql = `SELECT id FROM CursoCodigo WHERE id_curso = ? AND id_cliente = ?`;
			let result = await db.query(sql, [id_curos, id_cliente]);
			if (result[0].length > 0) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			throw error;
		}
	}
	async getCursosByCodigo(id_curso, CodigoCliente) {
        try {
            let query_cliente_by_codigo = "SELECT id FROM Cliente WHERE codigo = ?";
            let result_cliente_by_codigo = await db.query(query_cliente_by_codigo, [CodigoCliente]);
            let id_cliente = result_cliente_by_codigo[0][0].id;
            let query_curso_codigo = "SELECT id_curso FROM CursoCodigo WHERE id_cliente = ?";
            let result_curso_codigo = await db.query(query_curso_codigo, [id_cliente]);
            let cursosDisponibles = result_curso_codigo[0].map(row => row.id_curso);
            if (cursosDisponibles.find(id => id == id_curso)) {
                let curso = [];
                let lecciones = [];
    
                let sql = `SELECT * FROM Curso WHERE id = ?`;
                let result = await db.query(sql, [id_curso]);
    
                for (let i = 0; i < result[0].length; i++) {
                    let sql_lecciones = `SELECT * FROM Lecciones WHERE id_curso = ?`;
                    let result_lecciones = await db.query(sql_lecciones, [result[0][i].id]);
                    lecciones = result_lecciones[0];
    
                    let cursoConLecciones = {
                        ...result[0][i],
                        lecciones: [...lecciones],
                    };
    
                    curso.push(cursoConLecciones);
                }
    
                return curso[0];
            } else {
                throw new Error("El cliente no tiene acceso a este curso.");
            }
        } catch (error) {
            throw error;
        }
    }
    

	// se le asigna un curso a un código
}
module.exports = Curso;
