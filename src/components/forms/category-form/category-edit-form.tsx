import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useId, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { UpdateTrainingCategory } from "../../../models/training-category.model";
import {
  readTrainingCategoryAction,
  updateTrainingCategoryAction,
} from "../../../store/actions/training-category.actions";
import { AppDispatch, RootState } from "../../../store/store";
import InputImageViewer from "../../inputs/input-image-viewer/input-image-viewer";
import TrainingCombobox from "../../inputs/combobox-autocomplete/trainings-combobox";
import { Training } from "../../../models/training.model";
import { searchTrainings } from "../../../services/api-service";

const validationSchema = Yup.object({
  name: Yup.string().trim().required(),
  description: Yup.string().trim().required(),
  // cover: Yup.mixed().required("Cover is required"),
});

const CategoryEditForm = () => {
  const id = useId();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Retrieve the id from the url
  let { categoryId } = useParams();
  console.log("CATEGORY ID: ", categoryId);

  // Store
  const { category, successCreate, showModal, loading, errors } = useSelector(
    (state: RootState) => state.categories
  );

  //
  const [trainings, setTrainings] = useState<Training[] | null>(null);

  // React Hook form
  const {
    control,
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm<UpdateTrainingCategory>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: category ? category.name : "",
      description: category ? category.description : "",
      // category:
      // cover: category ? category.cover : undefined,
    },
  });

  /**
   * Call the api to search for trainings and update the trainings  state with the results.
   * @param terms The terms to search with
   */
  const callSearchTrainings = async (terms: string) => {
    console.log("callSearchTrainings: ", terms);
    try {
      const response = await searchTrainings(terms);
      setTrainings(response.data.results);
    } catch (err: any) {
      console.log("callSearchTrainings ERROR", err);
    }
  };

  /**
   * Handle ComboboxAutocomplete search training event.
   * @param terms The terms to search with
   */
  const handleSearchTrainings = (terms: string) => {
    console.log("handleOnSearchTeachers: ", terms);
    if (terms.length > 0) callSearchTrainings(terms);
    else setTrainings(null);
  };

  /**
   * Reset the modal
   */
  useEffect(() => {
    console.log("reset()");
    // reset();
    if (successCreate) {
      reset();
    }
  }, [successCreate, showModal]);

  /**
   * Dispatch an action to retrieve the details of a training category
   */
  useEffect(() => {
    reset();
    if (categoryId) dispatch(readTrainingCategoryAction(categoryId));
  }, [categoryId]);

  const handleOnSubmit: SubmitHandler<UpdateTrainingCategory> = (category) => {
    console.log("Submit Update Category Handler", category);
    dispatch(updateTrainingCategoryAction(category));
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="grid gap-4 mb-4 grid-cols-1">
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
              image={category?.cover}
              onChange={(e) => {
                console.log("onnChange() ", e);
                setValue(name, e);
                onChange(e);
              }}
            />
          )}
        />

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
            className="form-input-textarea"
            placeholder="Write category description here"
            {...register("description", { required: true, minLength: 2 })}
          ></textarea>
        </div>

        {/* Trainings */}
        <div>
          <label htmlFor={id + "trainings"} className="form-label">
            Trainings in the category
          </label>
          <ul id={id + "trainings"} className="space-y-2">
            {category?.trainings?.map((training) => (
              // FIXME: Extract to component
              <li
                key={training.id}
                className="p-2 gap-y-2 rounded-md bg-slate-400 hover:bg-slate-700"
              >
                <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-4">
                  <img
                    className="w-12 h-12 flex-none rounded-full bg-gray-50"
                    src={"http://localhost:3000/" + training.cover}
                    alt=""
                  />
                  <div className="">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {training.name}
                    </p>
                  </div>
                  <div className="">
                    <button type="button" className="btn-danger">
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex p-2 space-x-2">
            <TrainingCombobox
              onSearchChange={handleSearchTrainings}
              onChange={(training) => {
                console.log("onChange training: ", training);
                // TODO: update form with control
              }}
              selected={null}
              placeholder="Search trainings ..."
              data={trainings}
            />
            <button type="button" className="btn-primary">
              Add
            </button>
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
      </div>
    </form>
  );
};

export default CategoryEditForm;
