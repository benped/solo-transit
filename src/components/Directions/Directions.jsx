import { useDispatch, useSelector } from "react-redux";

function Directions(){

    const dispatch = useDispatch();
    const direction = useSelector((store) => store.directionReducer);


    // console.log('Inside directions: direction is:', direction);

    const getStops = (direction) => {
        console.log('inside getStops');
        dispatch({type:"GET_STOPS", payload:direction})
    }

    return (
        <>
        <button onClick={(event) => getStops(event.target.value)} value={direction[0].direction_id}>{direction[0].direction_name}</button>
        <button onClick={(event) => getStops(event.target.value)} value={direction[1].direction_id}>{direction[1].direction_name}</button>
        </>
    )
}

export default Directions;