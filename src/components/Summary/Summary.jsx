import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Stops() {
  const dispatch = useDispatch();
  const userPref = useSelector((store) => store.userPrefReducer);
  const history = useHistory();

  const backButton = () => {
    history.push("/info/stops");
  };

  const nextButton = () => {
    console.log('inside confirm', notify.value);
    
  };


  // place_code

  return (
    <>
      <h1>Summary</h1>

          <p>Route: {userPref.route}</p>
          <p>Direction: {userPref.direction.direction_name}</p>
          <p>Stop: {userPref.stop.description}</p>


          
            <label for="appt">When do you want to be notified?</label>
            <input type="time" id="notify" name="notify" />
            
          


      <div>
        <button onClick={backButton}>Back</button>
        <button onClick={nextButton}>Next</button>
      </div>
    </>
  );
}

export default Stops;
