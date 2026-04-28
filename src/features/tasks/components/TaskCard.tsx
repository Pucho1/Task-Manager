import type { Priority, Task, TaskStatus } from '../types/task';


const TaskCard = ({task}: {task: Task}) => { 

    const onEdit = () => true;
    const onDelete = () => true;

  const getPriorityColor = (priority: Priority): string => {
    console.log(priority);
    const colors = {
      low: 'bg-green-100 text-green-800 border-green-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      high: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors.low;
  };

  const getStatusColor = (status: TaskStatus): string => {
    const colors = {
      pending: 'bg-gray-100 text-gray-700 border-gray-200',
      'in-progress': 'bg-blue-100 text-blue-700 border-blue-200',
      completed: 'bg-green-100 text-green-700 border-green-200'
    };
    return colors[status];
  };

  const getStatusIcon = (status: TaskStatus): string => {
    const icons = {
      pending: '⏳',
      'in-progress': '🔄',
      completed: '✅'
    };
    return icons[status];
  };

  const formatDate = (date: Date): string => {
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

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-4 hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate mb-1">
            {task.title}
          </h3>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
              {task.priority.toUpperCase()}
            </span>
            <button
              // onClick={handleStatusClick}
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors duration-200 hover:opacity-80 ${getStatusColor(task.status)}`}
            >
              <span className="mr-1">{getStatusIcon(task.status)}</span>
              {task.status.replace('-', ' ').toUpperCase()}
            </button>
          </div>
        </div>
        
        {/* Actions */}
        { 
        	<div className="flex gap-1 ml-2">
            {onEdit && (
                <button
                onClick={() => onEdit()}
                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                title="Editar tarea"
                >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                </button>
            )}
            {onDelete && (
                <button
                onClick={() => onDelete()}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                title="Eliminar tarea"
                >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                </button>
            )}
        	</div>
        }
			</div>
      {/* Description */}
      {task.description && (
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-3 border-t border-gray-100">
        <div className="text-xs text-gray-500">
          <div>Creado: {formatDate(task.createdAt)}</div>
          {/* {task.updatedAt.getTime() !== task.createdAt.getTime() && (
            <div>Actualizado: {formatDate(task.updatedAt)}</div>
          )} */}
        </div>
        
        {/* Progress indicator for completed tasks */}
        {task.status === 'completed' && (
          <div className="flex items-center text-green-600 text-xs font-medium">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Completada
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
