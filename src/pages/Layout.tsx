import { useState } from "react";

import Header                   from "../features/tasks/components/Header";
import StickyNavbar             from "../features/tasks/components/StickyNavbar";
import TaskModal                from "../features/tasks/components/TaskModal";
import type { Task, TaskInput } from "../features/tasks/types/task";
import TaskPage                 from "./TaskPage";
import { useTasks }             from "../features/tasks/hooks/useTask";

const Layout = () => {
  const [isModalOpen, setIsModalOpen]   = useState(false);
  const [mode, setMode]                 = useState<"create" | "edit">("create");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [toast, setToast]               = useState<string | null>(null);

  const { createTask, updateTask } = useTasks();
  
  const openCreate = () => {
    setMode("create");
    setSelectedTask(null)
    setIsModalOpen(true);
  };

  const openEdit = (task: Task) => {
    setMode("edit");
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
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

  return (
    <main className="min-h-screen bg-gray-100">
      <Header onCreate={openCreate} />

      <StickyNavbar onCreate={openCreate} />

      <section className="relative mx-auto -mt-24 bg-white rounded-t-[40px] p-8 shadow-2xl min-h-[calc(100vh-150px)]">
        <TaskPage
          openEdit={openEdit}
          showToast={showToast}
        />

        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mode={mode}
          task={selectedTask}
          onSubmit={handleSubmit}
        />

        
      {toast && (
        <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded shadow">
          {toast}
        </div>
      )}
      </section>
    </main>
  );
};

export default Layout;
