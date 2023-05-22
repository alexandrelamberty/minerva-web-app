import { Button, Modal, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiBookmark } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ActionMenu } from "../../components/action-menu/action-menu";
import CourseForm from "../../components/forms/course-form/course-form";
import DeleteModal from "../../components/modals/delete-model";
import {
  deleteCourseAction,
  getAllCoursesAction,
  showCourseCreateModalAction,
} from "../../store/actions/course.actions";
import { AppDispatch, RootState } from "../../store/store";

const CoursesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  /**
   * Stores
   */
  const { trainings } = useSelector((state: RootState) => state.trainings);
  const { courses, showCreateModal, loading, errors } = useSelector(
    (state: RootState) => state.courses
  );

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editId, setEditId] = useState("");

  /**
   * Handle the delete modal close action
   */
  const handleDeleteClose = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  /**
   * Handle the delete modal confirm action
   */
  const handleDeleteConfirm = () => {
    setShowDeleteModal(!showDeleteModal);
    dispatch(deleteCourseAction(deleteId));
  };

  /**
   * Handle search from the ActionMenu
   * @param terms The terms to search
   */
  const handleSearch = (terms: string) => {
    console.log(terms);
  };

  /**
   * Dispatch action to load all the courses
   */
  useEffect(() => {
    dispatch(getAllCoursesAction());
  }, []);

  return (
    <>
      <ActionMenu>
        {/* Allow to search for users */}
        <TextInput
          id="search"
          type="text"
          icon={HiBookmark}
          placeholder="Search courses ..."
        />

        <Button
          onClick={() => {
            dispatch(showCourseCreateModalAction(true));
          }}
        >
          Add Course
        </Button>
      </ActionMenu>
      {/* Trainings Data View */}
      {/* Table | Grid */}
      <Table striped={true} hoverable={true}>
        <Table.Head>
          <Table.HeadCell>Course name</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Training</Table.HeadCell>
          <Table.HeadCell>Teacher</Table.HeadCell>
          <Table.HeadCell>Duration</Table.HeadCell>
          <Table.HeadCell>Period</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {courses.map((course) => (
            <Table.Row className="table-row" key={course.id}>
              <Table.Cell className="table-cell-title">
                {course.name}
              </Table.Cell>
              <Table.Cell>{course.description}</Table.Cell>
              <Table.Cell>
                {course?.training ? course?.training.name : "no training"}
              </Table.Cell>
              <Table.Cell>{course.teacher.User.firstName}</Table.Cell>
              <Table.Cell>{course.duration}</Table.Cell>
              <Table.Cell>
                {course.startDate} - {course.endDate}
              </Table.Cell>
              <Table.Cell>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <button
                    className="btn-action-outline"
                    onClick={() => {
                      navigate("./" + course.id);
                    }}
                  >
                    View
                  </button>
                  <button
                    className="btn-action-outline"
                    onClick={() => {
                      setEditId(course.id);
                      setShowEditModal(true);
                      navigate(course.id + "/edit");
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-action-outline"
                    onClick={() => {
                      setDeleteId(course.id);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {/* 
        Create Modal 
      */}
      <Modal
        size="lg"
        show={showCreateModal}
        onClose={() => {
          dispatch(showCourseCreateModalAction(false));
        }}
      >
        <Modal.Header>Add Course</Modal.Header>
        <Modal.Body>
          <CourseForm />
        </Modal.Body>
      </Modal>
      {/* 
        Delete Modal 
      */}
      <DeleteModal
        show={showDeleteModal}
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
        description="Are you sure you want to delete this course?"
      />
    </>
  );
};

export default CoursesPage;
