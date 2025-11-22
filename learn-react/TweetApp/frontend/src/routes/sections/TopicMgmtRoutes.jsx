import React from "react";
import { Route } from "react-router-dom";
import * as P from "../lazyPages";

export const topicMgmtRouteTree = (
  <Route key="topic-mgmt" path="/topic-mgmt" element={<P.TopicBase />}>
      <Route path="wiki/:id" element={<P.TopicBaseWiki />} />
      <Route path="published" element={<P.PublishedTopicsPage />} />
      <Route path=":id/edit" element={<P.EditTopicComp />} />
      <Route path=":id" element={<P.ViewTopic />} />
      <Route path=":id/add-sub-topic" element={<P.AddSubTopicComp />} />
      <Route path=":id/move-parent" element={<P.MoveToAnotherTopicParent />} />
      <Route path=":id/add-section" element={<P.CreateSectionRouterPage />} />
      <Route
        path=":id/section/:sectionId/edit"
        element={<P.EditSectionRouterPage />}
      />
      <Route path="create-bulk" element={<P.CreateTopicBulkComp />} />
      <Route path="create" element={<P.CreateTopicComp />} />
      <Route path="search" element={<P.SearchTopicRouterPage />} />
      <Route path="two-nodes" element={<P.TwoNodeComponentV53 />} />
    </Route>
);
