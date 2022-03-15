const directionReducer = (state = {}, action) => {
    switch (action.type) {
      case 'HOLD_DIRECTIONS':
        return action.payload;
      case 'SET_ROUTE':
        return state = {};
      default:
        return state;
    }
  };

export default directionReducer;