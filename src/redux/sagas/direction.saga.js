import axios from 'axios';
import { put, takeLatest, select } from 'redux-saga/effects';

import {useSelector} from 'react-redux';
import userPrefReducer from '../reducers/userPref.reducer';

// worker Saga: will be fired on "FETCH_DIRECTIONS" actions
function* fetchDirections(action) {
  
  // const routes = yield select(userPrefReducer);
  // console.log('Route is', route );
  // console.log('Routes is', routes);
  
  
  try {
    console.log('action.payload is', action.payload);
    
    // Pings METRO transit API for directions for given route stored in userPrefReducer
    const response = yield axios.get(`https://svc.metrotransit.org/nextripv2/directions/${action.payload}`);
    console.log('response is', response);
    
    yield put({ type: 'HOLD_DIRECTIONS', payload: response.data });

  } catch (error) {
    console.log('Route direction get request failed', error);
  }
}

function* directionSaga() {
  yield takeLatest('GET_DIRECTION', fetchDirections);
}

export default directionSaga;