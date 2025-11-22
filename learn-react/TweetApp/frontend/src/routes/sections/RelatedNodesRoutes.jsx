import React from "react";
import { Route } from "react-router-dom";
import * as P from "../lazyPages";

export const relatedNodesRouteElements = [
  <Route key="node-story" path="/node-story" element={<P.RelatedNodesBase />}>
    <Route path="create" element={<P.CreateRelatedNodeItem />} />
    <Route path=":id/edit" element={<P.EditRelatedNodeItem />} />
    <Route path=":id/create-relation" element={<P.CreateRelation />} />
    <Route path=":id/edit-relation" element={<P.EditRelation />} />
  </Route>,
  <Route key="node-story-v1" path="/node_story_v1" element={<P.RelatedNodesBaseV1 />}>
    <Route path=":id" element={<P.ViewNode />} />
  </Route>,
];
