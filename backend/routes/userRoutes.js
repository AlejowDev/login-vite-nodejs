const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const UserController = require("../controllers/userController");

const router = express.Router();

// Ruta protegida para obtener información del usuario
router.get("/profile", authenticateToken, (req, res) => {
    res.status(200).json({ message: "Acceso permitido", user: req.user });
});

module.exports = router;
