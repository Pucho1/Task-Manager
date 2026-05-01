import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVertical } from "lucide-react";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
  taskTitle: string;
};

const Menucard = ({ onEdit, onDelete, taskTitle }: Props) => {
  return (
    <Menu>
      <div className="relative h-full">
        <MenuButton
          type="button"
          className="h-full w-full flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200 dark:hover:text-blue-400 dark:hover:bg-gray-700"
          aria-label={`Menu de opciones para ${taskTitle}`}
        >
          <EllipsisVertical aria-hidden="true" focusable="false" />
        </MenuButton>

        <MenuItems
          transition
          className="absolute w-15 -ml-5 origin-top-right top-0 rounded-xl p-1 text-sm/6 text-black transition duration-100 ease-out focus:outline-none data-closed:scale-95 data-closed:opacity-0 dark:text-gray-200"
        >
          <div className="flex flex-row gap-1">
            <MenuItem>
              <button
                type="button"
                onClick={onEdit}
                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200 dark:hover:text-blue-400 dark:hover:bg-gray-700"
                aria-label={`Editar tarea ${taskTitle}`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
            </MenuItem>

            <MenuItem>
              <button
                type="button"
                onClick={onDelete}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200 dark:hover:text-red-400 dark:hover:bg-gray-700"
                aria-label={`Eliminar tarea ${taskTitle}`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </div>
    </Menu>
  );
};

export default Menucard;
