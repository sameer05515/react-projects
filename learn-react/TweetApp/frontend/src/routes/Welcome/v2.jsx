import React from "react";
import classes from "./styles.v2.module.css";
import { availableOutputTypes, SmartPreviewer } from "../../common/components/Smart/Editor/v3";

const values = ["Stay calm", "Review", "Prioritize", "Revise", "Practice", "Retrospect"].map((val, idx) => ({
  id: `idx_${idx + 1}`,
  value: `${idx + 1}: ${val}`,
}));

const WelcomeV2 = () => {
  return (
    <div>
      <header className={classes.header}>
        <h1>
          <span className={classes.highlight}>Welcome Bro!!</span>
        </h1>
      </header>
      <div className={classes["circle-container"]}>
        {values.map(({ id, value }) => (
          <div key={id} className={classes["item"]}>
            {value}
          </div>
        ))}
        {/* <div className={classes["item"]}>Stay calm</div>
        <div className={classes["item"]}>Review</div>
        <div className={classes["item"]}>Prioritize</div>
        <div className={classes["item"]}>Revise</div>
        <div className={classes["item"]}>Practice</div>
        <div className={classes["item"]}>Retrospect</div> */}
      </div>
      <div className="text-center">Stay calm → Review → Prioritize → Revise → Practice → Retrospect → Stay Calm</div>
      <div style={{ whiteSpace: "pre-wrap" }}>
        <SmartPreviewer
          data={{
            content: `
          Main aim of TweetApp is to help users to 
            - <b>Quickly revise concepts for Interview Preparation.</b>
            - Learn new things and store learnings securely
            - Using Memory-maps we want to relate learnings (in form of Topics, Questions, Tags, Words or other Memory-maps too.)
            - 
          
          `,
            textOutputType: availableOutputTypes.HTML,
          }}
        />
      </div>
    </div>
  );
};

export default WelcomeV2;
