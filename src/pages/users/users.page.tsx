import { Avatar, Button, Modal, Table, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { HiUsers } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ActionMenu } from "../../components/action-menu/action-menu";
import UserStatus from "../../components/enrollment-status/enrollment-status";
import InviteUserForm from "../../components/forms/invite-user-form/invite-user-form";
import { getAllUsersAction } from "../../store/actions/user.actions";
import { AppDispatch, RootState } from "../../store/store";

const UsersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  /**
   * Store Users
   */
  const { users, loading, errors } = useSelector(
    (state: RootState) => state.users
  );

  /**
   * Handle search from the ActionMenu
   * @param terms The terms to search
   */
  const handleSearch = (terms: string) => {
    console.log(terms);
  };

  /**
   * Dispatch action to load trainings
   */
  useEffect(() => {
    dispatch(getAllUsersAction());
  }, []);

  return (
    <>
      <ActionMenu title="Viewing Users">
        <TextInput
          id="search"
          type="text"
          icon={HiUsers}
          placeholder="Search users ..."
          onChange={(event) => handleSearch(event.target.value)}
        />
        <Button
          onClick={() => {
            // dispatch(showTrainingCreateModalAction(true));
          }}
        >
          Invite User
        </Button>
      </ActionMenu>
      <Table striped={true} hoverable={true}>
        <Table.Head className="rounded-none">
          <Table.HeadCell>
            <span className="sr-only">Cover</span>
          </Table.HeadCell>
          <Table.HeadCell>First name</Table.HeadCell>
          <Table.HeadCell>Last name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Creation Date</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {users.map((user) => (
            <Table.Row className="table-row" key={user.id}>
              <Table.Cell>
                <Avatar alt="User settings" img={user?.avatar} rounded={true} />
              </Table.Cell>
              <Table.Cell>{user.firstName}</Table.Cell>
              <Table.Cell>{user.lastName}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
              <Table.Cell>
                <UserStatus status="active" />
              </Table.Cell>
              <Table.Cell>{user.createdAt}</Table.Cell>
              <Table.Cell>
                <div className="flex justify-end space-x-3 sm:space-x-4">
                  <button
                    type="button"
                    className="btn-action-outline"
                    onClick={() => {
                      navigate("./" + user.id);
                    }}
                  >
                    View
                  </button>
                  <button
                    type="button"
                    className="btn-action-outline"
                    onClick={() => {
                      navigate(user.id + "/edit");
                    }}
                  >
                    Edit
                  </button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* 
        Invite user modal 
      */}
      <Modal
        size="xl"
        show={true}
        onClose={() => {
          // dispatch(showTrainingCreateModalAction(false));
        }}
      >
        <Modal.Header>Invite User</Modal.Header>
        <Modal.Body>
          <InviteUserForm /*roles={roles}*/ />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UsersPage;
