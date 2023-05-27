import { Avatar, Button, Table, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { HiUsers } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { ActionMenu } from "../../components/action-menu/action-menu";
import { getAllUsersAction } from "../../store/actions/user.actions";
import { AppDispatch, RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

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
          className="w-full md:w-2/6"
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
      <Table striped={true} hoverable={true} className="rounded-none">
        <Table.Head className="rounded-none">
          <Table.HeadCell>
            <span className="sr-only">Cover</span>
          </Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>First name</Table.HeadCell>
          <Table.HeadCell>Last name</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
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
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.firstName}</Table.Cell>
              <Table.Cell>{user.lastName}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
              <Table.Cell>{user.createdAt}</Table.Cell>
              <Table.Cell>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <button
                    className="btn-action-outline"
                    onClick={() => {
                      navigate("./" + user.id);
                    }}
                  >
                    View
                  </button>
                  <button
                    type="button"
                    className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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
    </>
  );
};

export default UsersPage;
