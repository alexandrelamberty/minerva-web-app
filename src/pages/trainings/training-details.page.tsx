import { useEffect } from "react";
import { HiBookOpen, HiPencil, HiTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ActionMenu } from "../../components/action-menu/action-menu";
import AppAlert from "../../components/app-alert/app-alert";
import CourseListItem from "../../components/course-list-item/course-list-item";
import ImagePreview from "../../components/image-preview/image-preview";
import TeacherItem from "../../components/teacher-item/teacher-item";
import {
  deleteTrainingAction,
  readTrainingAction,
} from "../../store/actions/training.actions";
import { AppDispatch, RootState } from "../../store/store";
import { toISODate } from "../../utils/utils";

/**
 * Show details about a Training and an action bar to edit or delete the
 * training
 *
 */
const TrainingDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Retrieve the id from the url
  const { trainingId } = useParams();

  const { training } = useSelector((state: RootState) => state.trainings);

  /**
   * Dispatch an action to retrieve the details of a training
   */
  useEffect(() => {
    if (trainingId) dispatch(readTrainingAction(trainingId));
  }, []);

  return (
    <>
      {/* 
        Action Menu 
      */}
      <ActionMenu
        title="Viewing Training Details"
        icon={<HiBookOpen className="w-12 h-12 mr-2" />}
      >
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
            if (trainingId)
              // FIXME: set id to delete and show confirm dialog
              dispatch(deleteTrainingAction(trainingId));
          }}
        >
          <HiTrash className="mr-2" />
          Delete
        </button>
      </ActionMenu>
      {/* 
        Training Details 
        Description list in a single column on small device and two columns on
        medium and beyond.
        
      */}
      <div className="flex flex-col-reverse md:flex-row md:space-x-2">
        {/*  */}
        <div className="md:basis-3/4">
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
                    <CourseListItem
                      key={course.id}
                      course={course}
                      onClick={() => console.log("CourseItemClick....")}
                    />
                  ))
                ) : (
                  <AppAlert title="Info" message="There is no courses" />
                )}
              </ul>
            </dd>
          </dl>
        </div>
        {/*  */}
        <div className="md:basis-2/4">
          <dl>
            <dt className="sr-only">Cover</dt>
            <dd>
              <ImagePreview src={training?.cover} alt="training cover" />
            </dd>
            <dt>Assignee Teacher</dt>
            <dd>
              {training?.teacher !== undefined ? (
                <TeacherItem teacher={training.teacher} />
              ) : (
                <AppAlert
                  title="Info"
                  message="The is no teacher assigned to the training"
                />
              )}
            </dd>
            <dt>Dates</dt>
            {training?.startDate !== undefined ? (
              <>
                <dd>
                  {toISODate(training.startDate)} -{" "}
                  {toISODate(training.endDate)}
                </dd>
              </>
            ) : (
              <AppAlert
                title="Info"
                message="The is no teacher assigned to the training"
              />
            )}
          </dl>
        </div>
      </div>
    </>
  );
};
export default TrainingDetailsPage;
