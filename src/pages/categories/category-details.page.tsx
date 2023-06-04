import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  deleteTrainingCategoryAction,
  readTrainingCategoryAction,
} from "../../store/actions/training-category.actions";
import { HiBookOpen, HiPencil, HiTrash } from "react-icons/hi";
import { ActionMenu } from "../../components/action-menu/action-menu";
import TrainingListItem from "../../components/training-list-item/training-list-item";
import AppAlert from "../../components/app-alert/app-alert";
import ImagePreview from "../../components/image-preview/image-preview";

const CategoryDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Retrieve the id of the category
  let { categoryId } = useParams();

  //
  const { category, loadingCreate, errors } = useSelector(
    (state: RootState) => state.categories
  );

  /**
   * Dispatch an action to retrieve the details of a training category
   */
  useEffect(() => {
    if (categoryId) dispatch(readTrainingCategoryAction(categoryId));
  }, []);

  return (
    <>
      {/*  */}
      <ActionMenu
        title="Viewing Category Details"
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
            if (categoryId)
              // FIXME: set id to delete and show confirm dialog
              dispatch(deleteTrainingCategoryAction(categoryId));
          }}
        >
          <HiTrash className="mr-2" />
          Delete
        </button>
      </ActionMenu>
      {/* 
        Category Details 
      */}
      <div className="flex flex-col-reverse md:flex-row md:space-x-4">
        {/*  */}
        <div className="md:basis-3/4">
          <dl>
            <dt className="sr-only">name</dt>
            <h2>{category?.name}</h2>
            <dt>Description</dt>
            <dd>{category?.description}</dd>
            <dt>Trainings in this category</dt>
            <dd>
              <ul className="max-w-md space-y-2">
                {category?.trainings && category?.trainings.length > 0 ? (
                  category?.trainings.map((training) => (
                    <TrainingListItem key={training.id} training={training} />
                  ))
                ) : (
                  <AppAlert
                    title="Info"
                    message="There is no trainings at the moment"
                  />
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
              <ImagePreview
                src={"http://localhost:3000/" + category?.cover}
                alt="category cover"
              />
            </dd>
          </dl>
        </div>
      </div>
    </>
  );
};

export default CategoryDetailsPage;
