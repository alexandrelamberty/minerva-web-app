import { Training } from "../../models/training.model";

type Props = {
  training: Training;
};

const TrainingListItem = ({ training }: Props) => {
  return (
    <>
      <li
        key={training.id}
        className="p-2 gap-y-2 rounded-md bg-slate-400 hover:bg-slate-700"
      >
        <div className="flex gap-x-4">
          <img
            className="h-12 w-12 flex-none rounded-full bg-gray-50"
            src={"http://localhost:3000/" + training.cover}
            alt=""
          />
          <div>
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {training.name}
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              {training.description}
            </p>
          </div>
        </div>
      </li>
    </>
  );
};
export default TrainingListItem;
