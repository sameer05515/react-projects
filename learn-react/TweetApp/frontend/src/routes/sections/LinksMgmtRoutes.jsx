import React from "react";
import { Route } from "react-router-dom";
import * as P from "../lazyPages";

export const linksMgmtRouteTree = (
  <Route key="links-mgmt" path="/links-mgmt" element={<P.LinksBase />}>
      <Route path=":id/edit" element={<P.EditLink />} />
      <Route path=":id" element={<P.ViewLink />} />
      <Route path="create" element={<P.CreateLink />} />
    </Route>
);
