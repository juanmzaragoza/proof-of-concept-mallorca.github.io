//Action types
const ADD = "ADD_TO_ADVANCED_FILTERS";
const RESET_FILTERS = "RESET_ADVANCED_FILTERS";

//Functions

//Action creators
export function add(payload) {
  return {
    type: ADD,
    payload
  };
}

export function reset() {
  return {
    type: RESET_FILTERS
  };
}

//Reducers
const initialState = {
  filters: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      const {key, value} = action.payload;
      return { ...state, filters: {...state.filters, [key]: value} };
    case RESET_FILTERS:
      return { filters: {} };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};