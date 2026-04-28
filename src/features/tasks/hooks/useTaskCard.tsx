import type { Priority, TaskStatus } from "../types/task";

const useTaskCard = () => {

  const getPriorityColor = (priority: Priority): string => {

    const colors: Record<Priority, string> = {
      low: 'bg-green-100 text-green-800 border-green-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      high: 'bg-red-100 text-red-800 border-red-200'
    };

    return colors[priority];
  };

  const getStatusColor 	 = (status: TaskStatus): string => {
    const colors = {
      pending: 'border-dotted border-gray-300',
      'in-progress': 'border-t-indigo-500 border-r-indigo-500 border-b-transparent border-l-transparent',
      completed: 'border-green-500'
    };
    return colors[status];
  };

  const getStatusIcon 	 = (status: TaskStatus): string => {
    const icons = {
      pending: '⏳',
      'in-progress': '🔄',
      completed: '✅'
    };
    return icons[status];
  };

  const formatDate       = (date: Date): string => {
   // 1. Intentamos convertir el valor a Date
  const d = new Date(date);

  // 2. Verificamos si es una fecha "finita" y válida
  // isNaN(d.getTime()) detecta si el objeto Date es inválido
  if (!date || isNaN(d.getTime())) {
    return "Sin fecha"; // O un string vacío "" para que no se note
  }

  // 3. Ahora sí, formateamos con seguridad
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(d);
  };

//   const handleStatusClick = () => {
//     if (!onStatusChange) return;
    
//     const statusFlow: Record<TaskStatus, TaskStatus> = {
//       pending: 'in-progress',
//       'in-progress': 'completed',
//       completed: 'pending'
//     };
    
//     onStatusChange(task.id, statusFlow[task.status]);
//   };


  return { getPriorityColor, getStatusColor, getStatusIcon, formatDate};
}

export default useTaskCard