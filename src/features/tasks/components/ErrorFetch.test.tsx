import { render, screen } from "@testing-library/react";

import ErrorFetch from "./ErrorFetch";

describe("ErrorFetch", () => {
  it("renders the error message for failed task loading", () => {
    render(<ErrorFetch />);

    expect(screen.getByText("Error al cargar tareas")).toBeInTheDocument();
    expect(screen.getByText(/Intenta recargar la p.gina/i)).toBeInTheDocument();
  });
});
