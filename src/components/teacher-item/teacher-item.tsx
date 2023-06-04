import { Avatar } from "flowbite-react";
import { Teacher } from "../../models/teacher.model";

type Props = {
  teacher: Teacher | undefined;
};

const TeacherItem = ({ teacher }: Props) => {
  return (
    <div className="flex items-center gap-x-4 rounded-md cursor-pointer bg-slate-100 hover:bg-slate-200 p-2">
      <Avatar img={teacher?.user.avatar} />
      <p className="text-blue-500">
        {teacher?.user.firstName} {teacher?.user.lastName}
      </p>
    </div>
  );
};

export default TeacherItem;
