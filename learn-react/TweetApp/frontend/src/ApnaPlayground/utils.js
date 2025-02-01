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

const Components = {
  MiscellaneousExamples,
  SettingDashboard,
  UseGlobalServiceProviderTestingV1,
  DraggableAreaDashboard,
  ActionableContainer,
  ActivityForm,
  SchedulerCalender,
  MyFormWithValidation,
  GitDiffV1: () => <GitDiffV1 oldContent="This is the old content." newContent="This is the new content." />,
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
  RevisionHelperV1
};

export const componentNames = Object.keys(Components);
const componentCount = componentNames.length;

export const calculateNextPrev = (selectedIndex) =>
  selectedIndex >= 0
    ? {
        next: componentNames[(selectedIndex + 1 + componentCount) % componentCount],
        prev: componentNames[(selectedIndex - 1 + componentCount) % componentCount],
      }
    : { next: "", prev: "" };

export const getComponentDetails = (componentName = "") => {
  const selectedIndex = componentNames.indexOf(componentName);
  return {
    Component: Components[componentName] || null,
    ...calculateNextPrev(selectedIndex),
  };
};
