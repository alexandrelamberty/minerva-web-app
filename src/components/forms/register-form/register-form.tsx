import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  LoginUserRequest,
  RegisterUserRequest,
} from "../../../models/user.model";
import {
  authFakeLoginAction,
  authRegisterAction,
} from "../../../store/actions/auth.actions";
import { AppDispatch, RootState } from "../../../store/store";

const validationSchema = Yup.object({
  firstName: Yup.string().trim().required(),
  lastName: Yup.string().trim().required(),
  email: Yup.string().trim().required(),
  password: Yup.string().trim().required(),
  // TODO: must match password
  passwordConfirm: Yup.string().trim().required(),
});

export const FormRegister = () => {
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
    formState: { errors: formErrors },
  } = useForm<RegisterUserRequest>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const handleOnSubmit: SubmitHandler<RegisterUserRequest> = (user) => {
    console.log("Register user: ", user);
    dispatch(authRegisterAction(user));
  };

  return (
    <form
      className="space-y-4 md:space-y-4"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <h1 className="form-heading">Sign-up for an account</h1>
      <div>
        <label htmlFor={id + "firstName"} className="form-label">
          Your first name
        </label>
        <input
          type="firstName"
          id={id + "firstName"}
          className="form-input"
          placeholder="John Doe"
          {...register("firstName")}
        />
      </div>
      <div>
        <label htmlFor={id + "lastName"} className="form-label">
          Your last name
        </label>
        <input
          type="lastName"
          id={id + "lastName"}
          className="form-input"
          placeholder="Smith"
          {...register("lastName")}
        />
      </div>
      <div>
        <label htmlFor={id + "email"} className="form-label">
          Your email
        </label>
        <input
          type="email"
          id={id + "email"}
          className="form-input"
          placeholder="name@company.com"
          {...register("email")}
        />
      </div>
      <div>
        <label htmlFor={id + "password"} className="form-label">
          Password
        </label>
        <input
          type="password"
          id={id + "password"}
          placeholder="••••••••"
          className="form-input"
          {...register("password")}
        />
      </div>
      <div>
        <label htmlFor={id + "password-confirm"} className="form-label">
          Confirm password
        </label>
        <input
          type="password"
          id={id + "password-confirm"}
          placeholder="••••••••"
          className="form-input"
          {...register("passwordConfirm")}
        />
      </div>
      {/* <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="terms"
            aria-describedby="terms"
            type="checkbox"
            className="form-checkbox"
            required
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="terms" className="form-checkbox-label">
            I accept the{" "}
            <a
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              href="#"
            >
              Terms and Conditions
            </a>
          </label>
        </div>
      </div> */}
      {/* Errors */}
      <p className="text-sm font-bold text-red-500 dark:text-gray-400">
        {errors}
      </p>
      {/* Submit */}
      <button type="submit" className="w-full btn-primary">
        Create an account
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="form-link">
          Login here
        </Link>
      </p>
    </form>
  );
};
