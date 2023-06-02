import { ActionMenu } from "../../components/action-menu/action-menu";
import CategoryEditForm from "../../components/forms/category-form/category-edit-form";

const CategoryEditPage = () => {
  return (
    <>
      <ActionMenu title="Editing category" />
      <CategoryEditForm />
    </>
  );
};

export default CategoryEditPage;
