const userRoutesReducer = (
    state = [],
    action
  ) => {
    switch (action.type) {
      case "SET_USER_ROUTES":
          console.log('setting user routes in userRoutesReducer');
        return action.payload;
      default:
        return state;
    }
  };
  
  export default userRoutesReducer;  