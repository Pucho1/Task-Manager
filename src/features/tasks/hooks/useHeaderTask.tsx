import { useEffect, useRef } from "react";

import { usePositionStore } from "../context/NavbarVisibilityContext";

const useHeaderTask = () => {
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


  return { ref };
};

export default useHeaderTask;
