import { Course } from "../../models/course.model";

type Props = {
  course: Course;
  onClick: () => void;
};
const CourseListItem = ({ course, onClick }: Props) => {
  return (
    <li className="list-item cursor-pointer" onClick={() => onClick}>
      <div className="flex gap-x-6 pl-2 py-2">
        <img
          className="h-12 w-12 flex-none rounded-full bg-gray-50"
          // src={"http://localhost:3000/" + course.cover}
          alt=""
        />
        <div className="min-w-0 ">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {course.name}
          </p>
          <p className="mt-1 truncate text-sm leading-5 text-gray-700">
            {course.description}
          </p>
        </div>
      </div>
    </li>
  );
};
export default CourseListItem;
