# Redux Definer 🐈 

[![build status](https://travis-ci.org/vvgomes/redux-definer.svg?branch=master)](https://travis-ci.org/vvgomes/redux-definer)
[![npm version](https://img.shields.io/npm/v/redux-definer.svg)](https://www.npmjs.com/package/redux-definer)

Redux Definer is a tiny but useful library that helps you to build reducers in a clean way. The idea is inspired by this [blog post](http://vvgomes.com/better-reducers/).

## Getting Started

Make sure you have a recent [Node](https://nodejs.org/en/) version (6.0.0 should work). Then, install the package.

```
$ npm install redux-definer --save
```

Now, define some action handlers, a reducer, and a Redux store.

```javascript
import { defineReducer } from "redux-definer";
import { createStore } from "redux";

const INCREMENT_COUNTER = (state, action) => state + 1;
const DECREMENT_COUNTER = (state, action) => state - 1;

const reducer = defineReducer({ INCREMENT_COUNTER, DECREMENT_COUNTER });
const store = createStore(reducer, 0);
console.log(store.getState()); // => 0

store.dispatch({ type: "INCREMENT_COUNTER" });
store.dispatch({ type: "INCREMENT_COUNTER" });
store.dispatch({ type: "DECREMENT_COUNTER" });
store.dispatch({ type: "INCREMENT_COUNTER" });
console.log(store.getState()); // => 2

store.dispatch({ type: "INVALID" });
console.log(store.getState()); // => 2

```

## Background

Redux reducers must conform to the following signature:

```
reducer :: (State, Action) -> State
```

There are tough no restrictions or standars in the way you can implement its behavior. Most examples in the internet - including the examples in the Redux [official docs](http://redux.js.org/docs/basics/Reducers.html) - will suggest you to define your reducers using a `switch` statement based on action types. 

```javascript
function reducer (state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat({
        text: action.text,
        completed: false
      });
    case "TOGGLE_TODO":
      return state.map((todo, index) =>
        index === action.index ?
          Object.assign({}, todo, { completed: !todo.completed }): todo
      );
    default:
      return state;
  }
}
```

The code in the snipet above is quite busy. The action handling logic is blended together with the reducer pattern matching logic, which makes it not very scalable or easily testable.

### `defineReducer`

As you can see in *Getting Started* example, the `defineReducer` function isolates the reducer pattern matching logic and gives you the ability to define a reducer by just providing a map of action handlers. Each handler in this case is an idependent function which can be tested in isolation. 

In summary, the underlying algorithm behind `defineReducer` can be described as:

- It chooses a behavior by pattern-matching the `action.type`.
- Then, it executes the matching behavior returning a new state.
- In case there is no match, it returns the unchanged state.

To get more details on the way it was implemented, take a look at the [blog post](http://vvgomes.com/better-reducers/). To see Redux Definer in action, take a look at the [Redux Todo](https://github.com/vvgomes/redux-todo/) example.

## License

Feel free to use this code as you please.
