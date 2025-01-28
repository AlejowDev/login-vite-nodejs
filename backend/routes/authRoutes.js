const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const router = express.Router();

// Clave secreta para el token (debe estar en .env)
const SECRET_KEY = process.env.JWT_SECRET || "clave_secreta";

// Endpoint para login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar usuario en la base de datos
        const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

        if (users.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const user = users[0];

        // Verificar la contraseña
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: user.id, role: user.rol },
            SECRET_KEY,
            { expiresIn: "5m" } // El token expira en 5 minutos
        );

        // Enviar el token al cliente
        res.status(200).json({ token, role: user.rol });
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

module.exports = router;
