import React from "react";
import { Route } from "react-router-dom";
import * as P from "../lazyPages";

export const userResumeSettingsRouteElements = [
  <Route key="user-mgmt" path="/user-mgmt" element={<P.UserDashboard />} />,
  <Route key="resume-mgmt" path="/resume-mgmt" element={<P.ResumeForm />} />,
  <Route key="settings" path="/settings" element={<P.SettingsBase />} />,
];
