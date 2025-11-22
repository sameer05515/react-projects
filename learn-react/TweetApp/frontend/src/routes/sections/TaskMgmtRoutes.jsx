import React from "react";
import { Route } from "react-router-dom";
import * as P from "../lazyPages";

export const taskMgmtRouteTree = (
  <Route key="task-mgmt" path="/task-mgmt" element={<P.TaskBase />}>
      <Route path=":id/edit" element={<P.EditTaskRouterPage />} />
      <Route path=":id/add-sub-task" element={<P.AddSubTaskRouterPage />} />
      <Route path=":id" element={<P.ViewTaskRouterPage />} />
      <Route path="create" element={<P.CreateTaskRouterPage />} />
    </Route>
);
