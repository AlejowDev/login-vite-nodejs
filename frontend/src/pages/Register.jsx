import React, { useState } from "react";
import { registerUser } from "../services/userService";

const Register = () => {
  const [formData, setFormData] = useState({
    documento: "",
    nombre: "",
    email: "",
    celular: "",
    codigo_estudiantil: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      setMessage(response.message);
      setFormData({
        documento: "",
        nombre: "",
        email: "",
        celular: "",
        codigo_estudiantil: "",
        password: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Error al registrar usuario");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Registro de Usuario
        </h2>
        {message && <p className="text-center mb-4 text-red-600">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="documento"
            placeholder="Documento"
            value={formData.documento}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <input
            type="text"
            name="celular"
            placeholder="Celular"
            value={formData.celular}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            type="text"
            name="codigo_estudiantil"
            placeholder="Código Estudiantil"
            value={formData.codigo_estudiantil}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Registrarse
          </button>
        </form>
        <p className="text-center mt-4">
          ¿Ya tienes una cuenta?{" "}
          <a href="/" className="text-blue-500 hover:underline">
            Iniciar Sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
