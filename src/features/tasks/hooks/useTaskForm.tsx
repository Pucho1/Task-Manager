import { useEffect, useState } from "react";

import type { Task } from "../types/task";

type Props = {
	mode: "create" | "edit";
	task: Task | null;
	onSubmit: (data: Partial<Task>) => void;
};

const useTaskForm = ({ mode, task, onSubmit }: Props) => {

	const [title, setTitle] 						= useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] 			= useState<"low" | "medium" | "high">("low");

	useEffect(() => {
		if (mode === "edit" && task) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setTitle(task.title);
			setDescription(task.description);
			setPriority(task.priority);
		}
	}, [task, mode]);

		
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({
      title,
      description,
      priority,
      status: task?.status || "pending",
      updatedAt: new Date(),
      createdAt: task?.createdAt || new Date(),
    });
  };
  
  return {title, setTitle, description, setDescription, priority, setPriority, handleSubmit};
};

export default useTaskForm;
