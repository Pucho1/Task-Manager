import { Plus } from "lucide-react";
import useHeaderTask from "../hooks/useHeaderTask";
import SearchTask from "./SearchTask";

type Props = {
  onCreate: () => void;
  search: string;
  setSearch: (value: string) => void;
  theme: string;
  toggleTheme: () => void;
};

const Header = ({ onCreate, search, setSearch, theme, toggleTheme }: Props) => {
	const { ref } = useHeaderTask();

  return (
    <header ref={ref} className="bg-indigo-700 h-70 p-3 dark:bg-gray-900">
			{/* Hero */}
			<div className="flex flex-col sm:flex-row items-center justify-between p-3">

				<div className="max-w-5xl">
					<h1 className="text-xl font-semibold text-white">
						Task Manager
					</h1>
				</div>

				<nav className="flex max-w-md justtify-between items-center gap-4 sm:gap-0">
					<SearchTask search={search} setSearch={setSearch} />

					<div className="flex justify-end w-1/2">
						<button
							onClick={onCreate}
							className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
							aria-label="Crear nueva tarea"
						>
							<Plus size={20} />
							Add
						</button>

						<button
							onClick={toggleTheme}
							aria-label="Cambiar tema"
							className="text-white text-xl"
							>
							{theme === "dark" ? "☀️" : "🌙"}
						</button>
					</div>
				</nav>

			</div>

		</header>
  );
};

export default Header;
