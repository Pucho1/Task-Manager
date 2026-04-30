import type { Priority, Task, TaskStatus } from "../types/task";
import { useTasksData } from "./useTasksData";

const useTaskCard = () => {

  const { updateTask } = useTasksData();

  const getPriorityColor = (priority: Priority): string => {
    const colors: Record<Priority, string> = {
      low: 'bg-green-100 text-green-800 border-green-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      high: 'bg-red-100 text-red-800 border-red-200'
    };

    return colors[priority];
  };

  const getStatusColor 	 = (status: TaskStatus): string => {
    const colors: Record<TaskStatus, string> = {
      pending: 'border-dotted border-gray-300',
      'in_progress': 'border-t-red-300 border-r-red-300 border-b-transparent border-l-transparent',
      done: 'border-green-500'
    };
    return colors[status];
  };

  const formatDate       = (date: Date): string => {
  const d = new Date(date);

  if (!date || isNaN(d.getTime())) {
    return "Sin fecha"; 
  }

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(d);
  };

  const onChangeStatus = async (task: Task) => {

    const nextStatus: Record<TaskStatus, TaskStatus> = {
      pending: 'in_progress',
      'in_progress': 'done',
      done: 'pending'
    };

    const newStatus = nextStatus[task.status];

    await updateTask({
      ...task,
      status: newStatus,
      updatedAt: new Date()
    });
  };

  return { getPriorityColor, getStatusColor, formatDate, onChangeStatus};
}

export default useTaskCard