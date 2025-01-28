const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "clave_secreta";

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Acceso denegado. No se proporcionó un token." });
    }

    const token = authHeader.split(" ")[1]; // El token se envía como "Bearer <token>"

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token inválido o expirado." });
        }
        req.user = user; // Agrega el usuario decodificado a la solicitud
        next();
    });
};

module.exports = authenticateToken;
