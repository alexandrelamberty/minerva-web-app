import { Badge } from "flowbite-react";
import { HiVariable } from "react-icons/hi";

type Rule = {
  status: string;
  color: string;
  icon?: JSX.Element;
};

type Props = {
  status: string;
  rules: Rule[];
};

/**
 * Badge component that render the status of an enrollment.
 */
const EnrollmentStatus = ({ status }: Props) => {
  const statusIcon = <HiVariable />;
  let color;
  let icon;

  switch (status) {
    case "approved":
      color = "green";
      break;
    case "declined":
      color = "red";
      break;
  }
  return (
    <Badge color={color}>
      <div className="flex gap-x-2 justify-center mx-auto w-full">
        {icon}
        <p className="mx-auto w-full">{status.toLocaleUpperCase()}</p>
      </div>
    </Badge>
  );
};
export default EnrollmentStatus;
