// import { useState, useMemo, ChangeEvent } from "react";
// import "./App.css";
import CourseGoalsVersions from "../../components/course/course-goal/CourseGoalsVersions"; 
import CourseGoalWithHeader from "../../components/course/course-goal-with-header/CourseWithHeader";
import CourseGoalWithHeaderV2 from "../../components/course/course-goal-with-header/CourseGoalWithHeaderV2";
import CourseGoalWithHeaderV3 from "../../components/course/course-goal-with-header/CourseGoalWithHeaderV3";
import CourseGoalWithHeaderV4 from "../../components/course/course-goal-with-header-and-state/CourseGoalWithHeaderV4";
import CourseGoalWithHeaderV5 from "../../components/course/course-goal-with-header-and-state/CourseGoalWithHeaderV5";
import CourseGoalWithHeaderV6 from "../../components/course/course-goal-with-header-and-state/CourseGoalWithHeaderV6";
import CourseGoalWithHeaderV7 from "../../components/course/course-goal-with-header-state-and-form/CourseGoalWithHeaderV7";
import CourseGoalWithHeaderV8 from "../../components/course/course-goal-with-header-state-and-form/CourseGoalWithHeaderV8";
import CourseGoalWithHeaderV9 from "../../components/course/course-goal-with-header-state-and-form/CourseGoalWithHeaderV9";
import CourseGoalWithHeaderV10 from "../../components/course/course-goal-with-header-state-and-form/CourseGoalWithHeaderV10";
import CourseGoalWithHeaderV11 from "../../components/course/course-goal-with-info-box/CourseGoalWithHeaderV11";
import CourseGoalWithHeaderV12 from "../../components/course/course-goal-with-info-box/CourseGoalWithHeaderV12";
import AppWithCustomInput from "../../components/adv-components/main/AppWithCustomInput";
import AppWithCustomInputV2 from "../../components/adv-components/main/AppWithCustomInputV2";
import AppWithCustomButton from "../../components/adv-components/main/AppWithCustomButton";
import AppWithCustomButtonV2 from "../../components/adv-components/main/AppWithCustomButtonV2";
import AppWithCustomButtonV3 from "../../components/adv-components/main/AppWithCustomButtonV3";
import AppWithPolymorphicContainerComponent from "../../components/adv-components/main/AppWithPolymorphicContainerComponent";
import AppWithPolymorphicContainerComponentV2 from "../../components/adv-components/main/AppWithPolymorphicContainerComponentV2";
import AppWithSomeMoreComponents from "../../components/adv-components/main/AppWithSomeMoreComponents";
import AppWithCustomInputV3 from "../../components/adv-components/main/AppWithCustomInputV3";
import AppWithCustomForm from "../../components/adv-components/main/AppWithCustomForm";
import AppWithCustomFormV2 from "../../components/adv-components/main/AppWithCustomFormV2";
import AppWithCustomFormV3 from "../../components/adv-components/main/AppWithCustomFormV3";
import AppWithCustomFormV4 from "../../components/adv-components/main/AppWithCustomFormV4";
import AppWithCustomFormV5 from "../../components/adv-components/main/AppWithCustomFormV5";
import AppWithCustomFormV6 from "../../components/adv-components/main/AppWithCustomFormV6";
import AppWithTimer from "../../components/adv-components/main/AppWithTimer";
import AppWithTimerV2 from "../../components/adv-components/main/AppWithTimerV2";
import AppWithTimerV3 from "../../components/adv-components/main/AppWithTimerV3";
import AppWithTimerV4 from "../../components/adv-components/main/AppWithTimerV4";
import AppWithDataFetchingV1 from "../../components/data-fetching/main/AppWithDataFetchingV1";
import AppWithDataFetchingV2 from "../../components/data-fetching/main/AppWithDataFetchingV2";
import AppWithDataFetchingV3 from "../../components/data-fetching/main/AppWithDataFetchingV3";
import AppWithShoppingCartV1 from "../../components/shopping-cart/main/AppWithShoppingCartV1";

