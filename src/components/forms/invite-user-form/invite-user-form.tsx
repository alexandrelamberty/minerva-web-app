import { yupResolver } from "@hookform/resolvers/yup";
import { useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { InviteUserRequest } from "../../../models/user.model";
import { AppDispatch, RootState } from "../../../store/store";

/**
 * Form data validation
 */
const validationSchema = Yup.object({
  firstName: Yup.string().email().required(),
  lastName: Yup.string().email().required(),
  email: Yup.string().email().required(),
  role: Yup.string().trim().required(),
});

/**
 *
 * @returns
 */
const InviteUserForm = () => {
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
  } = useForm<InviteUserRequest>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: "",
    },
  });

  const handleOnSubmit: SubmitHandler<InviteUserRequest> = (user) => {
    console.log("Invite user: ", user);
    // dispatch(inviteUserAction());
  };

  return (
    <>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        {/* First name */}
        <div>
          <label htmlFor={id + "firstName"} className="form-label">
            First name
          </label>
          <input
            id={id + "firstName"}
            type="firstName"
            className="form-input"
            placeholder=""
            {...register("firstName", { required: true, minLength: 2 })}
          />
        </div>
        {/* Last name */}
        <div>
          <label htmlFor={id + "lastName"} className="form-label">
            Last name
          </label>
          <input
            id={id + "lastName"}
            type="lastName"
            className="form-input"
            placeholder=""
            {...register("lastName", { required: true, minLength: 2 })}
          />
        </div>
        {/* Email */}
        <div>
          <label htmlFor={id + "email"} className="form-label">
            Email
          </label>
          <input
            id={id + "email"}
            type="email"
            className="form-input"
            placeholder=""
            {...register("email", { required: true, minLength: 2 })}
          />
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
    </>
  );
};

export default InviteUserForm;
