import { EllipsisVertical, NotebookText } from 'lucide-react';

import type { Task } from '../types/task';
import useTaskCard from '../hooks/useTaskCard';


const TaskCard = ({task, onEdit, onDelete}: {task: Task, onEdit: () => void, onDelete: () => void}) => {

	const { getPriorityColor, getStatusColor, getStatusIcon } = useTaskCard();

  return (
    <div className="flex flex-row bg-white rounded-xl shadow-md border border-gray-200 mb-4 hover:shadow-lg transition-shadow duration-200">

			{/* Priority - Icon */}
			<div className={`flex flex-col flex-none w-14 ${getPriorityColor(task.priority)} p-1 rounded-xl`}>

				<div>
					<span className="items-center py-0.5 text-xs text-black">
						{task.priority.toUpperCase()}
					</span>
				</div>

				<div className="flex items-center justify-center flex-1">
					<div className={`rounded-full p-2 border-2 ${		getStatusColor(task.status)}`}>
						<NotebookText />
					</div>
				</div>
			</div>

      {/* Info */}
			<div className="flex flex-col flex-1 p-4 w-60">
				{/* Title */}
				<div className="flex items-start justify-between mb-3">
					<div className="flex-1 min-w-0">
						<h3 className="text-lg font-semibold text-gray-900 truncate mb-1">
							{task.title}
						</h3>
					</div>
				</div>

				{/* Description */}
				{task.description && (
					<p className="text-gray-600 text-sm mb-4 leading-relaxed">
						{task.description}
					</p>
				)}
			</div>
     
		 {/* Actions */}
		 <div className="w-10">
			 <button className='flex flex-col items-center justify-center p-2 h-full w-full text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200' >
				<EllipsisVertical />
				{/* color='#0000ff' */}
			 </button>
		 </div>
    </div>
  );
};

export default TaskCard;



	{/* Footer */}
	{/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-3 border-t border-gray-100">
		<div className="text-xs text-gray-500">
			<div>Creado: {formatDate(task.createdAt)}</div>
			{ {task.updatedAt.getTime() !== task.createdAt.getTime() && (
				<div>Actualizado: {formatDate(task.updatedAt)}</div>
			)} }
		</div>
		
		{Progress indicator for completed tasks }
		{task.status === 'completed' && (
			<div className="flex items-center text-green-600 text-xs font-medium">
				<svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
					<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
				</svg>
				Completada
			</div>
		)}
	</div> */}

	{/* <div className="flex flex-wrap gap-2 mb-2">
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
	</div> */}


	{/* Actions
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
		} */}