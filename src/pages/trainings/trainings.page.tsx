import { Button, Modal, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../components/modals/delete-model";
import { ActionMenu } from "../../components/action-menu/action-menu";
import TrainingForm from "../../components/forms/training-form/training-form";
import {
  notificationHideAction,
  notificationShowAction,
} from "../../store/actions/notification.actions";
import { AppDispatch, RootState } from "../../store/store";
import {
  deleteTrainingAction,
  getAllTrainingsAction,
  showTrainingCreateModalAction,
} from "../../store/actions/training.actions";
import { getAllTrainingsCategoriesAction } from "../../store/actions/training-category.actions";
import { HiBookOpen, HiBookmarkAlt, HiOutlineBookOpen } from "react-icons/hi";

const TrainingsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { categories } = useSelector((state: RootState) => state.categories);
  const { trainings, showModal, loading, errors } = useSelector(
    (state: RootState) => state.trainings
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
    dispatch(deleteTrainingAction(deleteId));

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

  useEffect(() => {
    // FIXME: replace with a hook for the form select data
    dispatch(getAllTrainingsCategoriesAction());
    dispatch(getAllTrainingsAction());
  }, []);

  return (
    <>
      <ActionMenu title="All Trainings" onSearch={handleSearch}>
        <TextInput
          id="search"
          type="text"
          icon={HiOutlineBookOpen}
          placeholder="Search calendar ..."
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
          <Table.HeadCell></Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Training name</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Period</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {trainings.map((training) => (
            <Table.Row className="table-row" key={training.id}>
              <Table.Cell>
                <img
                  width={128}
                  src={"http://localhost:3000/" + training.cover}
                />
              </Table.Cell>
              <Table.Cell>{training.category?.name}</Table.Cell>
              <Table.Cell className="table-cell-title">
                {training.name}
              </Table.Cell>
              <Table.Cell>{training.description}</Table.Cell>
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
                      navigate(training.id + "/edit");
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
      <Modal
        show={showModal}
        onClose={() => {
          dispatch(showTrainingCreateModalAction(false));
        }}
      >
        <Modal.Header>Add Training</Modal.Header>
        <Modal.Body>
          {/* 
            Training as a dependency with Category
            Passing data for the TrainingCategoryId form select
          */}
          <TrainingForm categories={categories} />
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
