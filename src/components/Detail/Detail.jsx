import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import DetailEdit from "../DetailEdit/DetailEdit";

function Detail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const detail = useSelector((store) => store.detailReducer);
  const arrival = useSelector((store) => store.arrivalReducer);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    dispatch({ type: "GET_DETAIL", payload: id });
  }, []);

  const editButton = () => {
    console.log("Inside back button");
    history.push("/");
  };

  return (
    <>
      {edit === false ? (
        <div>
          <h1>{detail.route_id}</h1>
          <p>Arrives in: {arrival.arrival}</p>
          <p> {detail.description}</p>
          <p>{detail.direction_name}</p>
          <p>Notify At: {detail.time}</p>
          <button onClick={() => setEdit(true)}>Edit</button>
        </div>
      ) : (
        <div>
            <DetailEdit setEdit={setEdit}/> 
          
        </div>
      )}
    </>
  );
}

export default Detail;
