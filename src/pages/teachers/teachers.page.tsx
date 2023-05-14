import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { ActionMenu } from "../../components/action-menu/action-menu";
import { Table } from "flowbite-react";

const TeachersPages = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { users, loading, errors } = useSelector(
    (state: RootState) => state.users
  );
  const onSearch = (term: string) => {
    console.log("TeacherPage OnSearch ", term);
  };
  return (
    <>
      <ActionMenu title="All Teachers" onSearch={onSearch} />
      {/* Trainings Data View */}
      {/* Table | Grid */}
      <Table striped={true} hoverable={true}>
        <Table.Head>
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
          {users.map((user) => (
            <Table.Row className="table-row" key={user.id}>
              <Table.Cell className="table-cell-title">{user.name}</Table.Cell>
              <Table.Cell>{user.description}</Table.Cell>
              <Table.Cell>{user.teacher}</Table.Cell>
              <Table.Cell>{user.duration}</Table.Cell>
              <Table.Cell>
                {user.startDate} - {user.endDate}
              </Table.Cell>
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
