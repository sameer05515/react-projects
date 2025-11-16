import React from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

const TestRouterPage = () => {
  const routeParams = useParams();
  const [searchParams, ...restSearchParams] = useSearchParams();
  const location = useLocation();
  return (
    <div>
      <h1>Testing Route: For useSPPNavigation hook testing</h1>
      <div>
        Params: ID:
        <pre>
          {JSON.stringify(
            {
              routeParams,
              searchParams,
              param: searchParams.get("param"),
              restSearchParams,
              location,
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
};

export default TestRouterPage;
