import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { HiCheck } from "react-icons/hi";
import { User } from "../../../models/user.model";
import { Teacher } from "../../../models/teacher.model";

type UserComboboxProps = {
  placeholder: string;
  selected: User | null;
  onSearchChange: (terms: string) => void;
  onChange: (user: User) => void;
  data: User[] | null;
};

export default function UserCombobox({
  placeholder,
  onSearchChange,
  selected,
  onChange,
  data,
}: UserComboboxProps) {
  console.log("User Combobox selected valued: ", selected);
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
                displayValue={(teacher: User): string => {
                  if (teacher !== null)
                    return teacher?.firstName + " " + teacher?.lastName;
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
              as={Fragment}
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {data && (
                <Combobox.Options className="absolute mt-2 max-h-60 w-full overflow-auto shadow rounded-md bg-white dark:bg-slate-800 py-1 text-base focus:outline-none sm:text-sm">
                  {data && data.length === 0 && query.length > 1 ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
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
                              {teacher.firstName} {teacher.lastName}
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
                    ))
                  )}
                </Combobox.Options>
              )}
            </Transition>
          </div>
        </>
      )}
    </Combobox>
  );
}
