import { Button, TextInput } from "flowbite-react";
import { ActionMenu } from "../../components/action-menu/action-menu";
import { HiUser } from "react-icons/hi";

const handleSearch = (terms: string) => {
  console.log(terms);
};

const StudentsPage = () => {
  return (
    <div>
      <ActionMenu title="All Courses" onSearch={handleSearch}>
        <TextInput
          id="search"
          type="text"
          icon={HiUser}
          placeholder="Search students ..."
        />
        <Button
          onClick={() => {
            // setShowAddModal(true);
          }}
        >
          Send Message
        </Button>
      </ActionMenu>
    </div>
  );
};

export default StudentsPage;
