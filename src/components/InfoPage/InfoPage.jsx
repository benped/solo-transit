import React from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {
    console.log("in useEffect");
    dispatch({type:"FETCH_ROUTES"})
  }, []);





const routeHandler = () => {
  
}

  return (
    <div className="container">
      <p>Info Page</p>
      
      <button onClick={routeHandler}>SetRoute</button>
    </div>
  );
}

export default InfoPage;
