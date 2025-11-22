import React from "react";
import { Navigate, Route } from "react-router-dom";
import Welcome from "../Welcome/v2";

export function homeIndexRouteElement(isAuthenticated) {
  return (
    <Route
      key="index"
      index
      element={
        !isAuthenticated ? (
          <Navigate to="/login" />
        ) : (
          <Welcome />
        )
      }
    />
  );
}
