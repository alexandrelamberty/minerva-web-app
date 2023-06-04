import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../../store/store";

type ProtectedRouteProps = {
  children: JSX.Element;
  roles?: string[];
};

/**
 * Verify if a user is logged in and has the sufficient roles to access a route.
 * FIXME: Move this to the application private layout ?
 */
const ProtectedRoute = ({ roles, children }: ProtectedRouteProps) => {
  const location = useLocation();
  const {
    loggedInUser: user,
    loading,
    errors,
  } = useSelector((state: RootState) => state.auth);

  // TODO: Check roles
  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
