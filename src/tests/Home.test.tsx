import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";

describe("Home test", () => {
  //render component before each test
  //   beforeEach(() => {
  //     render(Home);
  //   });

  //test 1
  test("Array should length 3", () => {
    // const {getByText} = render(<Home />);
    // expect(getByText('Bienvenido')).toBeInTheDocument();
    expect(["a", "b", "c"]).toHaveLength(3);
  });

  //test 2
  test("Fruits string has apple", () => {
    expect("Orange apple onion").toMatch("apple");
  });

  //test 3
  test("Vehicles string has motorcycle in regex", () => {
    expect("Car Motorcycle truck bike").toMatch(/motorcyc/i);
  });

  //test 4
  test("Same objects array", () => {
    expect([
      { name: "Alberto", lastName: "Ayza" },
      { name: "Pipo", lastName: "Pips" },
    ]).toMatchObject([
      { name: "Alberto", lastName: "Ayza" },
      { name: "Pipo", lastName: "Pips" },
    ]);
  });

  //test 5: throw error
  const getContraIndication = (pils) => {
    if (pils === "clonazepan")  
      throw "Clonazepan is not good to be awake"
  }

  test("throws on clonazepan", () => {
    expect(() => getContraIndication('clonazepan')).toThrowError('be');
    expect(() => getContraIndication('clonazepan')).toThrowError(/not/i);
    expect(()=> getContraIndication('clonazepan')).not.toThrowError('x');
  })

  //test 6


});
