import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const ProtectedRoute = () => {
  const { token } = useAuthStore();
  const hasHydrated = useAuthStore.persist?.hasHydrated?.();

  if (!hasHydrated) return null;
  if (!token) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default ProtectedRoute;