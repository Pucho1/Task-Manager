import type { Task } from "../types/task";
import TaskCard from "./TaskCard";

type GridTaskProps = {
  filteredTasks: Task[];
  openEdit: (task: Task) => void;
  handleAskDelete: (task: Task) => void;
};

const GridTask = ({
  filteredTasks,
  openEdit,
  handleAskDelete,
}: GridTaskProps) => {
  return (
    <ul
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      aria-label="Lista de tareas"
    >
      {filteredTasks.map((task: Task) => (
        <TaskCard
          key={task.id}
          task={task}
          openEditModal={() => openEdit(task)}
          onDelete={() => handleAskDelete(task)}
        />
      ))}
    </ul>
  );
};

export default GridTask;
