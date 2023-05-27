import { ActionMenu } from "../../components/action-menu/action-menu";
import CourseEditForm from "../../components/forms/course-form/course-edit-form";

const CourseEditPage = () => {
  return (
    <>
      <ActionMenu title="Editing Course"></ActionMenu>
      <CourseEditForm />
    </>
  );
};

export default CourseEditPage;
