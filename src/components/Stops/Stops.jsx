import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';

function Stops() {
  const dispatch = useDispatch();
  const stops = useSelector((store) => store.stopReducer);
  const setSelectedStop = (stop) => {
    dispatch({type:"SET_STOP_PREF",payload:stop})
  }
  

  return (
    <>
      <h1>Stops Drop Down</h1>

      <select
      onChange={e => setSelectedStop(e.target.value)}>
        {stops.map((stop, i) => (
          <option key={i} value={stop}>{stop.description}</option>
        ))}
      </select>
    </>
  );
}

export default Stops;
