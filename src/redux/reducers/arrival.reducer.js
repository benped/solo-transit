const arrivalReducer = (state = {}, action) => {
  switch (action.type) {
    case "HOLD_ARRIVAL_DETAIL":
      return action.payload
    default:
      return state;
  }
};

export default arrivalReducer;
