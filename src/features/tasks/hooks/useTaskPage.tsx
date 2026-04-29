import { useMemo, useState } from "react";

import { useTasksData } 				from "./useTasksData";
import type { Task, TaskInput } from "../types/task";

const useTaskPage = () => {

  const [isModalOpen, setIsModalOpen]   = useState(false);
  const [mode, setMode]                 = useState<"create" | "edit">("create");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [toast, setToast]               = useState<string | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [search, setSearch]             = useState("");

  const { tasksList, isLoading, deleteTask, createTask, isDeleting, updateTask } = useTasksData();

	/**
	 * Abre el modal para crear una nueva tarea. 
	 * Resetea el estado de la tarea seleccionada y establece el modo a "create".
	 */
  const openCreate = () => {
    setMode("create");
    setSelectedTask(null)
    setIsModalOpen(true);;
  };

	/**
	 * Abre el modal para editar una tarea existente.
	 * Establece la tarea seleccionada y el modo a "edit".
	 * @param task 
	 */
  const openEdit = (task: Task) => {
    setMode("edit");
    setSelectedTask(task);
    setIsModalOpen(true);
  };

	/**
	 * Abre el modal de confirmación para eliminar una tarea.
	 * Establece la tarea que se desea eliminar.
	 * @param task 
	 */
  const handleAskDelete  = (task: Task) => {
    setTaskToDelete(task);
  };

	/**
	 * Envía el formulario para crear o actualizar una tarea.
	 * @param data 
	 */
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

	/**
	 * Muestra un mensaje de toast por 3 segundos.
	 * @param msg 
	 */
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

	/**
	 * Confirma la eliminación de una tarea. Si hay una tarea seleccionada para eliminar, se llama a la función deleteTask.
	 * Si la eliminación es exitosa, se muestra un mensaje de éxito y se limpia la tarea a eliminar. Si hay un error, se muestra un mensaje de error.
	 * @returns 
	 */
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


  const filteredTasks = useMemo(() => {
    return tasksList?.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [tasksList, search]);

  return{
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
  };
};

export default useTaskPage;