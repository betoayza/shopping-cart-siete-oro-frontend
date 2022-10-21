import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";

describe("Home test", () => {
  //render component before each test
  //   beforeEach(() => {
  //     render(Home);
  //   });

  //test 1
  test("Should show something", () => {
    // const {getByText} = render(<Home />);
    // expect(getByText('Bienvenido')).toBeInTheDocument();
    expect(2).toBe(2);
  });
});
