import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

function RequireAuth() {
  const { user } = useAuth();
  const location = useLocation();
  if (user !== null) return <Outlet />;
  return <Navigate to="/" state={{ from: location }} replace />;
}
export default RequireAuth;
