// import { useState, useMemo, ChangeEvent } from "react";
// import "./App.css";
import CourseGoalsVersions from "./components/course-goal/CourseGoalsVersions";
import CourseGoalWithHeader from "./components/course-with-header/CourseWithHeader";
import CourseGoalWithHeaderV2 from "./components/course-with-header/CourseGoalWithHeaderV2";
import CourseGoalWithHeaderV3 from "./components/course-with-header/CourseGoalWithHeaderV3";
import CourseGoalWithHeaderV4 from "./components/course-goal-with-header-and-state/CourseGoalWithHeaderV4";
import CourseGoalWithHeaderV5 from "./components/course-goal-with-header-and-state/CourseGoalWithHeaderV5";
import CourseGoalWithHeaderV6 from "./components/course-goal-with-header-and-state/CourseGoalWithHeaderV6";
import CourseGoalWithHeaderV7 from "./components/course-goal-with-header-state-and-form/CourseGoalWithHeaderV7";
import CourseGoalWithHeaderV8 from "./components/course-goal-with-header-state-and-form/CourseGoalWithHeaderV8";
import CourseGoalWithHeaderV9 from "./components/course-goal-with-header-state-and-form/CourseGoalWithHeaderV9";
import CourseGoalWithHeaderV10 from "./components/course-goal-with-header-state-and-form/CourseGoalWithHeaderV10";

// Define a type for the structure of componentMapWithPurposes
export interface ComponentDetails {
  element: React.ComponentType; // ComponentType represents a React component
  purpose: string;
  majorRelease?: boolean;
}

// Define the component map
const componentMapWithPurposes: Record<string, ComponentDetails> = {
  CourseGoalsVersions: {
    element: CourseGoalsVersions,
    purpose: "To demonstrate typescript use to create react components",
    majorRelease: true,
  },
  CourseGoalWithHeader: {
    element: CourseGoalWithHeader,
    purpose: "Exercise component to create a header",
    majorRelease: false,
  },
  CourseGoalWithHeaderV2: {
    element: CourseGoalWithHeaderV2,
    purpose: "Header component with alternative syntax",
    majorRelease: false,
  },
  CourseGoalWithHeaderV3: {
    element: CourseGoalWithHeaderV3,
    purpose: "Header component with children and image object destructuring",
    majorRelease: false,
  },
  CourseGoalWithHeaderV4: {
    element: CourseGoalWithHeaderV4,
    purpose: "Now state will be introduced",
    majorRelease: false,
  },
  CourseGoalWithHeaderV5: {
    element: CourseGoalWithHeaderV5,
    purpose: "With seperate 'Course_Goal_List' component",
    majorRelease: false,
  },
  CourseGoalWithHeaderV6: {
    element: CourseGoalWithHeaderV6,
    purpose:
      "With 'delete' goal functionality. passing delete handler to 'Course_Goal_V7' component",
    majorRelease: false,
  },
  CourseGoalWithHeaderV7: {
    element: CourseGoalWithHeaderV7,
    purpose:
      "New form introduced to save Goal, without actual saving functionality",
    majorRelease: false,
  },
  CourseGoalWithHeaderV8: {
    element: CourseGoalWithHeaderV8,
    purpose:
      "Demonstrate `FormEvent` is a generic type and whole formdata can be accessed using `new FormData(event.currentTarget);`",
    majorRelease: false,
  },
  CourseGoalWithHeaderV9: {
    element: CourseGoalWithHeaderV9,
    purpose:
      "Using `Refs` from React, Fully functioned New form introduced to save Goal, with actual saving functionality",
    majorRelease: true,
  },
  CourseGoalWithHeaderV10: {
    element: CourseGoalWithHeaderV10,
    purpose:
      "Using `useState` from React, Fully functioned New form introduced to save Goal, with actual saving functionality",
    majorRelease: true,
  },
};

// Completed componentMapWithPurposes
// const componentMapFromPurpose = Object.keys(
//   componentMapWithPurposes
// ).reduce<Record<string, React.ComponentType>>((acc, key) => {
//   acc[key] =
//     componentMapWithPurposes[key].element ||
//     (() => <h2>No component found for: '{key}'</h2>);
//   return acc;
// }, {});

// Common method to generate options
export const generateOptions = (obj: Record<string, any>) => {
  return Object.keys(obj).map((key) => ({
    value: key,
    label: key,
  }));
};

export const componentOptions = generateOptions(componentMapWithPurposes);

// Placeholder styles and inputOutputMapping (not provided in the original code)
export const labelStyle = { marginRight: "10px" };

export const getComponentDetails = (key: string): ComponentDetails => {
  const details = componentMapWithPurposes[key];

  return {
    ...details,
    majorRelease: details?.majorRelease ?? false, // Assign default if undefined
  };
};
