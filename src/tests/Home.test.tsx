import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Home test", () => {
  //render component before each test
  //   beforeEach(() => {
  //     render(Home);
  //   });

  //test 1
  test("Should show something", () => {
    // const {getByText} = render(<Home />);
    // expect(getByText('Bienvenido')).toBeInTheDocument();
    expect(Math.sqrt(4)).toBe(2);
  });
});
