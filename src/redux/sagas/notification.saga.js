import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* textMe(action){
    console.log('INside textMe SAGA',action.payload);
    let text = `Next Bus: ${action.payload.stop.departure_text} Route: ${action.payload.stop.route_short_name} Direction: ${action.payload.stop.direction_text}`;
    console.log('text is', {text: text, phone: Number(action.payload.phone)});
    
    try {
       
        yield axios.post('/api/text', { text: text, phone: Number(action.payload.phone)});
    } catch {
        console.log('textMe failed');
        
    }
}

function* notificationSaga() {
    yield takeLatest('TEXT_ME', textMe);
  }
  
  export default notificationSaga;