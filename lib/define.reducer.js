import Maybe from "data.maybe";

const defineReducer = (actionHandlers) =>
  (state, action) => 
    Maybe
      .fromNullable(actionHandlers[action.type])
      .map(handler => handler(state, action))
      .getOrElse(state);

export { defineReducer };



