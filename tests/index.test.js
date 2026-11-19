import { Ship, GameBoard } from "../src/index.js";

test("Ship working", () => {
  const ob = new Ship(3);
  expect(ob.sunk).toBe(false);
  expect(ob.hit()).toBe(true);
  expect(ob.isSunk()).toBe(false);
  expect(ob.hit()).toBe(true);
  expect(ob.hit()).toBe(true);
  expect(ob.hit()).toBe(false);
  expect(ob.isSunk()).toBe(true);
});

