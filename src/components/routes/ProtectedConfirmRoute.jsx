import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedConfirmRoute() {
  const location = useLocation();
  const email = location.state?.email;

  if (!email) return <Navigate to="/register" replace />;

  return <Outlet />;
}
