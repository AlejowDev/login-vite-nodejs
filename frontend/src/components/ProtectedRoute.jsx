import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, roles = [] }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found");
    return <Navigate to="/" />;
  }

  try {
    // Decodificar el token para obtener el rol del usuario
    const user = jwtDecode(token);
    console.log("Decoded user:", user);

    // Verificar si el rol está permitido
    if (roles.length > 0 && !roles.includes(user.role)) {
      console.log("Role not allowed:", user.role);
      return <Navigate to="/" />;
    }

    return children;
  } catch (error) {
    console.error("Token decoding error:", error);
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
