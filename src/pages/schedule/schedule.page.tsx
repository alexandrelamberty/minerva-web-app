import { Button, TextInput } from "flowbite-react";
import { ActionMenu } from "../../components/action-menu/action-menu";
import { HiCalendar } from "react-icons/hi";

const SchedulePage = () => {
  const handleSearch = (terms: string) => {
    console.log(terms);
  };

  return (
    <div>
      <ActionMenu title="Viewing Schedule">
        <TextInput
          id="search"
          type="text"
          icon={HiCalendar}
          placeholder="Search calendar ..."
        />
        <Button
          onClick={() => {
            // setShowAddModal(true);
          }}
        >
          Export
        </Button>
      </ActionMenu>
    </div>
  );
};

export default SchedulePage;
