import { Button, Table, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { HiUsers } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ActionMenu } from "../../components/action-menu/action-menu";
import { getAllTeachersAction } from "../../store/actions/teacher.actions";
import { AppDispatch, RootState } from "../../store/store";
import UserStatus from "../../components/user-status/user-status";

const TeachersPages = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  /**
   * Store Trainings
   */
  const { teachers, loading, errors } = useSelector(
    (state: RootState) => state.teachers
  );

  const onSearch = (term: string) => {
    console.log("TeacherPage OnSearch ", term);
  };

  /**
   * Dispatch action to load teachers
   */
  useEffect(() => {
    dispatch(getAllTeachersAction());
  }, []);

  return (
    <>
      <ActionMenu title="Viewing Teachers">
        <TextInput
          id="search"
          type="text"
          icon={HiUsers}
          placeholder="Search teachers ..."
        />
      </ActionMenu>
      {/* Trainings Data View */}
      {/* Table | Grid */}
      <Table striped={true} hoverable={true}>
        <Table.Head>
          <Table.HeadCell>Company</Table.HeadCell>
          <Table.HeadCell>First Name</Table.HeadCell>
          <Table.HeadCell>Last Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {teachers.map((teacher) => (
            <Table.Row className="table-row" key={teacher.id}>
              <Table.Cell className="table-cell-title">
                {teacher.company}
              </Table.Cell>
              <Table.Cell>{teacher.user?.firstName}</Table.Cell>
              <Table.Cell>{teacher.user?.lastName}</Table.Cell>
              <Table.Cell>{teacher.user?.email}</Table.Cell>
              <Table.Cell>
                <UserStatus status="active" />
              </Table.Cell>
              <Table.Cell>
                <div className="flex justify-end space-x-3 sm:space-x-4">
                  <button
                    type="button"
                    className="btn-action-outline"
                    onClick={() => {
                      navigate("./" + teacher.id);
                    }}
                  >
                    View
                  </button>
                  <button
                    type="button"
                    className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    onClick={() => {
                      navigate(teacher.id + "/edit");
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

export default TeachersPages;
