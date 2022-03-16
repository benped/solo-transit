import axios from 'axios';
import { put, takeLatest, select } from 'redux-saga/effects';

import {useSelector} from 'react-redux';
import userPrefReducer from '../reducers/userPref.reducer';

// worker Saga: will be fired on "FETCH_DIRECTIONS" actions
function* fetchArrivals(action) {
  

  
  try {
    console.log('inside fetchArrivals', action.payload);
    
    // Pings METRO transit API for directions for given route stored in userPrefReducer
    const response = yield axios.get(`https://svc.metrotransit.org/nextripv2/${action.payload.stop_id}`);
    console.log('response is', response);
    
    yield put({ type: 'HOLD_ARRIVALS', payload: {arrivals: response.data, index: action.payload.index }});

  } catch (error) {
    console.log('Route arrivals get request failed', error);
  }
}

function* arrivalSaga() {
  yield takeLatest('GET_DIRECTION', fetchArrivals);
}

export default arrivalSaga;