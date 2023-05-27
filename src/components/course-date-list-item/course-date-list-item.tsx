import { CourseDate } from "../../models/course-date.model";

type Props = {
  courseDate: CourseDate;
};

const CourseDateListItem = ({ courseDate }: Props) => {
  return (
    <>
      <li key={courseDate.id} className="flex gap-x-6 py-5">
        <div className="flex gap-x-4">
          <div className="min-w-0 ">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {courseDate.date}
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              {courseDate.teacher?.User.firstName}
            </p>
          </div>
        </div>
      </li>
    </>
  );
};
export default CourseDateListItem;
