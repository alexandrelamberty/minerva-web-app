import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { LoginUserRequest } from "../../../models/user.model";
import { authFakeLoginAction } from "../../../store/actions/auth.actions";
import { AppDispatch, RootState } from "../../../store/store";
import { CreateCourse } from "../../../models/course.model";

const validationSchema = Yup.object({
  name: Yup.string().trim().required(),
  description: Yup.string().trim().required(),
  training: Yup.string().trim().required(),
  teacher: Yup.string().trim().required(),
});

const CourseForm = () => {
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
  } = useForm<CreateCourse>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      description: "",
      training: undefined,
      teacher: undefined,
    },
  });

  const handleOnSubmit: SubmitHandler<CreateCourse> = (user) => {
    console.log("SubmitHandler");
    dispatch(authFakeLoginAction());
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label htmlFor={id + "name"} className="form-label">
            Name
          </label>
          <input
            type="text"
            id={id + "name"}
            className="form-input"
            placeholder="Type product name"
            {...register("name")}
          />
        </div>
        {/* Teacher */}
        <div>
          <label htmlFor={id + "teacher"} className="form-label">
            Teacher
          </label>
          <input
            type="text"
            id={id + "teacher"}
            className="form-input"
            placeholder="$2999"
            {...register("teacher")}
          />
        </div>
        {/* Training */}
        <div>
          <label htmlFor={id + "category"} className="form-label">
            Training
          </label>
          {/* FIXME extract component */}
          <select
            id={id + "teacher"}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            {...register("description")}
          >
            <option selected>Select category</option>
            <option value="TV">TV/Monitors</option>
            <option value="PC">PC</option>
            <option value="GA">Gaming/Console</option>
            <option value="PH">Phones</option>
          </select>
        </div>
        {/* Description */}
        <div className="sm:col-span-2">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id={id + "description"}
            rows={4}
            className="form-input-textarea"
            placeholder="Write product description here"
            {...register("description")}
          ></textarea>
        </div>
      </div>
      {/* Submit */}
      <button type="submit" className="form-button">
        <svg
          className="mr-1 -ml-1 w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
        Add new course
      </button>
    </form>
  );
};

export default CourseForm;
