import { Badge } from "flowbite-react";
import { HiVariable } from "react-icons/hi";

type Props = {
  status: string;
};

/**
 * Badge component that render the status of a user.
 */
const UserStatus = ({ status }: Props) => {
  const statusIcon = <HiVariable />;
  return (
    <Badge color="gray">
      <div className="flex gap-x-2">
        {statusIcon}
        <p>{status}</p>
      </div>
    </Badge>
  );
};
export default UserStatus;
