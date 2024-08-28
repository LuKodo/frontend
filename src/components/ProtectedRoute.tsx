import { useAuth } from '@contexts/AuthContext';
import { Route, Redirect } from 'wouter';

interface ProtectedRouteProps {
  path: string;
  children: JSX.Element;
}

const ProtectedRoute = ({ path, children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route path={path}>
      {isAuthenticated ? children : <Redirect to="/login" />}
    </Route>
  );
};

export default ProtectedRoute;