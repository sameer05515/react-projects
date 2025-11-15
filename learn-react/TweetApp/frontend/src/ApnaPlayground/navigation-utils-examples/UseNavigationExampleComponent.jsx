import React, { useCallback } from "react";
import useSPPNavigation from "../../common/hooks/useSPPNavigation";
import * as ReactIconsFA from "react-icons/fa";
import { buttonConfig } from "./buttonConfig";

const getIcon = (name = "FaQuestionCircle") =>
  ReactIconsFA[name] || ReactIconsFA.FaQuestionCircle;

const UseNavigationExampleComponent = React.memo(() => {
  const navigation = useSPPNavigation();

  const renderButton = useCallback(
    ({ title, method, params, icon }, idx) => {
      const IconComponent = getIcon(icon);

      const handleClick = () => {
        if (navigation[method]) {
          navigation[method](...params);
        } else {
          console.error(`Method "${method}" not found on navigation object.`);
        }
      };

      return (
        <div className="flex-0 w-48" key={`button_${idx}`}>
          <button
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            title={title}
            onClick={handleClick}
          >
            <IconComponent className="text-base" /> {title}
          </button>
        </div>
      );
    },
    [navigation]
  );

  return (
    <div className="mx-auto mt-8 flex max-w-5xl overflow-hidden rounded-2xl bg-slate-50 shadow-lg">
      <div className="flex w-full animate-[carousel-scroll_15s_linear_infinite] gap-4 p-4 hover:[animation-play-state:paused]">
        {buttonConfig.map(renderButton)}
      </div>
    </div>
  );
});

export default UseNavigationExampleComponent;
