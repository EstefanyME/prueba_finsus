const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerSetup = require('./swagger');
require('dotenv').config();

const transactionRoutes = require('./routes/transactionRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

swaggerSetup(app);
app.use(cors());
app.use(bodyParser.json());

app.use('/api', transactionRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  bufferCommands: false,
  socketTimeoutMS: 30000,
})
  .then(() => console.log('Conexión a MongoDB establecida'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));
  

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
  
module.exports = app;
