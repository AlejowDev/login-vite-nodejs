//backend/models/userModel.js

const db = require('../config/db');

const UserModel = {
    createUser: async (userData) => {
        const query = `
            INSERT INTO users (documento, nombre, email, celular, codigo_estudiantil, password, rol)
            VALUES (?, ?, ?, ?, ?, ?, 'student')
        `;
        const [result] = await db.execute(query, [
            userData.documento,
            userData.nombre,
            userData.email,
            userData.celular,
            userData.codigo_estudiantil,
            userData.password,
        ]);
        return result;
    },
};

module.exports = UserModel;
