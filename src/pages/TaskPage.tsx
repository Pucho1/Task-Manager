
import TaskCard            from "../features/tasks/components/TaskCard";
import type { Task }       from '../features/tasks/types/task';
import TaskModal           from "../features/tasks/components/TaskModal";
import ConfirmDeleteModal  from "../features/tasks/components/ConfirmDeleteModal";
import Header              from "../features/tasks/components/Header";
import StickyNavbar        from "../features/tasks/components/StickyNavbar";
import useTaskPage         from "../features/tasks/hooks/useTaskPage";

const TaskPage = () => {

  const {
    isModalOpen,
    mode,
    selectedTask,
    toast,
    taskToDelete,
    openCreate,
    openEdit,
    handleAskDelete,
    handleSubmit,
    handleConfirmDelete, 
		isLoading,
		isDeleting,
    setIsModalOpen,
    setTaskToDelete,
    setSearch,
    search,
    filteredTasks,
  } = useTaskPage();
 

  return (
    <main className="min-h-screen bg-gray-100">
      
      <Header onCreate={openCreate} search={search} setSearch={setSearch} />

      <StickyNavbar onCreate={openCreate} />

      <section className="relative mx-auto -mt-24 bg-white rounded-t-[40px] p-8 shadow-2xl min-h-[calc(100vh-150px)] text-white">
        {isLoading && (
          <div className="flex flex-col items-center gap-4 py-10">
            {isLoading && new Array(3).fill(0).map((_, i) => (
              <div key={i} className="h-32 w-full bg-gray-200 animate-pulse rounded-[40px] mb-4" />
            ))}
          </div>
        )}

        {!isLoading && filteredTasks?.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">No se encontraron tareas.</p>
            <p className="text-sm text-gray-300">Intenta cambiar los filtros o crea una nueva.</p>
          </div>
        )}

        {!isLoading && filteredTasks && filteredTasks.length > 0 && (
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
        )}

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
    </main>
  );
};

export default TaskPage;
