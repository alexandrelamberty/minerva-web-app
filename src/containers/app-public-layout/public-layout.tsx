import { Label, TextInput, Checkbox, Button } from "flowbite-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { LoginForm } from "../../components/forms/login-form/login-form";
import { useEffect } from "react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

/**
 * The public layout is used for the public routes with no authentication needed.
 *
 * It acts as a middleware like the ProtectedRoute component, to verify if a user is
 * connected or not and redirect him accordingly.
 *
 *  - Login
 *  - Register
 *  - Forgot Password
 *
 * @returns
 */
const PublicLayout = () => {
  const navigate = useNavigate();
  const { loggedInUser } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (loggedInUser !== null) navigate("/dashboard");
  }, [loggedInUser]);

  /**
   * Return a two column layout with a picture on the left and an outlet on the
   * right.
   *
   */
  return (
    // FIXME: Clean CSS
    <div className="flex items-center min-h-screen bg-gray-50">
      <div className="flex-1  mx-auto bg-white rounded-lg shadow-xl h-full">
        <div className="flex flex-col md:flex-row">
          {/* Left column */}
          <div className="h-32 md:h-auto md:w-1/2">
            <img className="object-cover w-full h-screen" src="./splash.jpg" />
          </div>
          {/* Right column */}
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/3">
            <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <Outlet></Outlet>
              </div>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default PublicLayout;
