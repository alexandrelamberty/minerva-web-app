import { Button, Modal, Table } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CategoryForm from "../../components/category-form/category-form";
import DeleteModal from "../../components/modals/delete-model";
import { TableHeader } from "../../components/page-header/page-header";
import { AppDispatch, RootState } from "../../store/store";

const CategoriesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { categories, showModal, loading, errors } = useSelector(
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
  };

  const handleSearch = (terms: string) => {
    console.log(terms);
  };

  return (
    <>
      <TableHeader title="All Training Categories" onSearch={handleSearch}>
        <Button
          onClick={() => {
            setShowAddModal(true);
          }}
        >
          Add Category
        </Button>
      </TableHeader>
      {/* Trainings Data View */}
      {/* Table | Grid */}
      <Table striped={true} hoverable={true} className="rounded-none">
        <Table.Head className="rounded-none">
          <Table.HeadCell>Category name</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {categories.map((category) => (
            <Table.Row className="table-row" key={category.id}>
              <Table.Cell className="table-cell-title">
                {category.name}
              </Table.Cell>
              <Table.Cell>{category.description}</Table.Cell>
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
        <Modal.Header>Add Category</Modal.Header>
        <Modal.Body>
          <CategoryForm />
        </Modal.Body>
      </Modal>
      {/* 
        Delete Modal 
      */}
      <DeleteModal
        show={showDeleteModal}
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
        description="Are you sure you want to delete this Category?"
      />
    </>
  );
};

export default CategoriesPage;
