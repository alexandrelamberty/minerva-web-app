import { Table } from "flowbite-react";
import { PageHeader } from "../../components/page-header/page-header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

const TrainingsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { trainings, loading, errors } = useSelector(
    (state: RootState) => state.trainings
  );
  return (
    <>
      <PageHeader title="All Trainings" />
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
          {trainings.map((training) => (
            <Table.Row className="table-row" key={training.id}>
              <Table.Cell className="table-cell-title">
                {training.name}
              </Table.Cell>
              <Table.Cell>{training.description}</Table.Cell>
              <Table.Cell>{training.teacher}</Table.Cell>
              <Table.Cell>{training.duration}</Table.Cell>
              <Table.Cell>
                {training.startDate} - {training.endDate}
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

export default TrainingsPage;
