import { Plus } from "lucide-react";
import { usePositionStore } from "../../../app/router/provider/context/Positioncontext";
import { useEffect, useRef } from "react";

type Props = {
  onCreate: () => void;
};

const Header = ({ onCreate }: Props) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const { setNavIsVisible } = usePositionStore();

	useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setNavIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0,
				rootMargin: "-80px 0px 0px 0px",
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <header ref={ref} className="bg-indigo-700 h-70 p-3">
			{/* Hero */}
			<div className="flex flex-col sm:flex-row items-center justify-between p-3">

				<div className="max-w-5xl">
					<h1 className="text-xl font-semibold text-white">
						Task Manager
					</h1>
				</div>

				<div className="flex justify-end w-full sm:w-auto mt-4 sm:mt-0">
					<button
						onClick={onCreate}
						className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
					>
						<Plus size={20} />
						Add
					</button>
				</div>

			</div>

		</header>
  );
};

export default Header;
