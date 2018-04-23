import { createStore } from "redux";

function reducer(state = { olle: 0 }, action) {
  switch (action.type) {
    case "inc": {
      return {
        ...state,
        olle: state.olle + 1
      };
    }
    case "dec": {
      return {
        ...state,
        olle: state.olle - 1
      };
    }
    default: {
      return state;
    }
  }
}

export const store = createStore(reducer);
