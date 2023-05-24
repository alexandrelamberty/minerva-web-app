import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { HiCheck } from "react-icons/hi";
import { Teacher } from "../../../models/teacher.model";

type TeacherComboboxProps = {
  placeholder: string;
  selected: Teacher | null;
  onSearchChange: (terms: string) => void;
  onChange: (user: Teacher) => void;
  data: Teacher[] | null;
};

export default function TeacherCombobox({
  placeholder,
  onSearchChange,
  selected,
  onChange,
  data,
}: TeacherComboboxProps) {
  console.log("Teacher Combobox selected valued: ", selected);
  console.log("Teacher Combobox data: ", data);
  const [query, setQuery] = useState("");
  return (
    <Combobox
      value={selected}
      onChange={(teacher) => {
        selected = teacher;
        onChange(teacher!);
      }}
    >
      {({ open }) => (
        <>
          <div className="relative">
            <div className="relative w-full cursor-default">
              <Combobox.Input
                className="form-input"
                displayValue={(teacher: Teacher): string => {
                  if (teacher !== null)
                    return (
                      teacher?.user?.firstName + " " + teacher?.user?.lastName
                    );
                  return "";
                }}
                onChange={(event) => {
                  const value = event.target.value;
                  setQuery(value);
                  onSearchChange(value);
                }}
                placeholder={placeholder}
              />
            </div>
            {/*  */}
            <Transition
              as="div"
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {data && (
                <Combobox.Options className="absolute mt-2 max-h-60 w-full overflow-auto shadow rounded-md bg-white dark:bg-slate-800 py-1 text-base focus:outline-none sm:text-sm">
                  {data && data.length === 0 && query.length > 1 && (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  )}

                  {data &&
                    data.length > 0 &&
                    // loop through results
                    data?.map((teacher) => (
                      <Combobox.Option
                        key={teacher.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "bg-slate-600 text-white" : "text-gray-900"
                          }`
                        }
                        value={teacher}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {teacher.user.firstName} {teacher.user.lastName}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-teal-600"
                                }`}
                              >
                                <HiCheck
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                </Combobox.Options>
              )}
            </Transition>
          </div>
        </>
      )}
    </Combobox>
  );
}
