import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes"; // Importamos las rutas centralizadas
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route) =>
          route.protected ? (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRoute roles={route.roles}>
                  <route.component />
                </ProtectedRoute>
              }
            />
          ) : (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          )
        )}
      </Routes>
    </Router>
  );
};

export default App;
