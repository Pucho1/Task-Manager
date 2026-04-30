import { render } from "@testing-library/react";

import Skeleton from "./Skeleton";

describe("Skeleton", () => {
  it("renders three loading placeholders", () => {
    const { container } = render(<Skeleton />);

    expect(container.querySelectorAll(".animate-pulse")).toHaveLength(3);
  });
});
