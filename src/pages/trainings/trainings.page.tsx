import { Button, Modal, Table } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../components/modals/delete-model";
import { TableHeader } from "../../components/page-header/page-header";
import TrainingForm from "../../components/training-form/training-form";
import {
  notificationHideAction,
  notificationShowAction,
} from "../../store/actions/notification.actions";
import { AppDispatch, RootState } from "../../store/store";

const TrainingsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { trainings, showModal, loading, errors } = useSelector(
    (state: RootState) => state.trainings
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
    // move to useEffect or outside function with condition on state.successDelete
    dispatch(notificationShowAction(2000));
    setTimeout(() => {
      dispatch(notificationHideAction());
    }, 5000);
  };

  const handleSearch = (terms: string) => {
    console.log(terms);
  };

  return (
    <>
      <TableHeader title="All Trainings" onSearch={handleSearch}>
        <Button
          onClick={() => {
            setShowAddModal(true);
          }}
        >
          Add Training
        </Button>
      </TableHeader>
      {/* Trainings Data View */}
      {/* Table | Grid */}
      <Table striped={true} hoverable={true} className="rounded-none">
        <Table.Head className="rounded-none">
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Training name</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Teacher</Table.HeadCell>
          <Table.HeadCell>Duration</Table.HeadCell>
          <Table.HeadCell>Period</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {trainings.map((training) => (
            <Table.Row className="table-row" key={training.id}>
              <Table.Cell>{training.category.name}</Table.Cell>
              <Table.Cell className="table-cell-title">
                {training.name}
              </Table.Cell>
              <Table.Cell>{training.description}</Table.Cell>
              <Table.Cell>{training.teacher}</Table.Cell>
              <Table.Cell>{training.duration}</Table.Cell>
              <Table.Cell>
                {training.startDate} - {training.endDate}
              </Table.Cell>
              <Table.Cell>
                <div className="space-x-2">
                  <button
                    className="font-medium text-slate-50 bg-slate-600  px-2 pt-1 rounded-sm"
                    onClick={() => {
                      setEditId(training.id);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="font-medium text-slate-50 bg-red-600  px-2 pt-1 rounded-sm"
                    onClick={() => {
                      setDeleteId(training.id);
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
        <Modal.Header>Add Training</Modal.Header>
        <Modal.Body>
          <TrainingForm />
        </Modal.Body>
      </Modal>
      {/* 
        Delete Modal 
      */}
      <DeleteModal
        show={showDeleteModal}
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
        description="Are you sure you want to delete this training?"
      />
    </>
  );
};

export default TrainingsPage;
