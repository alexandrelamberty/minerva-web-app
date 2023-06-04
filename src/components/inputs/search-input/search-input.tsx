import { TextInput } from "flowbite-react";
import { useId } from "react";
import { HiUser } from "react-icons/hi";

const ListItem = () => {
  return (
    <li>
      <div className="flex items-center pl-2 rounded bg-gray-100 hover:bg-gray-400 dark:hover:bg-gray-600">
        <input
          id="checkbox-item-11"
          type="checkbox"
          value=""
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
        />
        <label
          htmlFor="checkbox-item-11"
          className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
        >
          Bonnie Green
        </label>
      </div>
    </li>
  );
};

type SearchInputProps = {
  placeholder: string;
  data: any[];
};

const SearchInput = ({ placeholder, data }: SearchInputProps) => {
  const id = useId();
  return (
    <div id={id} className="flex relative">
      <TextInput
        id="email4"
        type="email"
        icon={HiUser}
        placeholder="John Doe"
        required={true}
        className="w-full"
      />
      {/* Search results */}
      <ul className="z-10 hidden absolute top-12 w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
        {data.map((data, index) => (
          <ListItem key={index} />
        ))}
      </ul>
    </div>
  );
};

export default SearchInput;
