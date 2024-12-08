import { useAuth } from '../admin/presentation/contexts/AuthContext';
import { Redirect } from './Redirect';

const ProtectedRoute = (props: { children: any}) => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? props.children : <Redirect to="/login" />}
    </>
  );
};

export default ProtectedRoute;