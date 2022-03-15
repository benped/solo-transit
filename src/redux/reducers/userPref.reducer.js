const userPrefReducer = (
  state = { route: "", direction: "", stop: "" },
  action
) => {
  switch (action.type) {
    case "GET_DIRECTION":
      return { ...state, route: String(action.payload) };
// GET STOPS runs to get stops with the direction information
    case "GET_STOPS":
        return {...state, direction: String(action.payload)}
// NEED TO INSERT STOP case
    default:
      return state;
  }
};

export default userPrefReducer;
