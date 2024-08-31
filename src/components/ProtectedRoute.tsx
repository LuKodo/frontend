import { useAuth } from '@/contexts/AuthContext';
import { Redirect } from './Redirect';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? children : <Redirect to="/market/login" />}
    </>
  );
};

export default ProtectedRoute;