import { Navigate, Outlet } from "react-router-dom";
import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContex";

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);
  return <div>{user ? <Outlet /> : <Navigate to="/login" />}</div>;
};

export default PrivateRoute;
