import { useState } from "react";

import TaskCard from "../features/tasks/components/TaskCard";
import { useTasks } from "../features/tasks/hooks/useTask";
import type { Task } from '../features/tasks/types/task';
import TaskModal from "../features/tasks/components/TaskModal";

const TaskPage = () => {
  const [isModalOpen, setIsModalOpen]   = useState(false);
  const [mode, setMode]                 = useState<"create" | "edit">("create");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const { tasksList, isLoading, deleteTask  } = useTasks();

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

  const handleDelete = (task: Task) => {
    deleteTask(task.id);
  };

  const handleSubmit = (data: Partial<Task>) => {
    if (mode === "create") {
      console.log("Crear tarea con datos:", data);
      // Aquí iría la lógica para crear una nueva tarea usando la API
    }
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
            onDelete={() => handleDelete(task)}
          />
        )
      }

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={mode}
        task={selectedTask}
        onSubmit={handleSubmit}
      />
    </section>
  );
};

export default TaskPage;
