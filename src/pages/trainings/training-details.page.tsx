import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import {
  deleteTrainingAction,
  readTrainingAction,
} from "../../store/actions/training.actions";
import { useEffect } from "react";
import { HiPencil, HiTrash } from "react-icons/hi";

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
          className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
          onClick={() => {
            if (trainingId)
              // FIXME: set id to delete and show confirm dialog
              dispatch(deleteTrainingAction(trainingId));
          }}
        >
          <HiTrash className="mr-2" />
          Delete
        </button>
      </div>
      {/*  */}
      <div className="max-w-md">
        <h2>{training?.name}</h2>
        <dl>
          <dt>Cover</dt>
          <dd>
            <img
              height={420}
              className="object-cover h-48 w-96"
              src={"http://localhost:3000/" + training?.cover}
            />
          </dd>
          <dt>Details</dt>
          <dd>{training?.description}</dd>
          <dt>Courses</dt>
          <dd>
            <ul className="max-w-md">
              {training?.courses?.map((course) => (
                <li key={course.id} className="flex gap-x-6 py-5">
                  <div className="flex gap-x-4">
                    <img
                      className="h-12 w-12 flex-none rounded-full bg-gray-50"
                      // src={"http://localhost:3000/" + course.cover}
                      alt=""
                    />
                    <div className="min-w-0 ">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {course.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {course.description}
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
export default TrainingDetailsPage;
