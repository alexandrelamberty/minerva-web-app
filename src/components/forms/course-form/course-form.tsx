import { yupResolver } from "@hookform/resolvers/yup";
import { useId, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { CreateCourse } from "../../../models/course.model";
import { AppDispatch, RootState } from "../../../store/store";
import SearchInput from "../../inputs/search-input/search-input";
import { Label, TextInput } from "flowbite-react";
import { HiUser } from "react-icons/hi";
import { createCourseAction } from "../../../store/actions/course.actions";

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

  /**
   * Store
   */
  const { courses, loading, errors } = useSelector(
    (state: RootState) => state.courses
  );
  const [searchTeachers, setSearchTeachers] = useState([]);

  /**
   * Hook Form
   */
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

  /**
   * Handle form submit
   * @param user
   */
  const handleOnSubmit: SubmitHandler<CreateCourse> = (user) => {
    console.log("SubmitHandler");
    dispatch(createCourseAction(user));
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
            placeholder="Type course name"
            {...register("name")}
          />
        </div>
        {/* Teacher */}
        <div>
          <Label htmlFor="email4" className="form-label" value="Teacher" />
          <SearchInput
            placeholder="Search teachers ..."
            data={searchTeachers}
          />
        </div>
        {/* <div> 
        </div> */}
        {/* <div>
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
        </div> */}
        {/* Training */}

        {/* Description */}
        <div className="sm:col-span-2">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id={id + "description"}
            rows={4}
            className="form-input-textarea"
            placeholder="Write course description here"
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
