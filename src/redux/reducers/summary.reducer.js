const summaryReducer = (
    state = { },
    action
  ) => {
    switch (action.type) {
      case "SET_SUMMARY":
        return action.payload;
      default:
        return state;
    }
  };
  
  export default summaryReducer;