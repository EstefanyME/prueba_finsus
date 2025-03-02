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

module.exports = router;
