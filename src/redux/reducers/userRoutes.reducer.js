const userRoutesReducer = (
    state = [],
    action
  ) => {
    switch (action.type) {
      case "SET_USER_ROUTES":
        return action.payload;
      default:
        return state;
    }
  };
  
  export default userRoutesReducer;  