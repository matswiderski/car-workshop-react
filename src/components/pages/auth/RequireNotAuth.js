import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function RequireAuth() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  return user === null ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" state={{ from: location }} replace />
  );
}
export default RequireAuth;
