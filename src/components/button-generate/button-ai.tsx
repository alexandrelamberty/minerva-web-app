import { Spinner, Tooltip } from "flowbite-react";
import { HiPencilAlt } from "react-icons/hi";

type Props = {
  label?: string;
  tooltip?: string;
  loading: boolean;
  onClick: () => void;
};

const ButtonAI = ({ label, tooltip, loading, onClick }: Props) => {
  return (
    <Tooltip content={tooltip ? tooltip : "Generate"}>
      <button type="button" className="btn-ai" onClick={onClick}>
        {loading ? <Spinner /> : <HiPencilAlt className="h-6 w-6" />}
      </button>
    </Tooltip>
  );
};

export default ButtonAI;
