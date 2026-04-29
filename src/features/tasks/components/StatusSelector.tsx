import { CircleDashed , Circle , LoaderCircle  } from "lucide-react";
import type { TaskStatus } from "../types/task";

const statusOptions: { value: TaskStatus; label: string; icon: React.ComponentType }[] = [
  { value: "pending", label: "Pendiente", icon: CircleDashed  },
  { value: "in_progress", label: "En progreso", icon: LoaderCircle  },
  { value: "done", label: "Completada", icon: Circle  },
];

type Props = {
  value: TaskStatus;
  onChange: (value: TaskStatus) => void;
};

const StatusSelector = ({ value, onChange }: Props) => {
  return (
    <div className="flex gap-2">

      {statusOptions.map((option) => {
        const Icon = option.icon;
        const isSelected = value === option.value;

        return (
          <label
            key={option.value}
            className={`flex flex-col sm:flex-row w-1/3 items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition
              ${isSelected ? "bg-blue-50 border-blue-500 text-blue-600" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}
            `}
          >
            <input
              type="radio"
              name="status"
              value={option.value}
              checked={isSelected}
              onChange={() => onChange(option.value)}
              className="hidden"
            />

            <Icon  />
            <span className="text-xs">{option.label}</span>
          </label>
        );
      })}
    </div>
  );
};

export default StatusSelector;
