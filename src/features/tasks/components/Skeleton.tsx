
const Skeleton = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-10">
        { new Array(3).fill(0).map((_, i) => (
            <div role="status" aria-live="polite" key={i} className="h-32 w-full bg-gray-200 animate-pulse rounded-[40px] mb-4" />
        ))}
    </div>
  );
};

export default Skeleton;
