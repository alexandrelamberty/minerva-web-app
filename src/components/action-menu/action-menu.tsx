import { TextInput } from "flowbite-react";
import { ChangeEventHandler } from "react";
import { HiMail } from "react-icons/hi";

type ActionMenuProps = {
  children?: JSX.Element | JSX.Element[];
};

export const ActionMenu = ({ children }: ActionMenuProps) => {
  return (
    <div className="flex flex-col items-center justify-between space-y-3 md:flex-row md:space-y-0 md:space-x-4">
      {children}
    </div>
  );
};
