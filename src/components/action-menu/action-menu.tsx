import { TextInput } from "flowbite-react";
import { ChangeEventHandler } from "react";
import { HiMail } from "react-icons/hi";

type ActionMenuProps = {
  title: string;
  icon?: JSX.Element;
  children?: JSX.Element | JSX.Element[];
};

/**
 *
 * @param param0
 * @returns
 */
export const ActionMenu = ({ icon, title, children }: ActionMenuProps) => {
  return (
    <div className="flex flex-col items-center justify-between space-y-3 md:flex-row md:space-y-0 md:space-x-4">
      <div className="flex align-bottom">
        {icon}
        <h1 className="text-blue-600 dark:text-blue-200 text-lg">{title}</h1>
      </div>
      <div className="flex flex-row space-x-2">{children}</div>
    </div>
  );
};
