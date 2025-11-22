import React from "react";
import { Route } from "react-router-dom";
import * as P from "../lazyPages";

export const reportsAndTestRouteElements = [
  <Route key="my-reports" path="/my-reports" element={<P.ToDoBase />} />,
  <Route key="test-route" path="/test-route" element={<P.TestRouterPage />} />,
];
