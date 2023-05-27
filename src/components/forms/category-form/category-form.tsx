import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useId } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { CreateTrainingCategory } from "../../../models/training-category.model";
import { AppDispatch, RootState } from "../../../store/store";
import { createTrainingCategoryAction } from "../../../store/actions/training-category.actions";
import InputImageViewer from "../../inputs/input-image-viewer/input-image-viewer";

const validationSchema = Yup.object({
  name: Yup.string().trim().required(),
  description: Yup.string().trim().required(),
  // cover: Yup.mixed().required("Cover is required"),
});

const CategoryForm = () => {
  const id = useId();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Store
  const { successCreate, showModal, loading, errors } = useSelector(
    (state: RootState) => state.categories
  );

  // React Hook form
  const {
    control,
    setValue,
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

  // Reset form
  useEffect(() => {
    console.log("reset()");
    // reset();
    if (successCreate) reset();
  }, [successCreate, showModal]);

  const handleOnSubmit: SubmitHandler<CreateTrainingCategory> = (category) => {
    console.log("Submit Category Handler", category);
    dispatch(createTrainingCategoryAction(category));
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
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
              className="w-full h-64"
              register={register}
              name="cover"
              onChange={(e) => {
                console.log("onnChange() ", e);
                setValue(name, e);
                onChange(e);
              }}
            />
          )}
        />

        <div className="grid gap-4 mb-4">
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
          <div>
            <label htmlFor={id + "description"} className="form-label">
              Description
            </label>
            <textarea
              id={id + "description"}
              rows={4}
              className="form-input-textarea h-full"
              placeholder="Write category description here"
              {...register("description", { required: true, minLength: 2 })}
            ></textarea>
          </div>
        </div>
      </div>
      {/* Errors */}
      <p className="text-sm font-bold text-red-500 dark:text-gray-400">
        {errors}
      </p>

      {/* 
          Submit 
          FIXME: 
      */}
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
        Add new category
      </button>
    </form>
  );
};

export default CategoryForm;
