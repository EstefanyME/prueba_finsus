const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  rfc: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  status: { type: String, enum: ['ACTIVE', 'LOCKED'], default: 'ACTIVE', required: true },
});

const User = mongoose.model('User', UserSchema, 'users');
module.exports = User;