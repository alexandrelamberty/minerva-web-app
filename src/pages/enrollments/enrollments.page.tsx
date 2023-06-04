import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteEnrollmentAction,
  getAllEnrollmentsAction,
} from "../../store/actions/enrollment.actions";
import { AppDispatch, RootState } from "../../store/store";
import { ActionMenu } from "../../components/action-menu/action-menu";
import { TextInput, Button, Table, Tooltip, Modal } from "flowbite-react";
import { HiOutlineBookOpen, HiEye } from "react-icons/hi";
import TrainingForm from "../../components/forms/training-form/training-form";
import DeleteModal from "../../components/modals/delete-model";
import { showTrainingCreateModalAction } from "../../store/actions/training.actions";

const EnrollmentsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  /**
   * Store Enrollments
   */
  const { enrollments, showModal, loading, errors } = useSelector(
    (state: RootState) => state.enrollments
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
    dispatch(deleteEnrollmentAction(deleteId));

    // FIXME: Global notification
    // move to useEffect or outside function with condition on state.successDelete
    // dispatch(notificationShowAction(2000));
    // setTimeout(() => {
    //   dispatch(notificationHideAction());
    // }, 5000);
  };

  /**
   * Handle search from the ActionMenu
   * @param terms The terms to search
   */
  const handleSearch = (terms: string) => {
    console.log(terms);
  };

  /**
   * Dispatch action to load enrollments
   */
  useEffect(() => {
    dispatch(getAllEnrollmentsAction());
  }, []);

  return (
    <>
      <ActionMenu title="Enrollments">
        <TextInput
          id="search"
          type="text"
          icon={HiOutlineBookOpen}
          placeholder="Search trainings ..."
        />
        <Button
          onClick={() => {
            dispatch(showTrainingCreateModalAction(true));
          }}
        >
          Add Training
        </Button>
      </ActionMenu>
      {/* Trainings Data View */}
      {/* Table | Grid */}
      <Table striped={true} hoverable={true} className="rounded-none">
        <Table.Head className="rounded-none">
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Student</Table.HeadCell>
          <Table.HeadCell>Training</Table.HeadCell>
          <Table.HeadCell>Validated</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {enrollments.map((enrollment) => (
            <Table.Row className="table-row" key={enrollment.id}>
              <Table.Cell>{enrollment?.status}</Table.Cell>
              <Table.Cell className="table-cell-title">
                {enrollment.student.identification}
              </Table.Cell>
              <Table.Cell>{enrollment.training.name}</Table.Cell>
              <Table.Cell>{enrollment.id}</Table.Cell>
              <Table.Cell>
                <div className="flex justify-end items-center space-x-3 sm:space-x-4">
                  <button
                    type="button"
                    className="btn-action-outline"
                    onClick={() => {
                      navigate("./" + enrollment.id);
                    }}
                  >
                    Validate
                  </button>
                  <button
                    type="button"
                    className="btn-action-outline"
                    onClick={() => {
                      setEditId(enrollment.id);
                      setShowEditModal(true);
                      navigate(enrollment.id + "/edit");
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn-action-outline"
                    onClick={() => {
                      setDeleteId(enrollment.id);
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
        Delete Modal 
      */}
      <DeleteModal
        show={showDeleteModal}
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
        description="Are you sure you want to delete this enrollment?"
      />
    </>
  );
};

export default EnrollmentsPage;
