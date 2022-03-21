import axios from 'axios';
import { put, takeLatest  } from 'redux-saga/effects';

// worker Saga: will be fired on "GET_STOPS actions
function* fetchStops(action) {

  try {
    console.log('INSIDE FETCH STOPS ================');
    
    const route = action.payload.route;
    const direction = action.payload.direction;
    console.log('Inside stops saga ', direction, route);
    
    const response = yield axios.get(`https://svc.metrotransit.org/nextripv2/stops/${route}/${direction}`);
    console.log('response from server is,', response);
    
    // now that the session has given us a route object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_STOPS', payload: response.data });

  } catch (error) {
    console.log('Stop Get request failed', error);
  }
}

function* stopSaga() {
  yield takeLatest('GET_STOPS', fetchStops);
}

export default stopSaga;