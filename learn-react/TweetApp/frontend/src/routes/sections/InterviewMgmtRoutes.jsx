import React from "react";
import { Route } from "react-router-dom";
import * as P from "../lazyPages";

export const interviewMgmtRouteTree = (
  <Route key="interview-mgmt" path="/interview-mgmt" element={<P.InterviewMgmtBase />}>
      <Route index element={<P.CategoryList />} />
      <Route path="questions/create" element={<P.CreateQuestion />} />
      <Route path="questions/:qid" element={<P.ViewQuestionDetails />} />
      <Route
        path="questions/:qid/move-parent"
        element={<P.MoveQuestionToAnotherParentQuestion />}
      />
      <Route path="questions/:qid/edit" element={<P.EditQuestion />} />
      <Route
        path="questions/:qid/answers/create"
        element={<P.CreateAnswer />}
      />
      <Route
        path="questions/:qid/answers/:aid/edit"
        element={<P.EditAnswer />}
      />
      <Route path="search" element={<P.SearchInterviewMgmtRouterPage />} />
    </Route>
);
