const userPrefReducer = (
  state = { route: "", direction: "", stop: "" },
  action
) => {
  switch (action.type) {
    case "SET_ROUTE":
      return { ...state, route: String(action.payload) };
// GET STOPS runs to get stops with the direction information
    case "GET_STOPS":
        return {...state, direction: String(action.payload)}
    default:
      return state;
  }
};

export default userPrefReducer;
