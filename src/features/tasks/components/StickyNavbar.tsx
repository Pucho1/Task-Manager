import { Plus } from "lucide-react";

import { usePositionStore } from "../context/NavbarVisibilityContext";

type Props = {
  onCreate: () => void;
};

const StickyNavbar = ({ onCreate }: Props) => {
  
  const { navIsVisible } = usePositionStore();

  if (navIsVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md animate-fade-down dark:bg-gray-800">
      <div className="max-w-5xl mx-auto px-4 py-2 flex justify-between items-center">
        
        <span className="font-medium text-gray-800 text-lg dark:text-gray-200">
          Task Manager
        </span>

        <button
          onClick={onCreate}
          className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg"
          aria-label="Crear nueva tarea"
        >
          <Plus size={16} />
          Add
        </button>

      </div>
    </div>
  );
};

export default StickyNavbar;
