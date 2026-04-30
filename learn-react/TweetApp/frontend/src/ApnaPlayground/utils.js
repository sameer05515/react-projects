/**
 * Apna Playground registry — demos load on demand via React.lazy (separate chunks).
 *
 * - `componentNames` / `calculateNextPrev` / `getComponentDetails` power the main playground UI.
 * - Duplicate v1/v2/v3 demos are collapsed to one canonical entry where versions were redundant
 *   (see `MyFormWithValidation`, `MetaLearningCycle`). Older files remain on disk for reference.
 */

import React, { lazy } from "react";

/** @typedef {() => Promise<{ default: React.ComponentType<any> }>} PlaygroundLoader */

/**
 * Ordered list: [key, dynamic import loader].
 * Order defines prev/next cycling in the playground header.
 * @type {Array<[string, PlaygroundLoader]>}
 */
const PLAYGROUND_REGISTRY = [
  ["MiscellaneousExamples", () => import("./MiscellaneousExamples/Dashboard")],
  ["SettingDashboard", () => import("./SettingsTesting/Dashboard")],
  [
    "UseGlobalServiceProviderTestingV1",
    () => import("./UseGlobalServiceProviderTesting/v1"),
  ],
  ["DraggableAreaDashboard", () => import("./drag-drop/Dashboard")],
  ["ActionableContainer", () => import("./actionable/ActionableContainer")],
  ["ActivityForm", () => import("./activity/ActivityForm")],
  [
    "SchedulerCalender",
    () => import("./calendar/SchedulerCalenderWithEventsWithViews"),
  ],
  ["MyFormWithValidation", () => import("./MyFormWithValidation")],
  [
    "GitDiffV1",
    () =>
      import("./GitDiff/v1").then((m) => ({
        default: function GitDiffPlaygroundDemo() {
          return React.createElement(m.default, {
            oldContent: "This is the old content.",
            newContent: "This is the new content.",
          });
        },
      })),
  ],
  ["GoldRateTableV1", () => import("./GoldRateTable/v1")],
  ["ToastButtonComponentV1", () => import("./ToastButtonComponent/v1")],
  ["FormComponentV1", () => import("./FormComponent/v1")],
  ["LoadingButtonV1", () => import("./LoadingButton/v1")],
  ["MUIIconTestV1", () => import("./MUIIconTest/v1")],
  ["UserListComponentV1", () => import("./UserListComponent/v1")],
  ["TestHttpV1", () => import("./TestHttp/v1")],
  ["ReactQueryBuilderDemoV1", () => import("./ReactQueryBuilderDemo/v1")],
  ["BootstrapClassUseV1", () => import("./BootstrapClassUse/v1")],
  ["ListWithEditIconV1", () => import("./ListWithEditIcon/v1")],
  /** Canonical demo: v3 implementation (v1/v2 files kept under ./MetaLearningCycle/ only). */
  ["MetaLearningCycle", () => import("./MetaLearningCycle")],
  ["ChantingV1", () => import("./chanting/v1")],
  ["RevisionHelperV1", () => import("./RevisionHelper/v1")],
  [
    "AwsCategoriesAccordion",
    () => import("./aws-services/AwsCategoriesAccordion"),
  ],
  ["DesignPatternAccordion", () => import("./aws-services/DesignPatternAccordion")],
  ["LineNumberFormatterV1", () => import("./LineNumberFormatter/v1")],
  ["SmartEditorV4Dashboard_V1_0_0", () => import("./smart-editor/main/SmartEditorV4Dashboard_V1_0_0")],
  ["ChatGPTDashboardV1_0_0", () => import("./chatgpt-renderer/AppChatGPTDashboardV1_0_0")],
];

export const componentNames = PLAYGROUND_REGISTRY.map(([name]) => name);

const playgroundLazyComponents = Object.fromEntries(
  PLAYGROUND_REGISTRY.map(([name, load]) => [name, lazy(load)])
);

const componentCount = componentNames.length;

export const calculateNextPrev = (selectedIndex) =>
  selectedIndex >= 0
    ? {
        next: componentNames[(selectedIndex + 1 + componentCount) % componentCount],
        prev: componentNames[(selectedIndex - 1 + componentCount) % componentCount],
      }
    : { next: "", prev: "" };

/**
 * @param {string} [componentName]
 * @returns {{ LazyComponent: React.LazyExoticComponent<React.ComponentType<any>> | null, next: string, prev: string }}
 */
export const getComponentDetails = (componentName = "") => {
  const selectedIndex = componentNames.indexOf(componentName);
  return {
    LazyComponent: playgroundLazyComponents[componentName] || null,
    ...calculateNextPrev(selectedIndex),
  };
};
