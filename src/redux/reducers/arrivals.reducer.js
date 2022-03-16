const arrivalsReducer = (state = [], action) => {
  switch (action.type) {
    case "HOLD_ARRIVALS":
      return action.payload;

    default:
      return state;
  }
};

export default arrivalsReducer;

//   'HOLD_ARRIVALS', payload: {arrivals: response.data, index: action.payload.index }}
//   dispatch({ type: 'GET_SOONEST_ARRIVAL', payload:{stop_id:route.stop_id,index:i }});
