import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchRoutes() {
  try {

    const response = yield axios.get('https://svc.metrotransit.org/nextripv2/routes');

    // now that the session has given us a route object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_ROUTES', payload: response });

  } catch (error) {
    console.log('Route get request failed', error);
  }
}

function* routeSaga() {
  yield takeLatest('FETCH_ROUTES', fetchRoutes);
}

export default routeSaga;