import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  deleteTrainingCategoryAction,
  readTrainingCategoryAction,
} from "../../store/actions/training-category.actions";
import { HiPencil, HiTrash } from "react-icons/hi";

const CategoryDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  // read router variable
  let { categoryId } = useParams();

  const { category } = useSelector((state: RootState) => state.categories);

  /**
   * Dispatch action to load trainings and trainings categories
   */
  useEffect(() => {
    if (categoryId) dispatch(readTrainingCategoryAction(categoryId));
  }, []);

  return (
    <>
      {/*  */}
      <div className="flex items-center space-x-4">
        <button type="button" className="btn-primary">
          <HiPencil className="mr-2" />
          Edit
        </button>
        <button
          type="button"
          className="btn-danger"
          onClick={() => {
            if (categoryId)
              // FIXME: set id to delete and show confirm dialog
              dispatch(deleteTrainingCategoryAction(categoryId));
          }}
        >
          <HiTrash className="mr-2" />
          Delete
        </button>
      </div>
      {/*  */}
      <div className="md:max-w-lg">
        <h2>{category?.name}</h2>
        <dl>
          <dt>Created</dt>
          {/* <dd>{category?.createdAt}</dd> */}
          <dt>Details</dt>
          <dd>{category?.description}</dd>
          <dt>Trainings</dt>
          <dd>
            <ul className="space-y-2">
              {category?.trainings?.map((training) => (
                <li
                  key={training.id}
                  className="p-2 gap-y-2 rounded-md  bg-slate-400 hover:bg-slate-700"
                >
                  <div className="flex gap-x-4">
                    <img
                      className="h-12 w-12 flex-none rounded-full bg-gray-50"
                      src={"http://localhost:3000/" + training.cover}
                      alt=""
                    />
                    <div>
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {training.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {training.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </dd>
        </dl>
      </div>
    </>
  );
};

export default CategoryDetailsPage;
