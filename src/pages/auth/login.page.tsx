import { Label, TextInput, Checkbox, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { LoginForm } from "../../components/login-form.tsx/login-form";

const LoginPage = () => {
  return (
    <div className="flex items-center min-h-screen bg-gray-50">
      <div className="flex-1  mx-auto bg-white rounded-lg shadow-xl h-full">
        <div className="flex flex-col md:flex-row">
          {/*  */}
          <div className="h-32 md:h-auto md:w-1/2">
            <img className="object-cover w-full h-screen" src="./splash.jpg" />
          </div>

          {/*  */}
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/3">
            <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="form-heading">Sign in to your account</h1>
                <LoginForm />
              </div>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
