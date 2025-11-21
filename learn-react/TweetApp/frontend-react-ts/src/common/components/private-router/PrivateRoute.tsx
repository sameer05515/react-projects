import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "../../service/authService";


function PrivateRoute({ element, ...rest }: { element: JSX.Element }) {
  return (
    <Route
      {...rest}
      element={isAuthenticated() ? element : <Navigate to="/login" />}
    />
  );
}

export default PrivateRoute;

