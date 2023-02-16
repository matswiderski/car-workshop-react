import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function RequireAuth() {
  const { user } = useAuth();
  const location = useLocation();
  return user !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
export default RequireAuth;
