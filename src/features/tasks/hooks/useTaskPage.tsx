import { useEffect, useMemo, useState } from "react";

import { useTasksData } 				                      from "./useTasksData";
import type { Priority, Task, TaskInput, TaskStatus } from "../types/task";

const useTaskPage = () => {

  const [isModalOpen, setIsModalOpen]       = useState(false);
  const [mode, setMode]                     = useState<"create" | "edit">("create");
  const [selectedTask, setSelectedTask]     = useState<Task | null>(null);
  const [toast, setToast]                   = useState<string | null>(null);
  const [taskToDelete, setTaskToDelete]     = useState<Task | null>(null);
  const [search, setSearch]                 = useState("");
  const [statusFilter, setStatusFilter]     = useState<"all" | TaskStatus>("all");
  const [priorityFilter, setPriorityFilter] = useState<"all" | Priority>("all");
  const [theme, setTheme]                   = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const { 
    tasksList,
    getTaskError,
    isLoading, 
    deleteTask, 
    createTask, 
    isDeleting, 
    updateTask,
  } = useTasksData();

  const statusOptions = [
    { value: 'all',         label: 'Todos' },
    { value: 'pending',     label: 'Pendiente' },
    { value: 'in_progress', label: 'En progreso' },
    { value: 'done',        label: 'Completada' },
  ];

  const priorityOptions = [
    { value: 'all',    label: 'Todas' },
    { value: 'low',    label: 'Baja' },
    { value: 'medium', label: 'Media' },
    { value: 'high',   label: 'Alta' },
  ];

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
  const handleSubmit = (data: TaskInput) => {
    if (mode === "create") {
      createTask({
        ...data,
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        onSuccess: () => {
          setIsModalOpen(false);
          showToast("Tarea creada");
        },
        onError: () => {
          showToast("Error al crear la tarea");
        }
      });
      return;
    }

    if (mode === "edit" && selectedTask) {
      updateTask(
        {
          ...selectedTask,
          ...data,
          updatedAt: new Date(),
        },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            showToast("Tarea actualizada");
          },
          onError: () => {
            showToast("Error al actualizar la tarea");
          }
        }
      );
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
    if (!tasksList) return [];

    return tasksList
    .filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((task) =>
      statusFilter === "all" ? true : task.status === statusFilter
    )
    .filter((task) =>
      priorityFilter === "all" ? true : task.priority === priorityFilter
    );
  }, [tasksList, search, statusFilter, priorityFilter]);

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
    statusFilter,
    priorityFilter,
    setStatusFilter,
    setPriorityFilter,
    statusOptions,
    priorityOptions,
    getTaskError,
    theme,
    setTheme,
  };
};

export default useTaskPage;