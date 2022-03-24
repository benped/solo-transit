
const stopReducer = (state = [{description:'Stop'}], action) => {
    switch (action.type) {
      case 'SET_STOPS':
        return action.payload;
      case 'GET_DIRECTION':
        return state = [];
      default:
        return state;
    }
  };
  
  // stops will be on the redux state at:
  // state.route
  export default stopReducer;
  