//backend/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

//rutas
const userRoutes = require('./routes/userRoutes');
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// apis
app.use('/api/users', userRoutes);
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
