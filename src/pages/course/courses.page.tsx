import { Table } from "flowbite-react";
import { PageHeader } from "../../components/page-header/page-header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";

const CoursesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { courses, loading, errors } = useSelector(
    (state: RootState) => state.courses
  );
  return (
    <>
      <PageHeader title="All Courses" />
      {/* Trainings Data View */}
      {/* Table | Grid */}
      <Table striped={true} hoverable={true}>
        <Table.Head>
          <Table.HeadCell>Course name</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Teacher</Table.HeadCell>
          <Table.HeadCell>Duration</Table.HeadCell>
          <Table.HeadCell>Period</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {courses.map((course) => (
            <Table.Row className="table-row" key={course.id}>
              <Table.Cell className="table-cell-title">
                {course.name}
              </Table.Cell>
              <Table.Cell>{course.description}</Table.Cell>
              <Table.Cell>{course.teacher}</Table.Cell>
              <Table.Cell>{course.duration}</Table.Cell>
              <Table.Cell>
                {course.startDate} - {course.endDate}
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

export default CoursesPage;
