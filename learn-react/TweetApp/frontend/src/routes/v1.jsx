import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingSpinner from "../common/components/LoadingSpinner";
import { MainLayout, NotFound } from "./AppLayout";
import * as P from "./lazyPages";
import { getMainLayoutNestedRouteElements } from "./mainLayoutNestedRoutes";
import LoginUser from "./login/LoginUser";
import Registration from "./login/Registration";
import Notifications from "./Notifications/v1";

const SPPAppRoutes = ({ isAuthenticated = false, handleLogin = () => {} }) => {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<LoadingSpinner fullScreen />}>
        <Routes>
          <Route path="/apna-playground" element={<P.ApnaPlaygroundBase />} />

          <Route path="/" element={<MainLayout />}>
            {getMainLayoutNestedRouteElements(isAuthenticated)}
          </Route>

          <Route path="/login" element={<LoginUser onLogin={handleLogin} />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/notifications" element={<Notifications />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default SPPAppRoutes;
