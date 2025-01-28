import React from "react";
import { useNavigate } from "react-router-dom";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Panel de SuperAdmin</h1>
        <p className="mb-6 text-center">Bienvenido, SuperAdmin.</p>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
