import { fireEvent, render, screen } from "@testing-library/react";

import GridTask from "./GridTask";
import type { Task } from "../types/task";

vi.mock("./TaskCard", () => ({
  default: ({
    task,
    openEditModal,
    onDelete,
  }: {
    task: Task;
    openEditModal: () => void;
    onDelete: () => void;
  }) => (
    <div>
      <span>{task.title}</span>
      <button onClick={openEditModal}>Editar {task.id}</button>
      <button onClick={onDelete}>Eliminar {task.id}</button>
    </div>
  ),
}));

const tasks: Task[] = [
  {
    id: "1",
    title: "Primera tarea",
    description: "Descripcion 1",
    priority: "high",
    status: "pending",
    createdAt: new Date("2026-04-30T09:00:00.000Z"),
    updatedAt: new Date("2026-04-30T09:00:00.000Z"),
  },
  {
    id: "2",
    title: "Segunda tarea",
    description: "Descripcion 2",
    priority: "low",
    status: "done",
    createdAt: new Date("2026-04-30T10:00:00.000Z"),
    updatedAt: new Date("2026-04-30T10:00:00.000Z"),
  },
];

describe("GridTask", () => {
  it("renders one card per filtered task", () => {
    render(
      <GridTask
        filteredTasks={tasks}
        openEdit={vi.fn()}
        handleAskDelete={vi.fn()}
      />
    );

    expect(screen.getByText("Primera tarea")).toBeInTheDocument();
    expect(screen.getByText("Segunda tarea")).toBeInTheDocument();
  });

  it("calls openEdit with the selected task", () => {
    const openEdit = vi.fn();

    render(
      <GridTask
        filteredTasks={tasks}
        openEdit={openEdit}
        handleAskDelete={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Editar 1" }));

    expect(openEdit).toHaveBeenCalledWith(tasks[0]);
  });

  it("calls handleAskDelete with the selected task", () => {
    const handleAskDelete = vi.fn();

    render(
      <GridTask
        filteredTasks={tasks}
        openEdit={vi.fn()}
        handleAskDelete={handleAskDelete}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Eliminar 2" }));

    expect(handleAskDelete).toHaveBeenCalledWith(tasks[1]);
  });
});
