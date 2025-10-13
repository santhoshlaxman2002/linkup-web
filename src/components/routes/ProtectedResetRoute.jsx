import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedResetRoute() {
  const location = useLocation();
  const email = location.state?.email;

  return email ? <Outlet /> : <Navigate to="/forgot-password" replace />;
}
