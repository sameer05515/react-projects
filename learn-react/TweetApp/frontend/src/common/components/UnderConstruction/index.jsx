import React from "react";
import useSPPNavigation from "../../hooks/useSPPNavigation";

const UnderConstruction = ({ title = "", showBackButton, showHomeButton }) => {
  const { goBack, goToHome } = useSPPNavigation();
  const handleGoBack = () => {
    // window.history.back();
    goBack();
  };

  const handleGoToHome = () => {
    // window.location.href = "/";
    goToHome();
  };

  return (
    <div className="mx-auto my-8 max-w-3xl rounded-xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
      {title && <h1 className="mb-2 text-2xl font-bold text-amber-900">{title}</h1>}
      <h2 className="mb-4 text-sm leading-6 text-amber-900">
        This view is currently under construction. Please contact your admin team for the
        expected date, when this will be resumed to be functional again.
      </h2>
      <div className="flex flex-wrap gap-2">
        {showBackButton && (
          <button
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm transition-colors hover:bg-gray-50"
            onClick={handleGoBack}
          >
            Go Back
          </button>
        )}
        {showHomeButton && (
          <button
            className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
            onClick={handleGoToHome}
          >
            Go to Home
          </button>
        )}
      </div>
    </div>
  );
};

export default UnderConstruction;
