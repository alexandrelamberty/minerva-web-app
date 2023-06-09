import { Avatar, Button } from "flowbite-react";
import { useEffect } from "react";
import { HiPencil } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ActionMenu } from "../../components/action-menu/action-menu";
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
      <ActionMenu title="View Student Details">
        <Button onClick={() => navigate("./edit")}>
          <HiPencil className="mr-2" />
          Edit
        </Button>
        <Button
          color="failure"
          onClick={() => {
            if (studentId)
              // FIXME: set id to delete and show confirm dialog
              dispatch(deleteTrainingCategoryAction(studentId));
          }}
        >
          <HiPencil className="mr-2" />
          Delete
        </Button>
      </ActionMenu>

      {/*  */}
      <div className="md:max-w-lg">
        <h2>
          {student?.firstName} {student?.lastName}
        </h2>
        <dl>
          <dt>Avatar</dt>
          <dd>
            <Avatar size="xl" img={student?.avatar} />
          </dd>
          <dt>FirstName</dt>
          <dd>{student?.firstName}</dd>
          <dt>LastName</dt>
          <dd>{student?.lastName}</dd>
          <dt>Email</dt>
          <dd>{student?.email}</dd>
          <dt>Trainings</dt>
          <dd>
            <ul>
              {student?.trainings.map((training) => (
                <li key={training.id}>{training.name}</li>
              ))}
            </ul>
            <p>No training assigned</p>
          </dd>
          {/* <dt>Courses</dt>
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
          </dd> */}
        </dl>
      </div>
    </>
  );
};

export default StudentDetailsPage;
