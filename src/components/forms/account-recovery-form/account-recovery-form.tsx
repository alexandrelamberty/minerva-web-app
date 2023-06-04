import { yupResolver } from "@hookform/resolvers/yup";
import { useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  LoginUserRequest,
  RecoverUserPasswordRequest,
} from "../../../models/user.model";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
});

export const AccountRecoveryForm = () => {
  const id = useId();
  const navigate = useNavigate();
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
  } = useForm<LoginUserRequest>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleOnSubmit: SubmitHandler<RecoverUserPasswordRequest> = (
    request
  ) => {
    console.log("SubmitHandler", request);
    // use hook to call the API and handle the response
    // const result = userRecoverPassword();
  };

  return (
    <form
      className="space-y-4 md:space-y-6"
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <h1 className="form-heading">Recover your account</h1>
      <h3 className="form-info">
        We will send you an email with a link to reset your password.
      </h3>
      {/*  */}
      <div>
        <label htmlFor={id + "email"} className="form-label">
          Your email
        </label>
        <input
          id={id + "email"}
          type="email"
          className="form-input"
          placeholder="name@company.com"
          {...register("email")}
        />
      </div>
      {/* Errors */}
      <p className="text-sm font-bold text-red-500 dark:text-gray-400">
        {errors}
      </p>
      <button type="submit" className="w-full btn-primary">
        Reset password
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Remember your password?{" "}
        <Link to="/login" className="form-link">
          Login here
        </Link>
      </p>
    </form>
  );
};
