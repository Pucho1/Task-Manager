import { NotebookText } from 'lucide-react';

import type { Task } from '../types/task';
import useTaskCard from '../hooks/useTaskCard';
import Menucard from './Menucard';

type Props = {
	task: Task;
	openEditModal: () => void;
	onDelete: () => void;
};


const TaskCard = ({task, openEditModal, onDelete}: Props) => {

	const { getPriorityColor, getStatusColor } = useTaskCard();

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
			<div className="w-10 relative">
				<Menucard 
					onDelete={onDelete}
					onEdit={openEditModal}
				/>
			</div>
    </div>
  );
};

export default TaskCard;
