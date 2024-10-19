import { TechStackProps } from "../types/data-type-definitions";

/** ============== Backend Dependencies ========================== */
export const Java: TechStackProps = {
  name: "Java",
  type: "FE_BE_BOTH",
  dependsOn: [],
};

export const SpringBoot: TechStackProps = {
  name: "SpringBoot",
  type: "BACKEND",
  dependsOn: [Java],
};

export const SpringBootCloud: TechStackProps = {
  name: "SpringBootCloud",
  type: "BACKEND",
  dependsOn: [SpringBoot],
};

export const NodeJS: TechStackProps = {
  name: "NodeJS",
  type: "BACKEND",
  dependsOn: [],
};

// Frontend Dependencies
export const HTML: TechStackProps = {
  name: "HTML",
  type: "FRONTEND",
  dependsOn: [],
};
export const CSS: TechStackProps = {
  name: "CSS",
  type: "FRONTEND",
  dependsOn: [],
};
export const JavaScript: TechStackProps = {
  name: "JavaScript",
  type: "FRONTEND",
  dependsOn: [],
};
export const jQuery: TechStackProps = {
  name: "jQuery",
  type: "FRONTEND",
  dependsOn: [],
};
export const TypeScript: TechStackProps = {
  name: "TypeScript",
  type: "FRONTEND",
  dependsOn: [],
};
export const ReactJS: TechStackProps = {
  name: "ReactJS",
  type: "FRONTEND",
  dependsOn: [HTML, CSS, JavaScript, NodeJS],
};

export const NextJS: TechStackProps = {
  name: "NextJS",
  type: "FRONTEND",
  dependsOn: [ReactJS],
};

export const NextJSWithTS: TechStackProps = {
  name: "NextJSWithTS",
  type: "FRONTEND",
  dependsOn: [NextJS, TypeScript],
};

export const ReactJSWithTS: TechStackProps = {
  name: "ReactJSWithTS",
  type: "FRONTEND",
  dependsOn: [ReactJS, TypeScript],
};

// Database Dependencies
export const MongoDB: TechStackProps = {
  name: "MongoDB",
  type: "DATABASE",
  dependsOn: [],
};

export const MySQL: TechStackProps = {
  name: "MySQL",
  type: "DATABASE",
  dependsOn: [],
};
