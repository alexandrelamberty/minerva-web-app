import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { LoginUserRequest } from "../../../models/user.model";
import {
  authFakeLoginAction,
  authLoginAction,
} from "../../../store/actions/auth.actions";
import { AppDispatch, RootState } from "../../../store/store";

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  // TODO: Add more validation
  password: Yup.string().trim().required(),
});

export const LoginForm = () => {
  const id = useId();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    loggedInUser: user,
    loading,
    errors,
  } = useSelector((state: RootState) => state.auth);

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

  const handleOnSubmit: SubmitHandler<LoginUserRequest> = (user) => {
    console.log("Login user: ", user);
    dispatch(authLoginAction(user));
  };

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
