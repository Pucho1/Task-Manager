import { useId } from "react";

import type { FilterOption } from "../types/task";

type GenericFilterProps<T> = {
  label: string;
  valueFilter: T;
  handlerFilter: (value: T) => void;
  options: FilterOption[];
};

const FilterTask = <T extends string>({
  valueFilter,
  handlerFilter,
  options,
  label,
}: GenericFilterProps<T>) => {
  const selectId = useId();

  return (
    <div className="flex flex-col w-1/3 mr-2 justify-start">
      <label
        htmlFor={selectId}
        className="text-sm font-medium text-gray-600 mr-2 min-w-max dark:text-gray-300 text-left"
      >
        {label}
      </label>
      <select
        id={selectId}
        value={valueFilter}
        onChange={(e) => handlerFilter(e.target.value as T)}
        className="border min-w-[115px] max-w-[150px] text-black px-3 py-2 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterTask;
