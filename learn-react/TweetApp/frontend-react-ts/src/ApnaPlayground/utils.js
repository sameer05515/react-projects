/**
 * This file provides utilities for the Apna Playground test page.
 * 
 * 1. It imports several demo/test components from different paths.
 * 2. It creates a "Components" object that maps component names (as keys) to the actual component modules.
 *    - For "GitDiffV1", it wraps it in a function that applies test props.
 *    - The "MyFormWithValidation" and "MyFormWithValidationV2" both refer to the same module, as imported.
 * 3. It extracts the list of component names available in the playground to `componentNames`.
 * 4. It provides a helper function, `calculateNextPrev`, that takes the index of the currently selected component,
 *    and returns the cyclically next and previous component names for navigation in the playground UI.
 * 5. It provides `getComponentDetails`, a function that receives a component name, and returns:
 *      - The actual React Component (or null if not found)
 *      - The calculated next and previous component names to enable navigation buttons.
 */

// Importing all test/demo components for the playground, each from their respective paths.
import BootstrapClassUseV1 from "./BootstrapClassUse/v1";
import FormComponentV1 from "./FormComponent/v1";
import GitDiffV1 from "./GitDiff/v1";
import GoldRateTableV1 from "./GoldRateTable/v1";
import ListWithEditIconV1 from "./ListWithEditIcon/v1";
import LoadingButtonV1 from "./LoadingButton/v1";
import MUIIconTestV1 from "./MUIIconTest/v1";
import MetaLearningCycleV1 from "./MetaLearningCycle/v1";
import MetaLearningCycleV2 from "./MetaLearningCycle/v2";
import MetaLearningCycleV3 from "./MetaLearningCycle/v3";
import MiscellaneousExamples from "./MiscellaneousExamples/Dashboard";
import MyFormWithValidationV1 from "./MyFormWithValidation/v1";
// Both "MyFormWithValidation" and "MyFormWithValidationV2" are the same imported module.
import { default as MyFormWithValidation, default as MyFormWithValidationV2 } from "./MyFormWithValidation/v2";
import ReactQueryBuilderDemoV1 from "./ReactQueryBuilderDemo/v1";
import RevisionHelperV1 from "./RevisionHelper/v1";
import SettingDashboard from "./SettingsTesting/Dashboard";
import TestHttpV1 from "./TestHttp/v1";
import ToastButtonComponentV1 from "./ToastButtonComponent/v1";
import UseGlobalServiceProviderTestingV1 from "./UseGlobalServiceProviderTesting/v1";
import UserListComponentV1 from "./UserListComponent/v1";
import ActionableContainer from "./actionable/ActionableContainer";
import ActivityForm from "./activity/ActivityForm";
import SchedulerCalender from "./calendar/SchedulerCalenderWithEventsWithViews";
import ChantingV1 from "./chanting/v1";
import DraggableAreaDashboard from "./drag-drop/Dashboard";

// Mapping the imported components to string keys for use in the playground UI navigation.
const Components = {
  MiscellaneousExamples,
  SettingDashboard,
  UseGlobalServiceProviderTestingV1,
  DraggableAreaDashboard,
  ActionableContainer,
  ActivityForm,
  SchedulerCalender,
  MyFormWithValidation,
  GitDiffV1: () => (
    <GitDiffV1 oldContent="This is the old content." newContent="This is the new content." />
  ),
  GoldRateTableV1,
  ToastButtonComponentV1,
  FormComponentV1,
  LoadingButtonV1,
  MUIIconTestV1,
  UserListComponentV1,
  MyFormWithValidationV1,
  MyFormWithValidationV2,
  TestHttpV1,
  ReactQueryBuilderDemoV1,
  BootstrapClassUseV1,
  ListWithEditIconV1,
  MetaLearningCycleV1,
  MetaLearningCycleV2,
  MetaLearningCycleV3,
  ChantingV1,
  RevisionHelperV1,
};

// Makes an array of the component names as strings (the keys of the Components object). Used for navigation.
export const componentNames = Object.keys(Components);

// Store the total number of components for easy cyclic navigation calculations.
const componentCount = componentNames.length;

/**
 * Given the index of the currently selected component,
 * this returns an object with cyclically "next" and "prev" component name strings.
 * If the index is not valid (negative), returns empty strings for both.
 */
export const calculateNextPrev = (selectedIndex) =>
  selectedIndex >= 0
    ? {
        next: componentNames[(selectedIndex + 1 + componentCount) % componentCount],
        prev: componentNames[(selectedIndex - 1 + componentCount) % componentCount],
      }
    : { next: "", prev: "" };

/**
 * Given a component name, returns:
 * - The corresponding component (or null if not found)
 * - The next and previous component names for navigation.
 * This helps the playground page know what to render and which navigation options to show.
 */
export const getComponentDetails = (componentName = "") => {
  const selectedIndex = componentNames.indexOf(componentName);
  return {
    Component: Components[componentName] || null,
    ...calculateNextPrev(selectedIndex),
  };
};
