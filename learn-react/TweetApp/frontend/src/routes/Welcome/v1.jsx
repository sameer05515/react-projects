/**
 * Welcome component serves as a simple, styled welcome header for the app.
 * 
 * - It imports a CSS module for scoped styles.
 * - Renders a header with a highlighted greeting message ("Welcome Bro!!").
 * - The message is styled via CSS classes: `header` for the header and `highlight` for the span.
 * 
 * This component is used as the initial landing page/header after login or at the root.
 */

import React from "react";
import classes from "./styles.module.css";

const Welcome = () => {
  return (
    <header className={classes.header}>
      <h1>
        <span className={classes.highlight}>Welcome Bro!!</span>
      </h1>
    </header>
  );
};

export default Welcome;
