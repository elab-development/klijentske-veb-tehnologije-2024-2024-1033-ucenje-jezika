import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../store/auth-context';

export function RequireAuth() {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to='/login' replace />;
  return <Outlet />;
}

export function RedirectIfAuth() {
  const { currentUser } = useAuth();
  if (currentUser) return <Navigate to='/' replace />;
  return <Outlet />;
}
