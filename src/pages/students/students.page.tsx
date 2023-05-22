import { Button, Table, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { HiUsers } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { ActionMenu } from "../../components/action-menu/action-menu";
import { getAllStudentsAction } from "../../store/actions/students.actions";
import { AppDispatch, RootState } from "../../store/store";

const handleSearch = (terms: string) => {
  console.log(terms);
};

const StudentsPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  /**
   * Store Users
   */
  const { students, loading, errors } = useSelector(
    (state: RootState) => state.students
  );

  /**
   * Dispatch action to load students
   */
  useEffect(() => {
    dispatch(getAllStudentsAction());
  }, []);

  return (
    <>
      <ActionMenu>
        <TextInput
          id="search"
          type="text"
          icon={HiUsers}
          placeholder="Search students ..."
        />
        <div className="flex space-x-2">
          <Button
            onClick={() => {
              // setShowAddModal(true);
            }}
          >
            Create Student
          </Button>
          <Button
            onClick={() => {
              // setShowAddModal(true);
            }}
          >
            Send Message
          </Button>
        </div>
      </ActionMenu>
      <Table striped={true} hoverable={true}>
        <Table.Head>
          <Table.HeadCell>Identification</Table.HeadCell>
          <Table.HeadCell>First name</Table.HeadCell>
          <Table.HeadCell>Last name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {students.map((student) => (
            <Table.Row className="table-row" key={student.id}>
              <Table.Cell>{student.identification}</Table.Cell>
              <Table.Cell>{student.firstName}</Table.Cell>
              <Table.Cell>{student.lastName}</Table.Cell>
              <Table.Cell>{student.email}</Table.Cell>

              <Table.Cell>
                <a
                  href="/tables"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Edit
                </a>
                <a
                  href="/tables"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Edit
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default StudentsPage;
