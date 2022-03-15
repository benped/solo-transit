const userPrefReducer = (
  state = { route: "", direction: "", stop: "", time:"" },
  action
) => {
  switch (action.type) {
    case "GET_DIRECTION":
      return { ...state, route: String(action.payload) };
    // GET STOPS runs to get stops with the direction information
    // The payload is the direction here.
    case "GET_STOPS":
      return {
        ...state,
        direction: action.payload.direction,
        route: String(action.payload.route),
      };
    // NEED TO INSERT STOP case
    case "SET_STOP_PREF":
      return { ...state, stop: action.payload };
    case "SET_NOFITY_TIME":
    default:
      return state;
  }
};

export default userPrefReducer;
