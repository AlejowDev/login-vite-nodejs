import Login from "../pages/Login";
import Register from "../pages/Register";
import SuperAdminDashboard from "../pages/superadmin/Dashboard";
import AdminDashboard from "../pages/admin/Dashboard";
import ModeratorDashboard from "../pages/moderator/Dashboard";
import StudentDashboard from "../pages/student/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";

const routes = [
  // Rutas públicas
  {
    path: "/",
    component: Login,
    protected: false,
  },
  {
    path: "/register",
    component: Register,
    protected: false,
  },
  // Rutas protegidas
  {
    path: "/superadmin/dashboard",
    component: SuperAdminDashboard,
    protected: true,
    roles: ["superadmin"],
  },
  {
    path: "/admin/dashboard",
    component: AdminDashboard,
    protected: true,
    roles: ["admin", "superadmin"],
  },
  {
    path: "/moderator/dashboard",
    component: ModeratorDashboard,
    protected: true,
    roles: ["moderator", "admin", "superadmin"],
  },
  {
    path: "/student/dashboard",
    component: StudentDashboard,
    protected: true,
    roles: ["student"],
  },
];

export default routes;
