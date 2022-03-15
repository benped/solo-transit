import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';


function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const routes = useSelector((store) => store.userRoutes);
  
  const dispatch = useDispatch();

  // const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_PREF' });
  }, [dispatch]);


  return (
    <>


    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      
      {/* <LogOutButton className="btn" /> */}
      
    </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
