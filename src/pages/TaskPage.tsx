
import TaskModal           from "../features/tasks/components/TaskModal";
import ConfirmDeleteModal  from "../features/tasks/components/ConfirmDeleteModal";
import Header              from "../features/tasks/components/Header";
import StickyNavbar        from "../features/tasks/components/StickyNavbar";
import useTaskPage         from "../features/tasks/hooks/useTaskPage";
import FilterTask          from "../features/tasks/components/FilterTask";
import Skeleton            from "../features/tasks/components/Skeleton";
import ErrorFetch          from "../features/tasks/components/ErrorFetch";
import Empty               from "../features/tasks/components/Empty";
import GridTask            from "../features/tasks/components/GridTask";

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
    setStatusFilter,
    setPriorityFilter,
    statusFilter,
    priorityFilter,
    statusOptions,
    priorityOptions,
    getTaskError,
  } = useTaskPage();
 
  if(isLoading){
    return(<Skeleton />);
  };

  if(getTaskError){
    return( <ErrorFetch /> );
  };


  return (
    <main className="min-h-screen bg-gray-100">
      
      <Header onCreate={openCreate} search={search} setSearch={setSearch} />

      <StickyNavbar onCreate={openCreate} />

      <section className="relative mx-auto -mt-24 bg-white rounded-t-[40px] p-8 shadow-2xl min-h-[calc(100vh-150px)]">
        
        <div className="flex flex-wrap gap-2 mb-4 w-full justify-between items-end">
          <FilterTask
            label="Estado"
            valueFilter={statusFilter}
            handlerFilter={(val) => setStatusFilter(val)}
            options={statusOptions}
          />
          <FilterTask
            label="Prioridad"
            valueFilter={priorityFilter}
            handlerFilter={(val) => setPriorityFilter(val)}
            options={priorityOptions}
          />

          <div className="flex items-center gap-2">
            {(statusFilter !== "all" || priorityFilter !== "all") && (
              <button 
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                  setStatusFilter("all");
                  setPriorityFilter("all");
                }}>
                Limpiar
              </button>
            )}    
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <Empty />
        ) : 
          <GridTask 
            filteredTasks={filteredTasks} 
            openEdit={openEdit} 
            handleAskDelete={handleAskDelete} 
          />
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
