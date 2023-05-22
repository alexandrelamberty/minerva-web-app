import { yupResolver } from "@hookform/resolvers/yup";
import { useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { CreateTraining } from "../../../models/training.model";
import { createTrainingAction } from "../../../store/actions/training.actions";
import { AppDispatch } from "../../../store/store";
import { TrainingCategory } from "../../../models/training-category.model";

const validationSchema = Yup.object({
  name: Yup.string().trim().required(),
  description: Yup.string().trim().required(),
  TrainingCategoryId: Yup.string().trim().required(), // Association
  startDate: Yup.string().trim().required(),
  endDate: Yup.string().trim().required(),
});

const TrainingForm = ({ categories }: { categories: TrainingCategory[] }) => {
  const id = useId();
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors }, // FIXME
  } = useForm<CreateTraining>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      description: "",
      TrainingCategoryId: "",
      startDate: "",
      endDate: "",
      cover: undefined,
    },
  });

  const handleOnSubmit: SubmitHandler<CreateTraining> = (training) => {
    console.log("Submit Training Handler : ", training);
    dispatch(createTrainingAction(training));
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="grid gap-4 mb-4 sm:grid-cols-2 ">
        {/* Column left picture */}
        <div className="flex items-center justify-center w-full">
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
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

        <div className="grid gap-4 mb-4 sm:grid-cols-2">
          {/* Name */}
          <div>
            <label htmlFor={id + "price"} className="form-label">
              Name
            </label>
            <input
              type="text"
              id={id + "name"}
              className="form-input"
              placeholder="Name"
              required
              {...register("name")}
            />
          </div>
          {/* Category */}
          <div>
            <label htmlFor={id + "category"} className="form-label">
              Category
            </label>
            {/* FIXME: extract component */}
            <select
              id={id + "category"}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              {...register("TrainingCategoryId")}
            >
              <option selected>Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
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
              placeholder="Write training description here"
              {...register("description")}
            ></textarea>
          </div>
          {/* Cover */}

          {/* Start / End dates */}
          <div>
            <label htmlFor={id + "startDate"} className="form-label">
              Start date
            </label>
            <input
              type="date"
              id={id + "startDate"}
              className="form-input"
              placeholder=""
              {...register("startDate")}
            />
          </div>
          <div>
            <label htmlFor={id + "endDate"} className="form-label">
              End date
            </label>
            <input
              type="date"
              id={id + "endDate"}
              className="form-input"
              placeholder=""
              {...register("endDate")}
            />
          </div>
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
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          ></path>
        </svg>
        Add new training
      </button>
    </form>
  );
};

export default TrainingForm;
