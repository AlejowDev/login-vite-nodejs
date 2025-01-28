import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirección
import API from "../services/api"; // Configuración central de API

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Hook para redirección

  // Verificar si el usuario ya está autenticado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Decodificar el token para obtener el rol del usuario
      const user = JSON.parse(atob(token.split(".")[1])); // Decodificación simple
      switch (user.role) {
        case "superadmin":
          navigate("/superadmin/dashboard");
          break;
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "moderator":
          navigate("/moderator/dashboard");
          break;
        case "student":
          navigate("/student/dashboard");
          break;
        default:
          localStorage.removeItem("token"); // Si el rol no es válido, eliminamos el token
      }
    }
  }, [navigate]); // Se ejecuta al cargar el componente

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/api/auth/login", formData);
      const { token, role } = response.data;

      // Almacenar el token en localStorage
      localStorage.setItem("token", token);

      // Redirigir según el rol
      switch (role) {
        case "superadmin":
          navigate("/superadmin/dashboard");
          break;
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "moderator":
          navigate("/moderator/dashboard");
          break;
        case "student":
          navigate("/student/dashboard");
          break;
        default:
          setErrorMessage("Rol no reconocido");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error al iniciar sesión"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
        {errorMessage && (
          <p className="text-red-600 text-center mb-4">{errorMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required
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
            Ingresar
          </button>
        </form>
        <p className="text-center mt-4">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Regístrate Aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
