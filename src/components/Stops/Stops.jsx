import { useDispatch, useSelector } from "react-redux";

function Stops(){

    const dispatch = useDispatch();
    const stops = useSelector((store) => store.stopReducer);


    // console.log('Inside directions: direction is:', direction);


    return (
        <>
        <h1>Stops Drop Down</h1>
        
        <select >
            
      {stops.map((stop,i) => <option key={i}>{stop.description}</option>)}

        </select>
              </>
    )
}

export default Stops;