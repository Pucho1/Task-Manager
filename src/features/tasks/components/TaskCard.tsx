import { NotebookText } from "lucide-react";

import type { Task } from "../types/task";
import useTaskCard from "../hooks/useTaskCard";
import Menucard from "./Menucard";

type Props = {
  task: Task;
  openEditModal: () => void;
  onDelete: () => void;
};

const TaskCard = ({ task, openEditModal, onDelete }: Props) => {
  const { getPriorityColor, getStatusColor, onChangeStatus, getNextStatus } = useTaskCard();

  return (
    <li className="list-none h-full">
      <article
        className="flex flex-row bg-white rounded-xl h-full shadow-md border border-gray-200 mb-4 hover:shadow-lg transition-shadow duration-200"
        aria-labelledby={`task-title-${task.id}`}
      >
        <div className={`flex flex-col flex-none w-14 ${getPriorityColor(task.priority)} p-1 rounded-xl`}>
          <div>
            <span className="items-center py-0.5 text-xs text-black">
              {task.priority.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center justify-center flex-1">
            <div className={`rounded-full p-2 border-2 ${getStatusColor(task.status)}`}>
              <NotebookText aria-hidden="true" focusable="false" />
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-4 w-60">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 id={`task-title-${task.id}`} className="text-lg font-semibold text-gray-900 truncate mb-1">
                {task.title}
              </h3>
            </div>
          </div>

          {task.description && (
            <p className="text-gray-600 text-sm mb-4 leading-relaxed h-[50%] overflow-y-auto">
              {task.description}
            </p>
          )}

          <div className="flex items-end justify-end mt-4">
            <span className="text-xs text-gray-500">
              <button
                type="button"
                onClick={() => onChangeStatus(task)}
                className="text-xs px-2 py-1 rounded-full border cursor-pointer hover:opacity-80"
                aria-label={`Cambiar estado de ${task.status} a ${getNextStatus(task.status).replace("-", " ").toUpperCase()}`}
              >
                {task.status.replace("-", " ").toUpperCase()}
              </button>
            </span>
          </div>
        </div>

        <div className="w-10 relative">
          <Menucard
            onDelete={onDelete}
            onEdit={openEditModal}
            taskTitle={task.title}
          />
        </div>
      </article>
    </li>
  );
};

export default TaskCard;
