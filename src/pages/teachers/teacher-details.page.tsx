import { useEffect } from "react";
import { HiPencil, HiTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getTeacherByIdAction } from "../../store/actions/teacher.actions";
import { deleteTrainingCategoryAction } from "../../store/actions/training-category.actions";
import { AppDispatch, RootState } from "../../store/store";

const TeacherDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Retrieve the id from the url
  const { teacherId } = useParams();

  //
  const { teacher, loading, errors } = useSelector(
    (state: RootState) => state.teachers
  );

  /**
   * Dispatch an action to retrieve the details of a training category
   */
  useEffect(() => {
    if (teacherId) dispatch(getTeacherByIdAction(teacherId));
  }, []);

  return (
    <>
      {/*  */}
      <div className="flex items-center space-x-4">
        <button
          type="button"
          className="btn-primary"
          onClick={() => navigate("./edit")}
        >
          <HiPencil className="mr-2" />
          Edit
        </button>
        <button
          type="button"
          className="btn-danger"
          onClick={() => {
            if (teacherId)
              // FIXME: set id to delete and show confirm dialog
              dispatch(deleteTrainingCategoryAction(teacherId));
          }}
        >
          <HiTrash className="mr-2" />
          Delete
        </button>
      </div>
      {/*  */}
      <div className="md:max-w-lg">
        <h2>{teacher?.user.firstName}</h2>
        <dl>
          <dt>Avatar</dt>
          <dd>
            <img
              height={420}
              className="object-cover h-48 w-96"
              src={"http://localhost:3000/" + teacher?.user.avatar}
            />
          </dd>
          <dt>FirstName</dt>
          <dd>{teacher?.user.firstName}</dd>
          <dt>LastName</dt>
          <dd>{teacher?.user.lastName}</dd>
          <dt>Email</dt>
          <dd>{teacher?.user.email}</dd>
          <dt>Assignees</dt>
          <dd>
            {/* <ul>
              {teacher?.trainings.map((training) => (
                <li key={training.id}>{training.name}</li>
              ))}
            </ul> */}
            <p>No course assigned</p>
          </dd>
          <dt>Courses</dt>
          <dd>
            <ul>
              {teacher?.courses.map((course) => (
                <li
                  key={course.id}
                  className="p-2 rounded-md bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
                >
                  {course.name}
                </li>
              ))}
            </ul>
          </dd>
        </dl>
      </div>
    </>
  );
};

export default TeacherDetailsPage;
