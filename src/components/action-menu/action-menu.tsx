import { TextInput } from "flowbite-react";
import { ChangeEventHandler } from "react";
import { HiMail } from "react-icons/hi";

type ActionMenuProps = {
  title: string;
  onSearch: (term: string) => void;
  children?: JSX.Element | JSX.Element[];
};

export const ActionMenu = ({ title, children, onSearch }: ActionMenuProps) => {
  const handleSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onSearch(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
      {/* Search */}

      {children}
    </div>
  );
};
