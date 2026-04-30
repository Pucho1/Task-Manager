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
    <div>
      <label
        htmlFor={selectId}
        className="flex sm:inline text-sm font-medium text-gray-600 mr-2 min-w-max"
      >
        {label}
      </label>
      <select
        id={selectId}
        value={valueFilter}
        onChange={(e) => handlerFilter(e.target.value as T)}
        className="border min-w-[130px] text-black px-3 py-2 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
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
