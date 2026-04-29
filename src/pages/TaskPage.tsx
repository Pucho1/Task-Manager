
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
        { isLoading ?
          <p>Esta cargando data</p>
        :
          filteredTasks?.map((task: Task) =>
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
    </main>
  );
};

export default TaskPage;
