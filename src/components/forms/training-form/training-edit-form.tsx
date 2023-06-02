import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useId } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { UpdateTraining } from "../../../models/training.model";
import {
  readTrainingAction,
  updateTrainingAction,
} from "../../../store/actions/training.actions";
import { AppDispatch, RootState } from "../../../store/store";
import InputImageViewer from "../../inputs/input-image-viewer/input-image-viewer";

const validationSchema = Yup.object({
  name: Yup.string().trim().required(),
  description: Yup.string().trim().required(),
  TrainingCategoryId: Yup.string().trim().required(), // Association
  startDate: Yup.string().trim().required(),
  endDate: Yup.string().trim().required(),
});

const TrainingEditForm = () => {
  const id = useId();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Retrieve the id from the url
  const { trainingId } = useParams();

  // Store
  const { training, successCreate, loading, errors } = useSelector(
    (state: RootState) => state.trainings
  );

  // Store
  const { categories } = useSelector((state: RootState) => state.categories);

  const {
    register,
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors: formErrors }, // FIXME
  } = useForm<UpdateTraining>({
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

  /**
   * Handle the form submission
   * @param training
   */
  const handleOnSubmit: SubmitHandler<UpdateTraining> = (training) => {
    console.log("Submit Training Handler : ", training);
    dispatch(updateTrainingAction(training));
  };

  /**
   * Dispatch an action to retrieve the details of a training
   */
  useEffect(() => {
    // reset();
    if (trainingId) dispatch(readTrainingAction(trainingId));
  }, [trainingId]);

  /**
   * Reset the form
   */
  useEffect(() => {
    if (successCreate) reset();
  }, [successCreate]);

  /**
   * Update the form
   */
  useEffect(() => {
    if (training) {
      const { name, description, category, startDate, endDate } = training;

      console.log(startDate, endDate);
      reset({
        name,
        description,
        TrainingCategoryId: category.id,
        startDate,
        endDate,
      });
    }
  }, [training, reset]);

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="grid gap-4 mb-4 sm:grid-cols-1">
        {/* Cover */}
        <Controller
          control={control}
          name="cover"
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <InputImageViewer
              className="h-64"
              register={register}
              name="cover"
              image={training?.cover}
              onChange={(e) => {
                console.log("onnChange() ", e);
                setValue(name, e);
                onChange(e);
              }}
            />
          )}
        />

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
        Update
      </button>
    </form>
  );
};

export default TrainingEditForm;
