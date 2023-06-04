import { HiDocument } from "react-icons/hi";
import { CourseMaterial } from "../../models/course-material.model";

type Props = {
  material: CourseMaterial;
};

const MaterialListItem = ({ material }: Props) => {
  return (
    <div className="flex items-center p-2 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-900">
      <HiDocument />
      <p className="pl-2">{material.name}</p>
    </div>
  );
};

export default MaterialListItem;
