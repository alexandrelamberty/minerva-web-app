import { useEffect } from "react";
import { HiPencil, HiTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentByIdAction } from "../../store/actions/students.actions";
import { deleteTrainingCategoryAction } from "../../store/actions/training-category.actions";
import { AppDispatch, RootState } from "../../store/store";

const StudentDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Retrieve the id from the url
  const { studentId: studentId } = useParams();

  //
  const { student, loading, errors } = useSelector(
    (state: RootState) => state.students
  );

  /**
   * Dispatch an action to retrieve the details of a training category
   */
  useEffect(() => {
    if (studentId) dispatch(getStudentByIdAction(studentId));
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
            if (studentId)
              // FIXME: set id to delete and show confirm dialog
              dispatch(deleteTrainingCategoryAction(studentId));
          }}
        >
          <HiTrash className="mr-2" />
          Delete
        </button>
      </div>
      {/*  */}
      <div className="md:max-w-lg">
        <h2>{student?.firstName}</h2>
        <dl>
          <dt>Avatar</dt>
          <dd>
            <img
              height={420}
              className="object-cover h-48 w-96"
              src={"http://localhost:3000/" + student?.user.avatar}
            />
          </dd>
          <dt>FirstName</dt>
          <dd>{student?.firstName}</dd>
          <dt>LastName</dt>
          <dd>{student?.lastName}</dd>
          <dt>Email</dt>
          <dd>{student?.email}</dd>
          <dt>Assignees</dt>
          <dd>
            {/* <ul>
              {student?.trainings.map((training) => (
                <li key={training.id}>{training.name}</li>
              ))}
            </ul> */}
            <p>No course assigned</p>
          </dd>
          <dt>Courses</dt>
          <dd>
            <ul>
              {student?.courses.map((course) => (
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

export default StudentDetailsPage;
