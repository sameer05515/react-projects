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
