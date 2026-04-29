import { Plus } from "lucide-react";

import { usePositionStore } from "../../../app/router/provider/context/Positioncontext";

type Props = {
  onCreate: () => void;
};

const StickyNavbar = ({ onCreate }: Props) => {
  const { navIsVisible } = usePositionStore();

  if (navIsVisible) return null; // 👈 clave

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md animate-fade-down">
      <div className="max-w-5xl mx-auto px-4 py-2 flex justify-between items-center">
        
        <span className="font-medium text-gray-800">
          Task Manager
        </span>

        <button
          onClick={onCreate}
          className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg"
        >
          <Plus size={16} />
          Add
        </button>

      </div>
    </div>
  );
};

export default StickyNavbar;
