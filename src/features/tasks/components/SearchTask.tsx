import { Search } from "lucide-react";

type SearchTaskProps = {
	search: string;
	setSearch: (value: string) => void;
}

const SearchTask = ({ search, setSearch }: SearchTaskProps) => {

  return (
		<div className="relative w-1/2">
			<Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />

			<input
				type="text"
				placeholder="Buscar tareas..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className="pl-9 pr-3 py-2 border rounded-lg w-full"
			/>

		</div>
  );
};

export default SearchTask