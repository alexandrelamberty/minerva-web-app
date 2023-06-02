import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useId, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { CreateTrainingCategory } from "../../../models/training-category.model";
import { getCategorySuggestion } from "../../../services/api-service";
import { getCategoryDescriptionAction } from "../../../store/actions/ai.action";
import { createTrainingCategoryAction } from "../../../store/actions/training-category.actions";
import { AppDispatch, RootState } from "../../../store/store";
import ButtonAI from "../../button-generate/button-ai";
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

  // States
  const { successCreate, showModal, loadingCreate, errorsCreate } = useSelector(
    (state: RootState) => state.categories
  );

  const { description, status, loading, errors } = useSelector(
    (state: RootState) => state.ai
  );

  const [loadingSuggestion, setLoadingSuggestion] = useState(false);

  // const [description, loading, errors] = useCategoryDescription(terms);

  // React Hook form
  const {
    control,
    setValue,
    getValues,
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

  /**
   * Handle suggest category name
   */
  const handleSuggestCategoryName = async () => {
    console.log("handleSuggestCategoryName");
    try {
      // call api
      setLoadingSuggestion(true);
      const response = await getCategorySuggestion();
      const suggestion = response.data.suggestion;
      console.log("suggestion: ", suggestion);
      setValue("name", suggestion);
      setLoadingSuggestion(false);
    } catch (error: any) {
      console.log("Errors", errors);
    }
  };

  /**
   * Handle generate description
   */
  const handleDescribe = () => {
    // Get hook form value
    const categoryName = getValues("name");
    if (categoryName !== "")
      // Dispatch hook store action
      dispatch(getCategoryDescriptionAction(categoryName));
  };

  /**
   *
   */
  useEffect(() => {
    // Set hook form value
    if (description) setValue("description", description);
  }, [description]);

  /**
   * Reset the form
   */
  useEffect(() => {
    // Reset hook form values
    if (successCreate) reset();
  }, [successCreate, showModal]);

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
              className="aspect-video"
              register={register}
              name="cover"
              onChange={(e) => {
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
            <div className="flex gap-2">
              <input
                type="text"
                id={id + "name"}
                className="form-input"
                placeholder="Type category name"
                {...register("name", { required: true, minLength: 2 })}
              />
              <ButtonAI
                loading={loadingSuggestion}
                onClick={() => handleSuggestCategoryName()}
              />
            </div>
          </div>
          {/* Description */}
          <div>
            <label htmlFor={id + "description"} className="form-label">
              Description
            </label>
            <div className="flex space-x-2">
              <textarea
                id={id + "description"}
                rows={4}
                className="form-input-textarea h-full"
                placeholder="Write category description here"
                {...register("description", { required: true, minLength: 2 })}
              ></textarea>
              <ButtonAI loading={loading} onClick={() => handleDescribe()} />
            </div>
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
