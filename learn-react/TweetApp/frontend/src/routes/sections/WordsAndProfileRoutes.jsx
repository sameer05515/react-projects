import React from "react";
import { Route } from "react-router-dom";
import * as P from "../lazyPages";

export const wordsAndProfileRouteElements = [
  <Route key="words" path="/words" element={<P.WordList />} />,
  <Route
    key="my-resume"
    path="/my-resume"
    element={<P.MyResumeComponent uniqueId="john_doe_resume" />}
  />,
];
