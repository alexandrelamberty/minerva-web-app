import { useEffect } from "react";
import { HiPencil, HiTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AppAlert from "../../components/app-alert/app-alert";
import CourseListItem from "../../components/course-list-item/course-list-item";
import { readTrainingAction } from "../../store/actions/training.actions";
import { AppDispatch, RootState } from "../../store/store";

/**
 * Show details about a Training and an action bar to edit or delete the
 * training
 *
 */
const TrainingDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Retrieve the id from the url
  let { trainingId } = useParams();

  const { training } = useSelector((state: RootState) => state.trainings);

  /**
   * Dispatch an action to retrieve the details of a training
   */
  useEffect(() => {
    if (trainingId) dispatch(readTrainingAction(trainingId));
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900">
      {/* 
        Action Menu 
      */}
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
            if (trainingId) {
              // FIXME: set id to delete and show confirm dialog
              // dispatch(deleteTrainingAction(trainingId));
            }
          }}
        >
          <HiTrash className="mr-2" />
          Delete
        </button>
      </div>
      {/* 
        Training Details 
        Description list in a single column on small device and two columns on
        medium and beyond.
        
      */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="max-w-md">
          <dl>
            <dt className="sr-only">name</dt>
            <dd>
              <h2>{training?.name}</h2>
            </dd>
            <dt>Details</dt>
            <dd>{training?.description}</dd>
            <dt>Courses</dt>
            <dd>
              <ul className="max-w-md">
                {training?.courses && training.courses.length > 0 ? (
                  training.courses?.map((course) => (
                    <CourseListItem course={course} />
                  ))
                ) : (
                  <AppAlert
                    title="Info"
                    message="The is no courses at the moment"
                  />
                )}
              </ul>
            </dd>
          </dl>
        </div>
        {/*  */}
        <div>
          <dl>
            <dt>Cover</dt>
            <dd>
              <img
                height={420}
                className="object-cover h-48 w-96"
                src={"http://localhost:3000/" + training?.cover}
              />
            </dd>
            <dt>Assignee Teacher</dt>
            <dd>{/* <TeacherItem teacher={training.teacher} /> */}</dd>
          </dl>
        </div>
      </div>
    </section>
  );
};
export default TrainingDetailsPage;
