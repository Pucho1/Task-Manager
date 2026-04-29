import { useState } from "react";

import TaskCard           from "../features/tasks/components/TaskCard";
import { useTasks }       from "../features/tasks/hooks/useTask";
import type { Task }      from '../features/tasks/types/task';
import ConfirmDeleteModal from "../features/tasks/components/ConfirmDeleteModal";

type Props = {
  openEdit: (task: Task) => void;
  showToast: (msg: string) => void;
};

const TaskPage = ({ openEdit, showToast }: Props) => {

  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const { tasksList, isLoading, deleteTask,  isDeleting } = useTasks();

  const handleAskDelete  = (task: Task) => {
    setTaskToDelete(task);
  };

  const handleConfirmDelete = () => {
    if (!taskToDelete) return;

    deleteTask(taskToDelete.id, {
      onSuccess: () => {
        setTaskToDelete(null);
        showToast("Tarea eliminada");
      },
      onError: () => {
        showToast("Error al eliminar");
      }
    });
  };

  return (
    <section className="text-white">
      { isLoading ?
        <p>Esta cargando data</p>
      :
        tasksList?.map((task: Task) =>
          <TaskCard
            key={task.id}
            task={task}
            openEditModal={() => openEdit(task)}
            onDelete={() => handleAskDelete(task)}
          />
        )
      }

      <ConfirmDeleteModal
        task={taskToDelete}
        onCancel={() => setTaskToDelete(null)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />
    </section>
  );
};

export default TaskPage;
