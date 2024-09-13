import { TechStackProps } from "../types/data-type-definitions";

/** ============== Backend Dependencies ========================== */ 
export const Java: TechStackProps = {
  name: "Java",
  type: "FE_BE_BOTH",
  dependency: [],
};

export const SpringBoot: TechStackProps = {
  name: "SpringBoot",
  type: "BACKEND",
  dependency: [Java],
};

export const SpringBootCloud: TechStackProps = {
  name: "SpringBootCloud",
  type: "BACKEND",
  dependency: [SpringBoot],
};

export const NodeJS: TechStackProps = {
  name: "NodeJS",
  type: "BACKEND",
  dependency: [],
};

// Frontend Dependencies
export const HTML: TechStackProps = {
  name: "HTML",
  type: "FRONTEND",
  dependency: [],
};
export const CSS: TechStackProps = {
  name: "CSS",
  type: "FRONTEND",
  dependency: [],
};
export const JavaScript: TechStackProps = {
  name: "JavaScript",
  type: "FRONTEND",
  dependency: [],
};
export const jQuery: TechStackProps = {
  name:"jQuery",
  type: "FRONTEND",
  dependency: [],
}
export const TypeScript: TechStackProps = {
    name: "TypeScript",
    type: "FRONTEND",
    dependency: [],
  };
export const ReactJS: TechStackProps = {
  name: "ReactJS",
  type: "FRONTEND",
  dependency: [HTML, CSS, JavaScript, NodeJS, ],
};

export const NextJS: TechStackProps = {
  name: "NextJS",
  type: "FRONTEND",
  dependency: [ReactJS],
};

export const NextJSWithTS: TechStackProps = {
  name: "NextJSWithTS",
  type: "FRONTEND",
  dependency: [NextJS, TypeScript],
};

export const ReactJSWithTS: TechStackProps = {
  name: "ReactJSWithTS",
  type: "FRONTEND",
  dependency: [ReactJS, TypeScript],
};

// Database Dependencies
export const MongoDB: TechStackProps = {
  name: "MongoDB",
  type: "DATABASE",
  dependency: [],
};

export const MySQL: TechStackProps = {
  name: "MySQL",
  type: "DATABASE",
  dependency: [],
};
