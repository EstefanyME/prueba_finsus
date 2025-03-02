const express = require('express');
const transactionController = require('../controllers/transactionController');
const userController = require('../controllers/userController');

const router = express.Router();

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Obtener todas las transacciones
 *     description: Retorna una lista de transacciones con la opción de filtrar por fecha, RFC, folio o estatus.
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de inicio para filtrar transacciones.
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de fin para filtrar transacciones.
 *       - in: query
 *         name: rfc
 *         schema:
 *           type: string
 *         description: RFC del usuario para filtrar transacciones.
 *       - in: query
 *         name: folio
 *         schema:
 *           type: string
 *         description: Folio de la transacción.
 *       - in: query
 *         name: estatus
 *         schema:
 *           type: string
 *           enum: [PENDING, COMPLETED, FAILED]
 *         description: Estatus de la transacción (PENDING, COMPLETED, FAILED).
 *     responses:
 *       200:
 *         description: Lista de transacciones obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   rfc:
 *                     type: string
 *                   folio:
 *                     type: string
 *                   fechaRetiro:
 *                     type: string
 *                     format: date
 *                   monto:
 *                     type: number
 *                   comision:
 *                     type: number
 *                   status:
 *                     type: string
 *                   deleted:
 *                     type: boolean
 */
router.get('/transactions', transactionController.getTransactions);

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Crear una nueva transacción
 *     description: Agrega una nueva transacción. El RFC debe corresponder a un usuario activo.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rfc:
 *                 type: string
 *                 description: RFC del usuario.
 *               fechaRetiro:
 *                 type: string
 *                 format: date
 *                 description: Fecha de retiro de la transacción.
 *               monto:
 *                 type: number
 *                 description: Monto de la transacción.
 *               comision:
 *                 type: number
 *                 description: Comisión de la transacción.
 *               status:
 *                 type: string
 *                 enum: [PENDING, COMPLETED, FAILED]
 *                 description: Estado de la transacción.
 *     responses:
 *       201:
 *         description: Transacción creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rfc:
 *                   type: string
 *                 folio:
 *                   type: string
 *                 fechaRetiro:
 *                   type: string
 *                   format: date
 *                 monto:
 *                   type: number
 *                 comision:
 *                   type: number
 *                 status:
 *                   type: string
 */
router.post('/transactions', transactionController.createTransaction);

/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     summary: Eliminar una transacción
 *     description: Elimina una transacción, marcándola como eliminada.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la transacción a eliminar.
 *     responses:
 *       200:
 *         description: Transacción eliminada exitosamente.
 *       404:
 *         description: Transacción no encontrada.
 */
router.delete('/transactions/:id', transactionController.deleteTransaction);

/**
 * @swagger
 * /api/transactions/{id}/status:
 *   put:
 *     summary: Actualizar el estado de una transacción
 *     description: Permite actualizar el estado de una transacción específica. Solo las transacciones con estatus "PENDING" pueden ser actualizadas.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la transacción a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, COMPLETED, FAILED]
 *                 description: Nuevo estado de la transacción.
 *     responses:
 *       200:
 *         description: Estado de la transacción actualizado correctamente.
 *       400:
 *         description: Error en la solicitud, verifique los datos enviados.
 *       404:
 *         description: Transacción no encontrada.
 */
router.put('/transactions/:id/status', transactionController.updateTransactionStatus);


module.exports = router;
