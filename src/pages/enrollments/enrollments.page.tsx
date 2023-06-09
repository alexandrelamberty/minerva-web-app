import { Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineBookOpen } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { ActionMenu } from "../../components/action-menu/action-menu";
import EnrollmentStatus from "../../components/enrollment-status/enrollment-status";
import DeleteModal from "../../components/modals/delete-model";
import {
  approveEnrollmentAction,
  declineEnrollmentAction,
  deleteEnrollmentAction,
  getAllEnrollmentsAction,
} from "../../store/actions/enrollment.actions";
import { AppDispatch, RootState } from "../../store/store";

const EnrollmentsPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  /**
   * Store Enrollments
   */
  const { enrollments, showModal, loading, errors } = useSelector(
    (state: RootState) => state.enrollments
  );

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState("");

  /**
   * Handle the "Approve" modal confirm action
   */
  const handleApproveConfirm = () => {
    setShowApproveModal(!showApproveModal);
    dispatch(approveEnrollmentAction(enrollmentId));
  };

  /**
   * Handle the "Decline" modal confirm action
   */
  const handleDeclineConfirm = () => {
    setShowDeclineModal(!showDeclineModal);
    dispatch(declineEnrollmentAction(enrollmentId));
  };

  /**
   * Handle the delete modal confirm action
   */
  const handleDeleteConfirm = () => {
    setShowDeleteModal(!showDeleteModal);
    dispatch(deleteEnrollmentAction(enrollmentId));
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
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleSearch(event.target.value)
          }
        />
      </ActionMenu>

      {/* 
        Table
      */}
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
              <Table.Cell>
                <EnrollmentStatus
                  status={enrollment?.status}
                  rules={[
                    {
                      status: "approved",
                      color: "green",
                    },
                    {
                      status: "declined",
                      color: "red",
                    },
                  ]}
                />
              </Table.Cell>
              <Table.Cell className="table-cell-title">
                {enrollment.student.identification}
              </Table.Cell>
              <Table.Cell>{enrollment.training.name}</Table.Cell>
              <Table.Cell>{enrollment.validated}</Table.Cell>
              <Table.Cell>
                <div className="flex justify-end items-center space-x-3 sm:space-x-4">
                  <button
                    type="button"
                    className="btn-action-outline"
                    onClick={() => {
                      setEnrollmentId(enrollment.id);
                      setShowApproveModal(true);
                    }}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="btn-action-outline"
                    onClick={() => {
                      setEnrollmentId(enrollment.id);
                      setShowDeclineModal(true);
                    }}
                  >
                    Decline
                  </button>
                  <button
                    type="button"
                    className="btn-action-outline"
                    onClick={() => {
                      setEnrollmentId(enrollment.id);
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
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        description="Are you sure you want to delete this enrollment?"
      />

      {/* 
        Approve Modal 
      */}
      <DeleteModal
        show={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        onConfirm={handleApproveConfirm}
        description="Are you sure you want to approve this enrollment?"
      />

      {/* 
        Decline Modal 
      */}
      <DeleteModal
        show={showDeclineModal}
        onClose={() => setShowDeclineModal(false)}
        onConfirm={handleDeclineConfirm}
        description="Are you sure you want to decline this enrollment?"
      />
    </>
  );
};

export default EnrollmentsPage;
