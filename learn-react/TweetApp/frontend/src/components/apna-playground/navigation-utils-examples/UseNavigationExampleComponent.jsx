import React, { useCallback } from "react";
import useSPPNavigation from "../../../common/hooks/useSPPNavigation";
import styles from "./styles.module.css";
import * as ReactIconsFA from "react-icons/fa";
import { buttonConfig } from "./buttonConfig";

// Safely fetch icon components by name
const getIcon = (name = "FaQuestionCircle") =>
  ReactIconsFA[name] || ReactIconsFA.FaQuestionCircle;

const UseNavigationExampleComponent = React.memo(() => {
  const navigation = useSPPNavigation();

  // Callback to render buttons
  const renderButton = useCallback(({ title, method, params, icon }, idx) => {
    const IconComponent = getIcon(icon);

    const handleClick = () => {
      if (navigation[method]) {
        navigation[method](...params); // Invoke method dynamically
      } else {
        console.error(`Method "${method}" not found on navigation object.`);
      }
    };

    return (
      <div className={styles.slide} key={`button_${idx}`}>
        <button
          className={styles.button}
          title={title}
          onClick={handleClick}
        >
          <IconComponent className={styles.icon} /> {title}
        </button>
      </div>
    );
  }, [navigation]);

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselTrack}>
        {buttonConfig.map(renderButton)}
      </div>
    </div>
  );
});

export default UseNavigationExampleComponent;
