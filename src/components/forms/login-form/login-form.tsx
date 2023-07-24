import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import * as Yup from "yup";
import { LoggedInUser, LoginUserRequest } from "../../../models/user.model";
import { authLoginAction } from "../../../store/actions/auth.actions";
import { AppDispatch, RootState } from "../../../store/store";

const validationSchema = Yup.object({
  // TODO: Add more validation
  email: Yup.string().email().required(),
  password: Yup.string().trim().required(),
});

export const LoginForm = () => {
  const id = useId();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  /**
   * Retrieves specific properties from the `auth` state using `useSelector`.
   *
   * @typedef {object} RootState - The type definition for the root state of the Redux store.
   * @property {object} loggedInUser - The currently logged-in user.
   * @property {boolean} loading - Indicates whether there is a loading state.
   * @property {object} errors - The errors associated with the authentication state.
   */
  const {
    loggedInUser: user,
    loading,
    errors,
  } = useSelector((state: RootState) => state.auth);

  /**
   * Sets up a form with validation using useForm and yupResolver.
   *
   * @template T - The type of the form data.
   * @param {object} options - Additional options for the form setup.
   * @param {object} options.resolver - The resolver for validating the form data, using yupResolver from the yup library.
   * @param {object} options.defaultValues - The default values for the form fields.
   * @returns {object} - An object containing the form setup properties and functions.
   * @property {function} register - A function to register form inputs and assign them to the form state.
   * @property {function} handleSubmit - A function to handle form submission, including validation and error handling.
   * @property {function} reset - A function to reset the form fields to their initial values.
   * @property {object} formErrors - The validation errors associated with each form field.
   */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors }, // FIXME
  } = useForm<LoginUserRequest>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /**
   * Establishes a WebSocket connection and provides a function to send JSON messages.
   *
   * @param {string} url - The WebSocket URL to connect to.
   * @param {object} options - Additional options for the WebSocket connection.
   * @param {boolean} options.share - Indicates whether the WebSocket connection can be shared among multiple components or instances.
   * @param {function} options.filter - A filter function to determine which incoming messages to process. Should return a boolean value.
   * @returns {object} - An object with the `sendJsonMessage` function to send JSON messages through the WebSocket connection.
   */
  const { sendJsonMessage } = useWebSocket(import.meta.env.VITE_WS_URL, {
    share: true,
    filter: () => false,
  });

  /**
   * Event handler for submitting the login form.
   *
   * @typedef {object} LoginUserRequest - The type definition for the login request payload.
   * @property {string} email - The email address of the user.
   * @property {string} password - The password of the user.
   *
   * @param {LoginUserRequest} loginRequest - The login request payload containing the user's email and password.
   * @returns {void}
   */
  const handleOnSubmit: SubmitHandler<LoginUserRequest> = (loginRequest) => {
    console.log("Login user: ", loginRequest);
    dispatch(authLoginAction(loginRequest));
  };

  /**
   * useEffect hook to perform actions when the `user` state changes.
   *
   * @param {LoggedInUser} user - The user object representing the logged-in user.
   * @returns {void}
   */
  useEffect(() => {
    if (user !== null) {
      // Send JSON message to the websocket server.
      sendJsonMessage({
        type: "USER_LOGIN",
        content: user?.id,
      });

      // Redirect the user
      console.log("location state from", location.state.from);
      navigate(location.state.from);
    }
  }, [user]);

  return (
    <form
      className="space-y-4 md:space-y-6"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <h1 className="form-heading">Sign-in to your account</h1>
      {/* Email */}
      <div>
        <label htmlFor={id + "email"} className="form-label">
          Your email
        </label>
        <input
          id={id + "email"}
          type="email"
          className="form-input"
          placeholder="name@company.com"
          {...register("email", { required: true, minLength: 2 })}
        />
      </div>
      {/* Password */}
      <div>
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          className="form-input"
          {...register("password", { required: true, minLength: 2 })}
        />
      </div>
      {/* Remember me */}
      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className="form-checkbox"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="remember" className="form-checkbox-label">
              Remember me
            </label>
          </div>
        </div>
        <Link to="/forgot-password" className="form-link">
          Forgot password?
        </Link>
      </div>
      {/* Errors */}
      <p className="text-sm font-bold text-red-500 dark:text-gray-400">
        {errors}
      </p>
      {/* Sign-in button*/}
      <button type="submit" className="w-full btn-primary">
        Sign in
      </button>
      {/* Sign-up link */}
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet?{" "}
        <Link to="/register" className="form-link">
          Sign up
        </Link>
      </p>
    </form>
  );
};
