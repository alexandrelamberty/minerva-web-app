import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteCourseAction,
  readCourseAction,
} from "../../store/actions/course.actions";
import { AppDispatch, RootState } from "../../store/store";
import { HiPencil, HiTrash } from "react-icons/hi";

const CourseDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  // read router variable
  let { courseId } = useParams();

  const { course } = useSelector((state: RootState) => state.courses);
  /**
   * Dispatch action to load trainings and trainings categories
   */
  useEffect(() => {
    if (courseId) dispatch(readCourseAction(courseId));
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900">
      {/*  */}
      <div className="flex items-center space-x-4">
        <button
          type="button"
          className=" inline-flex items-center text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <HiPencil className="mr-2" />
          Edit
        </button>
        <button
          type="button"
          className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
          onClick={() => {
            if (courseId)
              // FIXME: set id to delete and show confirm dialog
              dispatch(deleteCourseAction(courseId));
          }}
        >
          <HiTrash className="mr-2" />
          Delete
        </button>
      </div>
      {/*  */}
      <div className="max-w-md">
        <h2>{course?.name}</h2>
        <dl>
          <dt>Details</dt>
          <dd>{course?.description}</dd>
          <dt>Teacher</dt>
          <dd>
            <div className="flex gap-x-4">
              {/* <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={"http://localhost:3000/" + course?.cover?}
                alt=""
              /> */}
            </div>
            {course?.teacher?.User.firstName}
          </dd>
          <dt>Dates</dt>
          <dd>
            <ul className="max-w-md">
              {course?.dates?.map((courseDate) => (
                <li key={courseDate.id} className="flex gap-x-6 py-5">
                  <div className="flex gap-x-4">
                    <div className="min-w-0 ">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {courseDate.date}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {courseDate.teacher?.User.firstName}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </dd>
        </dl>
      </div>
    </section>
  );
};

export default CourseDetailsPage;
