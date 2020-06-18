import React, { useState, useContext } from 'react';
import { Redirect, Route } from "react-router-dom";
import AdminContext from '../Contexts/AdminContext';


const PrivateRouteAdmin = ({ path, component }) => {
  
  const { isAdmin } = useContext(AdminContext);

  return isAdmin ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/shop" />
  );
  
};
 
export default PrivateRouteAdmin;