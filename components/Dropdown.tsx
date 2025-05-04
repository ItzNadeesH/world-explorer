"use client";

import React, { useState } from "react";

type DropdownProps = {
  label: string;
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
};

const ReusableDropdown: React.FC<DropdownProps> = ({ label, options, selected, onSelect }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-[200px]">
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="grid w-full h-10 cursor-pointer grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
      >
        <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
          <span className="block truncate">{selected || label}</span>
        </span>
        <svg
          className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <ul
        className={`absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm transition ease-out duration-100 transform ${
          open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {options.map((option) => (
          <li
            key={option}
            onClick={() => {
              setOpen(false);
              onSelect(option);
            }}
            className="relative cursor-pointer py-2 pr-9 pl-3 text-gray-900 hover:bg-black hover:text-white select-none"
          >
            <div className="flex items-center">
              <span className="block truncate font-normal">{option}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReusableDropdown;
