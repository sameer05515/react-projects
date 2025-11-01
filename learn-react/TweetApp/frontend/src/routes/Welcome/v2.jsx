import React from "react";
import classes from "./styles.v2.module.css";
import { availableOutputTypes, SmartPreviewer } from "../../common/components/Smart/Editor/v3";
import MetaLearningCycleV3 from "../../ApnaPlayground/MetaLearningCycle/v3";

/**
 * WelcomeV2 component serves as a styled welcome/info page.
 *
 * - It displays a header with a highlighted welcome message.
 * - It renders an array of learning step labels (Stay calm, Review, ...)
 *   in visually arranged circular items (CSS handles the circle layout).
 * - The same cycle is also printed as a flat, text-based progression.
 * - It uses SmartPreviewer to render a brief overview explaining
 *   the purpose and key features/goals of TweetApp, highlighting
 *   interview preparation, memory maps, and more.
 * - It also shows a <MetaLearningCycleV3 /> widget/diagram 
 *   (likely a visual/interactive cycle of meta-learning step).
 * 
 * The component emphasizes theme consistency via CSS modules.
 */

const steps = [
  "Stay calm",
  "Review",
  "Prioritize",
  "Revise",
  "Practice",
  "Retrospect"
];

// Generate array of objects with id and value for each learning step
const values = steps.map((val, idx) => ({
  id: `idx_${idx + 1}`,
  value: `${idx + 1}: ${val}`,
}));

const WelcomeV2 = () => {
  return (
    <div>
      {/* Header section with highlight */}
      <header className={classes.header}>
        <h1>
          <span className={classes.highlight}>Welcome Bro!!</span>
        </h1>
      </header>
      
      {/* Circle container shows each step in the cycle layout */}
      <div className={classes["circle-container"]}>
        {values.map(({ id, value }) => (
          <div key={id} className={classes["item"]}>
            {value}
          </div>
        ))}
      </div>

      {/* Display the learning cycle in a linear (arrow) format */}
      <div className="text-center">
        {steps.join(" → ")} → Stay Calm
      </div>

      {/* Preview: Explanation about TweetApp's goal */}
      <div style={{ whiteSpace: "pre-wrap" }}>
        <SmartPreviewer
          data={{
            content: `
Main aim of TweetApp is to help users to 
  - <b>Quickly revise concepts for Interview Preparation.</b>
  - Learn new things and store learnings securely
  - Using Memory-maps we want to relate learnings (in form of Topics, Questions, Tags, Words or other Memory-maps too.)
`,
            textOutputType: availableOutputTypes.HTML,
          }}
        />
      </div>

      {/* Meta-learning cycle: likely a visual component */}
      <MetaLearningCycleV3/>
    </div>
  );
};

export default WelcomeV2;
