import { defineReducer } from "../lib/define.reducer";
import { expect } from "chai";
import { stub } from "sinon";

describe("reducer()", () => {
  const actionHandlers = { incrementCounter: stub().returns(1) };
  const reducer = defineReducer(actionHandlers);

  it("calls appropriate handler for action", () => {
    const state = 0;
    const action = { type: "incrementCounter" };
    expect(reducer(state, action)).eq(1);
  });

  it("returns unchanged state when no handler is found", () => {
    const state = 0;
    const action = { type: "unknown" };
    expect(reducer(state, action)).eq(0);
  });

  it("returns unchanged state when action has no type", () => {
    const state = 0;
    const action = {};
    expect(reducer(state, action)).eq(0);
  });
});

