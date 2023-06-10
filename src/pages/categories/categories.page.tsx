import { Button, Modal, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiBookmark } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ActionMenu } from "../../components/action-menu/action-menu";
import CategoryForm from "../../components/forms/category-form/category-form";
import {
  deleteTrainingCategoryAction,
  getAllTrainingsCategoriesAction,
  showTrainingCategoryCreateModalAction,
} from "../../store/actions/training-category.actions";
import { AppDispatch, RootState } from "../../store/store";

const CategoriesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { categories, showModal, loadingCreate, successDelete, errorsCreate } =
    useSelector((state: RootState) => state.categories);

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
    dispatch(deleteTrainingCategoryAction(deleteId));
  };

  /**
   * Handle search from the ActionMenu
   * @param terms The terms to search
   */
  const handleSearch = (terms: string) => {
    console.log(terms);
    // TODO: dispatch Action
  };

  if (successDelete) {
    // dispatch(notificationShowAction(1000));
  }

  useEffect(() => {
    dispatch(getAllTrainingsCategoriesAction(null));
  }, []);

  return (
    <>
      <ActionMenu title="View Categories">
        <TextInput
          id="search"
          type="text"
          icon={HiBookmark}
          placeholder="Search categories"
        />
        <Button
          onClick={() => {
            dispatch(showTrainingCategoryCreateModalAction(true));
          }}
        >
          Add Category
        </Button>
      </ActionMenu>
      {/* Trainings Data View */}
      {/* Table | Grid */}
      <Table striped={true} hoverable={true}>
        <Table.Head>
          <Table.HeadCell></Table.HeadCell>
          <Table.HeadCell>Category name</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {categories.map((category) => (
            <Table.Row className="table-row" key={category.id}>
              <Table.Cell>
                <img
                  width={64}
                  src={"http://localhost:3000/" + category.cover}
                />
              </Table.Cell>
              <Table.Cell className="table-cell-title">
                {category.name}
              </Table.Cell>
              <Table.Cell>{category.description}</Table.Cell>
              <Table.Cell>
                <div className="flex justify-end space-x-3 sm:space-x-4">
                  <button
                    className="btn-action-outline"
                    onClick={() => {
                      navigate("./" + category.id);
                    }}
                  >
                    View
                  </button>
                  <button
                    className="btn-action-outline"
                    onClick={() => {
                      setEditId(category.id);
                      setShowEditModal(true);
                      navigate(category.id + "/edit");
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-action-outline"
                    onClick={() => {
                      // setDeleteId(category.id);
                      // dispatch();
                      // setShowDeleteModal(true);
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
        size="2xl"
        show={showModal}
        onClose={() => {
          dispatch(showTrainingCategoryCreateModalAction(false));
        }}
      >
        <Modal.Header>Add Category</Modal.Header>
        <Modal.Body>
          <CategoryForm />
        </Modal.Body>
      </Modal>
      {/* 
        Delete Modal 
      */}
      {/* <DeleteModal
        show={showDeleteModal}
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
        description="Are you sure you want to delete this Category?"
      /> */}
    </>
  );
};

export default CategoriesPage;
