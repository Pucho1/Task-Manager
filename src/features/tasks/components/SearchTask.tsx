import { Search } from "lucide-react";

type SearchTaskProps = {
	search: string;
	setSearch: (value: string) => void;
}

const SearchTask = ({ search, setSearch }: SearchTaskProps) => {

  return (
		<div className="relative w-1/2">
			<Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 dark:text-gray-300" />

			<input
				type="text"
				placeholder="Buscar tareas..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				aria-label="Buscar tareas"
				className="pl-9 pr-3 py-2 border rounded-lg w-full bg-white text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400"
			/>

		</div>
  );
};

export default SearchTask
