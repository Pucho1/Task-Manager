import { Plus } from "lucide-react";
import useHeaderTask from "../hooks/useHeaderTask";
import SearchTask from "./SearchTask";

type Props = {
  onCreate: () => void;
  search: string;
  setSearch: (value: string) => void;
};

const Header = ({ onCreate, search, setSearch }: Props) => {
	const { ref } = useHeaderTask();

  return (
    <header ref={ref} className="bg-indigo-700 h-70 p-3">
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
						>
							<Plus size={20} />
							Add
						</button>
					</div>
				</nav>

			</div>

		</header>
  );
};

export default Header;
