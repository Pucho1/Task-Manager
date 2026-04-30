import type { Task } from "../types/task";
import TaskCard      from "./TaskCard";

type GridTaskProps = {
  filteredTasks: Task[];
  openEdit: (task: Task) => void;
  handleAskDelete: (task: Task) => void;
};

const GridTask = ({ filteredTasks, openEdit, handleAskDelete }: GridTaskProps) => {
  return (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {filteredTasks.map((task: Task) => (
        <TaskCard
        key={task.id}
        task={task}
        openEditModal={() => openEdit(task)}
        onDelete={() => handleAskDelete(task)}
        />
    ))}
    </div>
  );
};

export default GridTask;
