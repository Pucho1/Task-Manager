import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

import type { Task, TaskInput } from '../types/task';
import TaskForm from './TaskForm';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  task: Task | null;
  onSubmit: (data: TaskInput) => Promise<void> | void;
};

export default function TaskModal(	{ isOpen,	onClose, mode, task, onSubmit }: 	Props){

  return (
		<Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-lg p-6 w-full max-w-md">
          <DialogTitle className="text-lg font-semibold mb-4 text-black">
            <p className="text-black">{mode === "create" ? "Nueva tarea" : "Editar tarea"}</p>
          </DialogTitle>

        <TaskForm
          mode={mode}
          task={task}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
        
        </DialogPanel>
      </div>
    </Dialog>
  );
};

