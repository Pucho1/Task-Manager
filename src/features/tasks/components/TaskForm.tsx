import { useState, useEffect } from "react";
import type { Task } from "../types/task";

type Props = {
  mode: "create" | "edit";
  task: Task | null;
  onSubmit: (data: Partial<Task>) => void;
  onCancel: () => void;
};

const TaskForm = ({ mode, task, onSubmit, onCancel }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");

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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        className="border p-2 rounded"
        required
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
        className="border p-2 rounded"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
        className="border p-2 rounded"
      >
        <option value="low">Baja</option>
        <option value="medium">Media</option>
        <option value="high">Alta</option>
      </select>

      <div className="flex justify-end gap-2 mt-4">
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
