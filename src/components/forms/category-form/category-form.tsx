import { yupResolver } from "@hookform/resolvers/yup";
import { useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { CreateTrainingCategory } from "../../../models/training-category.model";
import { AppDispatch } from "../../../store/store";
import { createTrainingCategoryAction } from "../../../store/actions/training-category.actions";

const validationSchema = Yup.object({
  name: Yup.string().trim().required(),
  description: Yup.string().trim().required(),
  cover: Yup.string().trim(),
});

const CategoryForm = () => {
  const id = useId();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // React Hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors }, // FIXME
  } = useForm<CreateTrainingCategory>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      description: "",
      cover: undefined,
    },
  });

  const handleOnSubmit: SubmitHandler<CreateTrainingCategory> = (category) => {
    console.log("Submit Category Handler", category);
    dispatch(createTrainingCategoryAction(category));
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
            placeholder="Type category name"
            {...register("name", { required: true, minLength: 2 })}
          />
        </div>
        {/* Description */}
        <div className="sm:col-span-2">
          <label htmlFor={id + "description"} className="form-label">
            Description
          </label>
          <textarea
            id={id + "description"}
            rows={4}
            className="form-input-textarea"
            placeholder="Write category description here"
            {...register("description", { required: true, minLength: 2 })}
          ></textarea>
        </div>
        {/* Cover */}
        <div className="sm:col-span-2 flex items-center justify-center w-full">
          <label
            htmlFor={id + "cover"}
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id={id + "cover"}
              type="file"
              className="hidden"
              {...register("cover")}
            />
          </label>
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
        Add new category
      </button>
    </form>
  );
};

export default CategoryForm;
