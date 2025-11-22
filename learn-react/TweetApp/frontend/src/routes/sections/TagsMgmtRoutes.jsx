import React from "react";
import { Route } from "react-router-dom";
import * as P from "../lazyPages";

export const tagsMgmtRouteTree = (
  <Route key="tags" path="/tags" element={<P.TagBase />}>
      <Route path=":id/edit" element={<P.EditTag />} />
      <Route path=":id" element={<P.ViewTag />} />
      <Route path="create" element={<P.CreateTag />} />
      <Route path="search" element={<P.SearchTagRouterPage />} />
      <Route path=":id/add-sub-tag" element={<P.AddSubTagComp />} />
      <Route path=":id/move-parent" element={<P.MoveToAnotherTagParent />} />
    </Route>
);
