import React from "react";
import { Route } from "react-router-dom";
import * as P from "../lazyPages";

export const memoryMapsRouteTree = (
  <Route key="memory-maps" path="/memory-maps" element={<P.MemoryMapBase />}>
      <Route index element={<P.MemoryMapList />} />
      <Route path=":id" element={<P.MemoryMapList />} />
      <Route path="create" element={<P.CreateMemoryMapItem />} />
      <Route path=":id/edit" element={<P.EditMemoryMapItem />} />
      <Route
        path=":id/edit/append-skeleton"
        element={<P.AddUpdateSkeletonForMemoryMapItem />}
      />
      <Route
        path=":id/edit/append-skeleton-v2"
        element={<P.AddUpdateSkeletonUsingTreeEditorForMemoryMapItem />}
      />
    </Route>
);
