import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CategoryEditForm from "../../components/forms/category-form/category-edit-form";
import { readTrainingCategoryAction } from "../../store/actions/training-category.actions";
import { AppDispatch, RootState } from "../../store/store";
import SectionHeader from "../../components/section-header/section-header";
import { ActionMenu } from "../../components/action-menu/action-menu";

const CategoryEditPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Retrieve the id from the url
  let { categoryId } = useParams();

  //
  const { loading, errors } = useSelector(
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
      <ActionMenu title="Editing category" />
      <CategoryEditForm />
    </>
  );
};

export default CategoryEditPage;
