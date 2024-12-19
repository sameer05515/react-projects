import React, { useCallback, useRef } from "react";
import useSPPNavigation from "../../../common/hooks/useSPPNavigation";
import styles from "./styles.v2.module.css";
import * as ReactIconsFA from "react-icons/fa";
import { buttonConfig } from "./buttonConfig";

// Safely fetch icon components by name
const getIcon = (name = "FaQuestionCircle") =>
  ReactIconsFA[name] || ReactIconsFA.FaQuestionCircle;

const UseNavigationExampleComponentV2 = React.memo(() => {
  const navigation = useSPPNavigation();
  const carouselRef = useRef(null);

  // Handle scrolling left or right
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 200; // Adjust based on button size
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Callback to render buttons
  const renderButton = useCallback(
    ({ title, method, params, icon }, idx) => {
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
          <button className={styles.button} title={title} onClick={handleClick}>
            <IconComponent className={styles.icon} /> {title}
          </button>
        </div>
      );
    },
    [navigation]
  );

  return (
    <div className={styles.carouselContainer}>
      <button
        className={styles.scrollButton}
        onClick={() => scrollCarousel("left")}
      >
        {"<"}
      </button>
      <div className={styles.carousel} ref={carouselRef}>
        <div className={styles.carouselTrack}>
          {buttonConfig.map(renderButton)}
        </div>
      </div>
      <button
        className={styles.scrollButton}
        onClick={() => scrollCarousel("right")}
      >
        {">"}
      </button>
    </div>
  );
});

export default UseNavigationExampleComponentV2;
