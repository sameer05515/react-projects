import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "../authService";  // Import your authentication service


function PrivateRoute({ element, ...rest }) {
  return (
    <Route
      {...rest}
      element={isAuthenticated() ? element : <Navigate to="/login" />}
    />
  );
}

export default PrivateRoute;

