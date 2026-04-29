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
        threshold: 0.1 // 👈 cuándo se considera visible
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <header ref={ref} className="bg-indigo-700 h-70 p-8">
			{/* 🔥 Sticky bar */}
			{/* <div className="sticky top-0 z-40 bg-indigo-700/90 backdrop-blur">
				<div className="max-w-5xl mx-auto px-4 py-2 flex justify-between">
					<span className="text-white font-medium">Task Manager</span>
				</div>
			</div> */}

			{/* Hero */}
			<div className="h-70 p-8">
				<div className="max-w-5xl mx-auto flex items-center justify-between">
					<h1 className="text-2xl font-semibold text-white">
						Task Manager
					</h1>

					<button
						onClick={onCreate}
						className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
					>
						<Plus size={20} />
						Nueva tarea
					</button>
				</div>
			</div>

			
		</header>
  );
};

export default Header;
