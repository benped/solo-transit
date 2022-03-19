import axios from 'axios';
import { put, takeLatest  } from 'redux-saga/effects';

// worker Saga: will be fired on "GET_STOPS actions
function* fetchData(action) {

  try {
    console.log('INSIDE FETCH STOPS ================');
    // Seting up const to use for my gets to build an object of user preference
    const placeCode = action.payload.placeCode
    const route = action.payload.route;
    const direction = action.payload.direction;
    console.log('Inside stops saga ', direction, route, placeCode);

    // Building Route Object
    const allRoutes = yield axios.get(`https://svc.metrotransit.org/nextripv2/routes`);
    console.log('allRoutes is', allRoutes.data);
    const routeObj = allRoutes.data.find(e => e.route_id == route);
    console.log('routeObj is', routeObj);

    // Building Direction Object
    const allDirections = yield axios.get(`https://svc.metrotransit.org/nextripv2/directions/${route}`);
    console.log('AllDirections is', allDirections.data);
    const directionObj = allDirections.data.find(e => e.direction_id == direction);
    console.log('directionObj is', directionObj);
    
    // Building Stop Object
    const allStops = yield axios.get(`https://svc.metrotransit.org/nextripv2/stops/${route}/${direction}`);
    console.log('allStops is', allStops.data);
    const stopObj = allStops.data.find(e => e.place_code = placeCode)
    console.log('stopObj is', stopObj);
    
    // Get Stop ID
    const stopInfo = yield axios.get(`https://svc.metrotransit.org/nextripv2/${route}/${direction}/${placeCode}`);
    console.log('stopId is', stopInfo);
    const stopId = stopInfo.data.stops[0].stop_id;
    console.log('StopId is', stopId);
    
    
    yield put({type: "SET_SUMMARY", payload:{
        route_id: routeObj.route_id,
        route_label: routeObj.route_label,
        direction_id: directionObj.direction_id,
        direction_name: directionObj.direction_name,
        place_code:placeCode,
        description:stopObj.description,
        stop_id:stopId,
    }})
    // const response = yield axios.get(`https://svc.metrotransit.org/nextripv2/stops/${route}/${direction}`);
    // console.log('response from server is,', response);
    


  } catch (error) {
    console.log('Stop Get request failed', error);
  }
}

function* summarySaga() {
  yield takeLatest("GET_ALL_DATA", fetchData);
}

export default summarySaga;