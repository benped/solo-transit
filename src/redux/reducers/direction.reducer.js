const directionReducer = (state = {}, action) => {
    switch (action.type) {
      case 'HOLD_DIRECTIONS':
        return action.payload;
      default:
        return state;
    }
  };

export default directionReducer;