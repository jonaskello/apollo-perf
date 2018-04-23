export function reducer(state = { olle: 0, entities: {} }, action) {
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
    case "merge-entities": {
      return {
        ...state,
        entities: { ...state.entities, ...action.payload.entities }
      };
    }
    default: {
      return state;
    }
  }
}
