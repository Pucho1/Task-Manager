import { Dialog, DialogPanel } from "@headlessui/react";

type Props = {
  task: { id: string; title: string } | null;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading: boolean;
};

const ConfirmDeleteModal = ({ task, onCancel, onConfirm, isLoading }: Props) => {
  return (
    <Dialog open={!!task} onClose={onCancel} className="relative z-50">
      
      <div className="fixed inset-0 bg-black/30" />

      <div className="fixed inset-0 flex items-center justify-center p-2">
        <DialogPanel className="flex flex-col bg-white rounded-lg p-3 w-full max-w-sm gap-8">

          <p className="text-sm text-gray-600 mb-4">
            ¿Seguro que quieres eliminar la tarea:{" "}
            <span className="font-bold">{task?.title}</span>?
          </p>

          <div className="flex justify-between gap-4">
            <button onClick={onCancel}>
              Cancelar
            </button>

            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              {isLoading ? "Eliminando..." : "Eliminar"}
            </button>
          </div>

        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
