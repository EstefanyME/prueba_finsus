const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Retorna una lista de usuarios con opción de filtrar por RFC, nombre, apellidos o estatus.
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [ACTIVE, INACTIVE, LOCKED]
 *         description: Estatus del usuario para filtrar.
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente.
 *       500:
 *         description: Error al obtener los usuarios.
 */
router.get("/users", userController.getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     description: Retorna los datos de un usuario específico según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario.
 *     responses:
 *       200:
 *         description: Usuario encontrado exitosamente.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error al obtener el usuario.
 */
router.get("/users/:id", userController.getUserById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     description: Crea un nuevo usuario en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               rfc:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, INACTIVE, LOCKED]
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *       400:
 *         description: Datos inválidos.
 *       500:
 *         description: Error al crear el usuario.
 */
router.post("/users", userController.createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar un usuario
 *     description: Actualiza los datos de un usuario específico por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, INACTIVE, LOCKED]
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente.
 *       400:
 *         description: Datos inválidos.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error al actualizar el usuario.
 */
router.put("/users/:id", userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     description: Elimina un usuario específico según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario.
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error al eliminar el usuario.
 */
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
