import { useState } from "react";

import TaskCard from "../features/tasks/components/TaskCard";
import { useTasks } from "../features/tasks/hooks/useTask";
import type { Task, TaskInput } from '../features/tasks/types/task';
import TaskModal from "../features/tasks/components/TaskModal";
import ConfirmDeleteModal from "../features/tasks/components/ConfirmDeleteModal";

const TaskPage = () => {
  const [isModalOpen, setIsModalOpen]   = useState(false);
  const [mode, setMode]                 = useState<"create" | "edit">("create");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [toast, setToast]               = useState<string | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const { tasksList, isLoading, deleteTask, createTask, isDeleting, updateTask } = useTasks();

  // const openCreate = () => {
  //   setMode("create");
  //   setSelectedTask(null)
  //   setIsModalOpen(true);;
  // };

  const openEdit = (task: Task) => {
    setMode("edit");
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleAskDelete  = (task: Task) => {
    setTaskToDelete(task);
  };

  const handleSubmit = async (data: TaskInput) => {
    try {
      if (mode === "create") {
        await createTask({
          ...data,
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        setIsModalOpen(false);
        showToast("Tarea creada");
        return;
      }

      if (mode === "edit" && selectedTask) {
        await updateTask({
          ...selectedTask,
          ...data,
          updatedAt: new Date(),
        });

        setIsModalOpen(false);
        showToast("Tarea actualizada");
      }
    } catch {
      showToast("Error al guardar la tarea");
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
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
    <section className=" text-white">
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

      {toast && (
        <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded shadow">
          {toast}
        </div>
      )}

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={mode}
        task={selectedTask}
        onSubmit={handleSubmit}
      />

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
