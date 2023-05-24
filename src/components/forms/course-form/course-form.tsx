import { yupResolver } from "@hookform/resolvers/yup";
import { useId, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { HiCloud } from "react-icons/hi";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { CreateCourse } from "../../../models/course.model";
import { Training } from "../../../models/training.model";
import {
  searchTeachers,
  searchTrainings,
  searchUsers,
} from "../../../services/api-service";
import { createCourseAction } from "../../../store/actions/course.actions";
import { AppDispatch } from "../../../store/store";
import TeacherCombobox from "../../inputs/combobox-autocomplete/teacher-combobox";
import TrainingCombobox from "../../inputs/combobox-autocomplete/trainings-combobox";
import { Teacher } from "../../../models/teacher.model";

const validationSchema = Yup.object({
  name: Yup.string().trim().required(),
  description: Yup.string().trim().required(),
  // training: Yup.string().trim().required(),
  // teacher: Yup.string().trim().required(),
});

const CourseForm = () => {
  const id = useId();
  const dispatch = useDispatch<AppDispatch>();

  // Results from the search for the teachers and trainings combobox
  const [teachers, setTeachers] = useState<Teacher[] | null>(null);
  const [trainings, setTrainings] = useState<Training[] | null>(null);

  /**
   * Hook Form
   */
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors }, // FIXME
  } = useForm<CreateCourse>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      description: "",
      Training: null,
      Teacher: null,
    },
  });

  /**
   * Call the api to search for users and update the teachers state with the results.
   * @param terms The terms to search with
   */
  const callSearchUsers = async (terms: string) => {
    console.log("callSearchUsers: ", terms);
    try {
      const response = await searchTeachers(terms);
      setTeachers(response.data.results);
    } catch (err: any) {
      console.log("callSearchUsers ERROR", err);
    }
  };

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
   * Handle ComboboxAutocomplete search user event.
   * @param terms The terms to search with
   */
  const handleSearchTeachers = (terms: string) => {
    console.log("handleOnSearchTeachers: ", terms);
    if (terms.length > 0) callSearchUsers(terms);
    else setTeachers([]);
  };

  /**
   * Handle ComboboxAutocomplete search user event.
   * @param terms The terms to search with
   */
  const handleSearchTrainings = (terms: string) => {
    console.log("handleOnSearchTeachers: ", terms);
    if (terms.length > 0) callSearchTrainings(terms);
    else setTrainings(null);
  };

  /**
   * Handle react hook form submit
   * @param course The course to be created
   */
  const handleOnSubmit: SubmitHandler<CreateCourse> = (course) => {
    console.log("handleOnSubmit<CreateCourse> : ", course);
    dispatch(createCourseAction(course));
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        {/* Name */}
        <div className="sm:col-span-2">
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
          <label htmlFor={id + "teacher"} className="form-label">
            Assignee Teacher
          </label>
          <Controller
            control={control}
            name="Teacher"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <TeacherCombobox
                onSearchChange={handleSearchTeachers}
                onChange={(teacher) => onChange(teacher)}
                selected={value}
                placeholder="Search teachers ..."
                data={teachers}
              />
            )}
          />
        </div>

        {/* Training */}
        <div>
          <label htmlFor={id + "trainingId"} className="form-label">
            Training
          </label>
          <Controller
            control={control}
            name="Training"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <TrainingCombobox
                onSearchChange={handleSearchTrainings}
                onChange={(training) => onChange(training)}
                selected={value}
                placeholder="Search trainings ..."
                data={trainings}
              />
            )}
          />
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
            placeholder="Write course description here"
            {...register("description")}
          ></textarea>
        </div>
      </div>
      {/* 
        Submit 
        */}
      <button type="submit" className="form-button">
        <HiCloud className="mr-1 -ml-1 w-6 h-6" />
        Add new course
      </button>
    </form>
  );
};

export default CourseForm;
