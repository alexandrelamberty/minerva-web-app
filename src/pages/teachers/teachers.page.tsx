import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { ActionMenu } from "../../components/action-menu/action-menu";
import { Button, Table, TextInput } from "flowbite-react";
import { HiUsers } from "react-icons/hi";
import { useEffect } from "react";
import { getAllTeachersAction } from "../../store/actions/teacher.actions";

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
      <ActionMenu>
        <TextInput
          id="search"
          type="text"
          icon={HiUsers}
          placeholder="Search teachers ..."
        />
        <Button
          onClick={() => {
            // dispatch(showTrainingCreateModalAction(true));
          }}
        >
          Add Training
        </Button>
      </ActionMenu>
      {/* Trainings Data View */}
      {/* Table | Grid */}
      <Table striped={true} hoverable={true}>
        <Table.Head>
          <Table.HeadCell>Company</Table.HeadCell>
          <Table.HeadCell>First Name</Table.HeadCell>
          <Table.HeadCell>Last Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
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

export default TeachersPages;
