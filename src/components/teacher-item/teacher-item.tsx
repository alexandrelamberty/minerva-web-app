import { Avatar } from "flowbite-react";
import { Teacher } from "../../models/teacher.model";

type Props = {
  teacher: Teacher;
};

const TeacherItem = ({ teacher }: Props) => {
  return (
    <div className="flex gap-x-4">
      <Avatar img={teacher?.User.avatar} />
      {teacher?.User.firstName}
    </div>
  );
};

export default TeacherItem;
