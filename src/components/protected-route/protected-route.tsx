import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../../store/store";
import { string } from "yup";

type ProtectedRouteProps = {
  children: JSX.Element;
  roles?: string[];
};

const ProtectedRoute = ({ roles, children }: ProtectedRouteProps) => {
  let location = useLocation();
  const { user, loading, errors } = useSelector(
    (state: RootState) => state.auth
  );

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
