import { useEffect, useState } from "react";

import type { Priority, Task, TaskInput, TaskStatus } from "../types/task";

type Props = {
	mode: "create" | "edit";
	task: Task | null;
	onSubmit: (data: TaskInput) => Promise<void> | void;
};

const useTaskForm = ({ mode, task, onSubmit }: Props) => {

	const [title, setTitle] 						= useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] 			= useState<Priority>("low");
	const [status, setStatus] 					= useState<TaskStatus>("pending");

	useEffect(() => {
		if (mode === "edit" && task) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setTitle(task.title);
			setDescription(task.description);
			setPriority(task.priority);
			setStatus(task.status);
		}
	}, [task, mode]);

		
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    await onSubmit({
      title,
      description,
      priority,
			status,
    });
  };
  
  return {title, setTitle, description, setDescription, priority, setPriority, handleSubmit, status, setStatus};
};

export default useTaskForm;
