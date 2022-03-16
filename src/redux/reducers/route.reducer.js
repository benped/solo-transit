
const routeReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ROUTES':
        return action.payload;

      default:
        return state;
    }
  };
  
  // route will be on the redux state at:
  // state.route
  export default routeReducer;
  


 