// Define a type for the structure of componentMapWithPurposes
export interface ComponentDetails {
  element: React.ComponentType; // ComponentType represents a React component
  purpose: string;
  majorRelease?: boolean;
  module:
    | "Course Project"
    | "Advanced Components"
    | "Data Fetching"
    | "Shopping Cart";
  experimentalComponentAsPerLearningImplementation?: boolean;
}

// Define the component map
const componentMapWithPurposes: Record<string, ComponentDetails> = {
  CourseGoalsVersions: {
    element: CourseGoalsVersions,
    purpose: "To demonstrate typescript use to create react components",
    majorRelease: true,
    module: "Course Project",
  },
  CourseGoalWithHeader: {
    element: CourseGoalWithHeader,
    purpose: "Exercise component to create a header",
    majorRelease: false,
    module: "Course Project",
  },
  CourseGoalWithHeaderV2: {
    element: CourseGoalWithHeaderV2,
    purpose: "Header component with alternative syntax",
    majorRelease: false,
    module: "Course Project",
  },
  CourseGoalWithHeaderV3: {
    element: CourseGoalWithHeaderV3,
    purpose: "Header component with children and image object destructuring",
    majorRelease: false,
    module: "Course Project",
  },
  CourseGoalWithHeaderV4: {
    element: CourseGoalWithHeaderV4,
    purpose: "Now state will be introduced",
    majorRelease: false,
    module: "Course Project",
  },
  CourseGoalWithHeaderV5: {
    element: CourseGoalWithHeaderV5,
    purpose: "With seperate 'Course_Goal_List' component",
    majorRelease: false,
    module: "Course Project",
  },
  CourseGoalWithHeaderV6: {
    element: CourseGoalWithHeaderV6,
    purpose:
      "With 'delete' goal functionality. passing delete handler to 'Course_Goal_V7' component",
    majorRelease: false,
    module: "Course Project",
  },
  CourseGoalWithHeaderV7: {
    element: CourseGoalWithHeaderV7,
    purpose:
      "New form introduced to save Goal, without actual saving functionality",
    majorRelease: false,
    module: "Course Project",
  },
  CourseGoalWithHeaderV8: {
    element: CourseGoalWithHeaderV8,
    purpose:
      "Demonstrate `FormEvent` is a generic type and whole formdata can be accessed using `new FormData(event.currentTarget);`",
    majorRelease: false,
    module: "Course Project",
  },
  CourseGoalWithHeaderV9: {
    element: CourseGoalWithHeaderV9,
    purpose:
      "Using `Refs` from React, Fully functioned New form introduced to save Goal, with actual saving functionality",
    majorRelease: true,
    module: "Course Project",
  },
  CourseGoalWithHeaderV10: {
    element: CourseGoalWithHeaderV10,
    purpose:
      "Using `useState` from React, Fully functioned New form introduced to save Goal, with actual saving functionality",
    majorRelease: true,
    module: "Course Project",
    experimentalComponentAsPerLearningImplementation: true,
  },
  CourseGoalWithHeaderV11: {
    element: CourseGoalWithHeaderV11,
    purpose: "with InfoBox",
    majorRelease: false,
    module: "Course Project",
  },
  CourseGoalWithHeaderV12: {
    element: CourseGoalWithHeaderV12,
    purpose:
      "with InfoBox and severity mandatory, if 'warning' mode. This will be possible by setting discriminating types for info and warning mode",
    majorRelease: false,
    module: "Course Project",
  },
  AppWithCustomInput: {
    element: AppWithCustomInput,
    purpose: "To demonstrate use of CustomInput",
    majorRelease: false,
    module: "Advanced Components",
  },
  AppWithCustomInputV2: {
    element: AppWithCustomInputV2,
    purpose:
      "Enhancement to CustomInputV2, with help of 'ComponentPropsWithoutRef'",
    majorRelease: false,
    module: "Advanced Components",
  },
  AppWithCustomButton: {
    element: AppWithCustomButton,
    purpose: "To demonstrate use of CustomButton",
    majorRelease: false,
    module: "Advanced Components",
  },
  AppWithCustomButtonV2: {
    element: AppWithCustomButtonV2,
    purpose: `
    To eliminate need of 'el' to decide whether it is a ButtonProps or AnchorProps. 
    In place, we will make same decision with the presence of 'href' in props list of 'CustomButtonV2'. 
    
    However, there is flaw in this approach. We can set 'disabled' prop for anchor, which is invalid.
    
    Also we can set invalid 'target' prop to button. 
    
    Will try to resolve this in next release.`,
    majorRelease: false,
    module: "Advanced Components",
  },
  AppWithCustomButtonV3: {
    element: AppWithCustomButtonV3,
    purpose: `
    Enhancement to AppWithCustomButtonV3. With help of \`Type Predicates\`.
    
    Now we are good to differentiate between ButtonProps and AnchorProps, based on href.

    However, it has limitation, as this feature does not prevent by setting \`target\` to button.
    `,
    majorRelease: false,
    module: "Advanced Components",
  },
  AppWithPolymorphicContainerComponent: {
    element: AppWithPolymorphicContainerComponent,
    purpose: "To demonstrate creation and use of Polymorphic Component",
    majorRelease: false,
    module: "Advanced Components",
  },
  AppWithPolymorphicContainerComponentV2: {
    element: AppWithPolymorphicContainerComponentV2,
    purpose: `
    Enhancement to AppWithPolymorphicContainerComponentV2,
    so that we can accpet props of component declared in 'as' prop dynamically.
    
    Please note again we have used 'ComponentPropsWithoutRef' with 'Generics' to achieve the result.
    `,
    majorRelease: false,
    module: "Advanced Components",
  },
  AppWithSomeMoreComponents: {
    element: AppWithSomeMoreComponents,
    purpose: "App With Some More Components, like Card, List and IconButton",
    majorRelease: false,
    module: "Advanced Components",
  },
  AppWithCustomInputV3: {
    element: AppWithCustomInputV3,
    purpose: "Demonstrate use of forwarding 'refs', in AppWithCustomInputV3",
    majorRelease: false,
    module: "Advanced Components",
  },
  AppWithCustomForm: {
    element: AppWithCustomForm,
    purpose: "To demonstrate create a CustomForm, without form submission.",
    majorRelease: false,
    module: "Advanced Components",
  },
  AppWithCustomFormV2: {
    element: AppWithCustomFormV2,
    purpose: `
    Enhancement to CustomFormV2, 
    
    Target is to : Save form and pass extracted-form-data to App component .

    However, in this version, we are getting below warning, which we will solve in next release:-

    Warning: Unknown event handler property \`onSave\`. It will be ignored.
        at form
        at CustomFormV2 (http://localhost:5173/src/components/adv-components/custom-components/custom-form/CustomFormV2.tsx?t=1726330064507:24:93)
        at main
        at AppWithCustomFormV2
        at App (http://localhost:5173/src/App.tsx?t=1726330204809:26:53)
    `,
    majorRelease: false,
    module: "Advanced Components",
  },
  AppWithCustomFormV3: {
    element: AppWithCustomFormV3,
    purpose: `
    The warning mentioned in previous release was since we were passing 'onSave' prop too to 'html form' element.

    Solution to this warning is to use 'Object destructuring' the props of CustomFormV3 and extract custom props like 'onSave'.

    Then pass the rest props to 'html form' element
    `,
    majorRelease: false,
    module: "Advanced Components",
  },
  AppWithCustomFormV4: {
    element: AppWithCustomFormV4,
    purpose:
      "A try to get rid of 'unknown' form data type in 'onSave' prop of CustomFormV3.",
    majorRelease: false,
    module: "Advanced Components",
    experimentalComponentAsPerLearningImplementation: true,
  },
  AppWithCustomFormV5: {
    element: AppWithCustomFormV5,
    purpose:
      "with use of 'useRef' clearing form post submission and passing 'extractedData'",
    majorRelease: false,
    module: "Advanced Components",
  },
  AppWithCustomFormV6: {
    element: AppWithCustomFormV6,
    purpose: `
    with use of 'useImperativeHandle' exposing Component APIs 
    
    to perform clearing form after the submission and passing 'extractedData', 
    
    from calling component of CustomFormV6
    `,
    majorRelease: false,
    module: "Advanced Components",
  },
  AppWithTimer: {
    element: AppWithTimer,
    purpose: `
    Initial version of AppWithTimer.
    We 
      1. used useContext hook to pass state among AddTimer, Header, Timer and Timers component
      2. created a custom hook to get context value
      3. used 'useReducer' hook to provide Actions to 'add timer', 'start timers' and 'stop timers'
      4. wired up component, so that
        - 'start/stop timers' button now toggles based on state
        - add new timer data

    However, in this version timers are not running. We will work on it, in next sections.

    ==========================================
    Overall-Target:
      1. Create and Manage Multiple timers, with State Management using React's Context API & useReducer() with TypeScript
      2. The idea is to demonstrate easier way to manage 'Cross component State'
      3. In AddTimer we get the new timer data to be created
      4. But timers, which already created, will be output in 'Timers' component
      5. And in 'Header' component we will have 'controls' to start/stop timers.
      6. Hence, there are multiple components, which need to be worked together.

    Other possible ways to manage states
      1. Lift the state up and manage through 'AppWithTimer' component itself. 
        - However, this will make main 'AppWithTimer' bulkier.
      2. To keep 'AppWithTimer' lean and manage states with 'React\`s Context API'
      3. 3rd Party solution like 'Redux'

    In this section we will use React's Context API.

    `,
    majorRelease: true,
    module: "Advanced Components",
  },
  AppWithTimerV2: {
    element: AppWithTimerV2,
    purpose: `
    Enhancement to AppWithTimerV2,

    Using 'useEffect' to manage Side-effect caused due to 'setInterval'
    `,
    majorRelease: false,
    module: "Advanced Components",
  },
  AppWithTimerV3: {
    element: AppWithTimerV3,
    purpose: "AppWithTimerV3",
    majorRelease: false,
    module: "Advanced Components",
  },
  AppWithTimerV4: {
    element: AppWithTimerV4,
    purpose: "AppWithTimerV4",
    majorRelease: false,
    module: "Advanced Components",
  },
  AppWithDataFetchingV1: {
    element: AppWithDataFetchingV1,
    purpose: "AppWithDataFetchingV1",
    majorRelease: false,
    module: "Data Fetching",
  },
  AppWithDataFetchingV2: {
    element: AppWithDataFetchingV2,
    purpose: "AppWithDataFetchingV2",
    majorRelease: false,
    module: "Data Fetching",
  },
  AppWithDataFetchingV3: {
    element: AppWithDataFetchingV3,
    purpose: "AppWithDataFetchingV3",
    majorRelease: false,
    module: "Data Fetching",
  },
  AppWithShoppingCartV1: {
    element: AppWithShoppingCartV1,
    purpose: "AppWithShoppingCartV1",
    majorRelease: false,
    module: "Shopping Cart",
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
  return Object.keys(obj).map((key, idx) => ({
    id: `id_${idx + 1}`,
    value: key,
    label: key,
  }));
};

export const componentOptions = generateOptions(componentMapWithPurposes);

export const getNextNthOption = (
  // arr: Array<Record<string, any>>,
  selected: string,
  n: number
) => {
  const selectedIndex = componentOptions.findIndex(
    (option) => option.value === selected
  );

  if (selectedIndex === -1) return null;

  const nextIndex = (selectedIndex + n) % componentOptions.length;

  // Ensure the index is positive if the result is negative
  const validNextIndex =
    nextIndex < 0 ? componentOptions.length + nextIndex : nextIndex;

  return componentOptions[validNextIndex];
};

// Placeholder styles and inputOutputMapping (not provided in the original code)
export const labelStyle = { marginRight: "10px" };

export const getComponentDetails = (key: string): ComponentDetails => {
  const details = componentMapWithPurposes[key];

  return {
    ...details,
    majorRelease: details?.majorRelease ?? false, // Assign default if undefined
    experimentalComponentAsPerLearningImplementation:
      details?.experimentalComponentAsPerLearningImplementation ?? false,
  };
};
