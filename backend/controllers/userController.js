//backend/controllers/userController.js

const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const UserController = {
    register: async (req, res) => {
        console.log("Datos recibidos en el registro:", req.body);  
        try {
            const { documento, nombre, email, celular, codigo_estudiantil, password } = req.body;

            // Validación simple
            if (!documento || !nombre || !email || !password) {
                return res.status(400).json({ message: 'Todos los campos obligatorios deben ser enviados' });
            }

            // Encriptar contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear usuario
            const newUser = {
                documento,
                nombre,
                email,
                celular,
                codigo_estudiantil,
                password: hashedPassword,
            };
            const result = await UserModel.createUser(newUser);

            res.status(201).json({ message: 'Usuario registrado exitosamente', userId: result.insertId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
};

module.exports = UserController;
