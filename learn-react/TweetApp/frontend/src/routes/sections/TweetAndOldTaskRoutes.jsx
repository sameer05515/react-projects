import React from "react";
import { Route } from "react-router-dom";
import * as P from "../lazyPages";

/** Flat routes under MainLayout (array avoids Fragment issues with RR6). */
export const tweetAndOldTaskRouteElements = [
  <Route key="tweet-base" path="/tweet-base" element={<P.TweetBase />} />,
  <Route key="old-task-mgmt" path="/old-task-mgmt" element={<P.OldTasksBase />} />,
];
