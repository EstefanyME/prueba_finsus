const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  rfc: { type: String, required: true },
  folio: { type: String, required: true, unique: true },
  fechaRetiro: { type: Date, required: true },
  status: { type: String, enum: ['PENDING', 'COMPLETED', 'FAILED'], default: 'PENDING' },
  monto: { type: Number, required: true },
  comision: { type: Number, required: true },
  deleted: { type: Boolean, default: false }
});

const Transaction = mongoose.model('Transaction', TransactionSchema, 'transactions');
module.exports = Transaction;