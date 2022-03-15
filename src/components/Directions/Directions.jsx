import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function Directions() {
  const dispatch = useDispatch();
  const direction = useSelector((store) => store.directionReducer);
  const route = useSelector((store) => store.userPrefReducer.route);
  const history = useHistory();
  const userPref = useSelector((store) => store.userPrefReducer);

  console.log("Inside directions: directions are:", direction);

  const getStops = (id) => {
    console.log("inside getStops dirction is:", direction[id]);
    dispatch({
      type: "GET_STOPS",
      payload: { direction: direction[id], route: route },
    });
  };

  const backButton = () => {
    history.push("/info");
  };

  const nextButton = () => {
    history.push("/info/stops");
  };

  return (
    <>
      <p>Route: {userPref.route}</p>

      <h1>Direction</h1>
      <button
        onClick={(event) => getStops(event.target.id)}
        id={direction[0].direction_id}
        value={direction[0]}
      >
        {direction[0].direction_name}
      </button>
      <button
        onClick={(event) => getStops(event.target.id)}
        id={direction[1].direction_id}
        value={direction[1]}
      >
        {direction[1].direction_name}
      </button>
      <div>
        <button onClick={backButton}>Back</button>
        <button onClick={nextButton}>Next</button>
      </div>
    </>
  );
}

export default Directions;
