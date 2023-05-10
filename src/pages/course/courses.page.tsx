import { Button, Modal, Table } from "flowbite-react";
import { TableHeader } from "../../components/page-header/page-header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { useState } from "react";
import DeleteModal from "../../components/modals/delete-model";
import CourseForm from "../../components/course-form/course-form";

const CoursesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { courses, loading, errors } = useSelector(
    (state: RootState) => state.courses
  );

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editId, setEditId] = useState("");

  const handleAddModalClose = () => {
    setShowAddModal(false);
  };

  const handleAddModalSave = () => {
    // dispatch store action
  };

  const handleDeleteClose = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleDeleteConfirm = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleSearch = (terms: string) => {
    console.log(terms);
  };
  return (
    <>
      <TableHeader title="All Courses" onSearch={handleSearch}>
        <Button
          onClick={() => {
            setShowAddModal(true);
          }}
        >
          Add Course
        </Button>
      </TableHeader>
      {/* Trainings Data View */}
      {/* Table | Grid */}
      <Table striped={true} hoverable={true}>
        <Table.Head>
          <Table.HeadCell>Course name</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
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
              <Table.Cell>{course.teacher}</Table.Cell>
              <Table.Cell>{course.duration}</Table.Cell>
              <Table.Cell>
                {course.startDate} - {course.endDate}
              </Table.Cell>
              <Table.Cell>
                <div className="space-x-2">
                  <button
                    className="font-medium text-slate-50 bg-slate-600  px-2 pt-1 rounded-sm"
                    onClick={() => {
                      setEditId(category.id);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="font-medium text-slate-50 bg-red-600  px-2 pt-1 rounded-sm"
                    onClick={() => {
                      setDeleteId(category.id);
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
        Add Modal 
      */}
      <Modal show={showAddModal} onClose={handleAddModalClose}>
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
        description="Are you sure you want to delete this Course?"
      />
    </>
  );
};

export default CoursesPage;
