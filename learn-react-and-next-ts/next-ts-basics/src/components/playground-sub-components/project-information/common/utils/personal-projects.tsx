import * as TSProps from "./tech-stacks/tech-stacks";
import {
  PersonalProject,
  ProjectProps,
  TechStackProps,
} from "./types/data-type-definitions";

//////////////////////////////////////////////////////////

type PersonalProjectsSemiProcessedDataProps = {
  name: string;
  projectType:
    | "FRONTEND"
    | "BACKEND"
    | "COMMAND-LINE-UTILITY"
    | "MONOLITHIC-WEB-APPLICATION";
  isActiveDevelopmentGoingOn: boolean;
  projectLocation: string;
  purpose: string;
  requiredFeatures: string;
  techStacksUsed: (TechStackProps | string)[];
  developmentHistory: string;
};

const personalProjects: PersonalProjectsSemiProcessedDataProps[] = [
  {
    name: "next-ts-basics",
    projectType: "FRONTEND",
    isActiveDevelopmentGoingOn: true,
    projectLocation:
      "<ROOT>/react-projects/learn-react-and-next-ts/next-ts-basics",
    purpose: `
    Purpose: To learn NextJS basics and using TypeScript and ReactJS in a project
    `,
    requiredFeatures: ``,
    techStacksUsed: [TSProps.NextJSWithTS],
    developmentHistory: "",
  },
  {
    name: "react-ts-basics",
    projectType: "FRONTEND",
    isActiveDevelopmentGoingOn: true,
    projectLocation: "<ROOT>/react-projects/learn-react/react-ts-basics",
    purpose: `
    Purpose: To learn TypeScript basics and using TypeScript in a ReactJS project
    `,
    requiredFeatures: ``,
    techStacksUsed: [TSProps.NextJSWithTS],
    developmentHistory: "",
  },

  {
    name: "Resume Service - GRAPHQL SERVICES",
    projectType: "BACKEND",
    isActiveDevelopmentGoingOn: true,
    projectLocation:
      "<ROOT>/microservices-playground/example-base-03/backend/resume-service",
    purpose: `
            Purpose: 
              - I want to STORE data for different sesctions of resume data and store in database.
                - To capture data for
                  - Summarized introduction
                  - Companies
                  - Projects
                  - Personal Projects
                  - Educational Qualifications
                  - Certifications  
    `,
    requiredFeatures: ``,
    techStacksUsed: [TSProps.NodeJS],
    developmentHistory: "",
  },
  {
    name: "Resume Service - UI",
    projectType: "FRONTEND",
    isActiveDevelopmentGoingOn: true,
    projectLocation:
      "<ROOT>/microservices-playground/example-base-03/fontend/gui-project-01",
    purpose: `
            Purpose: 
              - I want to CAPTURE AND VIEW data for different sesctions of resume data and store in database.
                - To capture data for
                  - Summarized introduction
                  - Companies
                  - Projects
                  - Personal Projects
                  - Educational Qualifications
                  - Certifications  
    `,
    requiredFeatures: ``,
    techStacksUsed: [TSProps.ReactJS],
    developmentHistory: "",
  },
  {
    name: "Chat Renderer",
    projectType: "FRONTEND",
    isActiveDevelopmentGoingOn: true,
    projectLocation:
      "<ROOT>/microservices-playground/example-base-03/fontend/chat-gpt-conversation",
    purpose: "",
    requiredFeatures: "",
    techStacksUsed: [TSProps.ReactJS],
    developmentHistory: "",
  },
  {
    name: "TWEET-APP - UI",
    projectType: "FRONTEND",
    isActiveDevelopmentGoingOn: true,
    projectLocation: "<ROOT>/react-projects/learn-react/TweetApp/frontend",
    purpose: "",
    requiredFeatures: "",
    techStacksUsed: [TSProps.ReactJS],
    developmentHistory: "",
  },
  {
    name: "TWEET-APP - REST SERVICES- NODJS + EXPRESS",
    projectType: "BACKEND",
    isActiveDevelopmentGoingOn: true,
    projectLocation: "<ROOT>/react-projects/learn-react/TweetApp/backend",
    purpose: "",
    requiredFeatures: "",
    techStacksUsed: [TSProps.NodeJS],
    developmentHistory: "",
  },
  {
    name: "TWEET-APP - REST SERVICES- SPRING BOOT",
    projectType: "BACKEND",
    isActiveDevelopmentGoingOn: false,
    projectLocation:
      "<ROOT>/react-projects/learn-react/TweetApp/backend-spring-boot",
    purpose: "",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },
  {
    name: "angular-crud",
    projectType: "FRONTEND",
    isActiveDevelopmentGoingOn: false,
    projectLocation:
      "<ROOT>/unit-testing-playground/example-base-03/angular-crud",
    purpose: "",
    requiredFeatures: "",
    techStacksUsed: [TSProps.JavaScript],
    developmentHistory: "",
  },
  {
    name: "d3-charts-es6-modules-with-webpack-dev-server",
    projectType: "FRONTEND",
    isActiveDevelopmentGoingOn: false,
    projectLocation:
      "<ROOT>/unit-testing-playground/example-base-03/d3-charts-es6-modules-with-webpack-dev-server",
    purpose: "",
    requiredFeatures: "",
    techStacksUsed: [TSProps.JavaScript],
    developmentHistory: "",
  },
  {
    name: "dependency-injection-practice-with-es6-modules-and-http-server",
    projectType: "FRONTEND",
    isActiveDevelopmentGoingOn: false,
    projectLocation:
      "<ROOT>/unit-testing-playground/example-base-03/dependency-injection-practice-with-es6-modules-and-http-server",
    purpose: "",
    requiredFeatures: "",
    techStacksUsed: [TSProps.JavaScript],
    developmentHistory: "",
  },
  {
    name: "dependency-injection-practice-with-es6-modules-and-webpack-dev-server",
    projectType: "FRONTEND",
    isActiveDevelopmentGoingOn: false,
    projectLocation:
      "<ROOT>/unit-testing-playground/example-base-03/dependency-injection-practice-with-es6-modules-and-webpack-dev-server",
    purpose: "",
    requiredFeatures: "",
    techStacksUsed: [TSProps.JavaScript],
    developmentHistory: "",
  },
  {
    name: "nodejs-backend",
    projectType: "FRONTEND",
    isActiveDevelopmentGoingOn: false,
    projectLocation:
      "<ROOT>/unit-testing-playground/example-base-03/nodejs-backend",
    purpose: `
    A sample NodeJS project
      - It contains employee CRUD routes
      - No DB implementation here. All employee data hardcoded.
      - The data will reset on application start up
    `,
    requiredFeatures: "",
    techStacksUsed: [TSProps.JavaScript, TSProps.NodeJS],
    developmentHistory: "",
  },
  {
    name: "promise-practice",
    projectType: "FRONTEND",
    isActiveDevelopmentGoingOn: false,
    projectLocation:
      "<ROOT>/unit-testing-playground/example-base-03/promise-practice",
    purpose: `
    This project contains code for practicing promises, with help of JavaScript
    `,
    requiredFeatures: "",
    techStacksUsed: [TSProps.JavaScript],
    developmentHistory: "",
  },
  {
    name: "promise-practice-in-react",
    projectType: "FRONTEND",
    isActiveDevelopmentGoingOn: false,
    projectLocation:
      "<ROOT>/unit-testing-playground/example-base-03/promise-practice-in-react",
    purpose: `
    This project contains code for practicing promises, with help of JavaScript
    `,
    requiredFeatures: "",
    techStacksUsed: [TSProps.JavaScript],
    developmentHistory: "",
  },
  {
    name: "promise-practice-with-commonjs-webpack",
    projectType: "FRONTEND",
    isActiveDevelopmentGoingOn: false,
    projectLocation:
      "<ROOT>/unit-testing-playground/example-base-03/promise-practice-with-commonjs-webpack",
    purpose: `
    This project contains code for practicing promises, with help of JavaScript
    `,
    requiredFeatures: "",
    techStacksUsed: [TSProps.JavaScript],
    developmentHistory: "",
  },
  {
    name: "javascript-utility-unit-testing",
    projectType: "BACKEND",
    isActiveDevelopmentGoingOn: false,
    projectLocation:
      "<ROOT>/unit-testing-playground/example-base-04/javascript-utility-unit-testing",
    purpose: `
    This project contains code for practicing promises, with help of JavaScript
    `,
    requiredFeatures: "",
    techStacksUsed: [TSProps.JavaScript],
    developmentHistory: "",
  },
  {
    name: "jquery-TS-WebPack",
    projectType: "MONOLITHIC-WEB-APPLICATION",
    isActiveDevelopmentGoingOn: true,
    projectLocation:
      "<ROOT>/unit-testing-playground/example-base-03/jquery-TS-WebPack",
    purpose: "This project is created to learn JQuery with TypeScript",
    requiredFeatures: "",
    techStacksUsed: [TSProps.jQuery, TSProps.TypeScript],
    developmentHistory: "",
  },
  {
    name: "spring-boot-security-example",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/java-playground/spring-boot-security-example",
    isActiveDevelopmentGoingOn: true,
    purpose: "This project is created to learn Spring Security",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },
  {
    name: "servlet-examples",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/java-playground/servlet-examples",
    isActiveDevelopmentGoingOn: true,
    purpose: "This project is created to learn Servlet",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },
  {
    name: "multithreading-examples",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/java-playground/multithreading-examples",
    isActiveDevelopmentGoingOn: true,
    purpose: "This project is created to learn multithreading by examples",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },
  {
    name: "logic-implementation-and-testing/api",
    projectType: "BACKEND",
    projectLocation:
      "<ROOT>/java-playground/logic-implementation-and-testing/api",
    isActiveDevelopmentGoingOn: true,
    purpose:
      "This project is created to learn creating REST APIs with best practices",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },
  {
    name: "logic-implementation-and-testing/api-consumer",
    projectType: "BACKEND",
    projectLocation:
      "<ROOT>/java-playground/logic-implementation-and-testing/api-consumer",
    isActiveDevelopmentGoingOn: true,
    purpose:
      "This project is created to learn creating consumer of REST APIs with best practices",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },
  {
    name: "java-coding-practice",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/java-playground/java-coding-practice",
    isActiveDevelopmentGoingOn: true,
    purpose:
      "This project is created to learn java 8 coding practice by examples",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },
  {
    name: "examples-collated",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/examples-collated",
    isActiveDevelopmentGoingOn: true,
    purpose: "This project is created to learn java 8 examples-collated",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },
  {
    name: "batch-processing-large-datasets-spring",
    projectType: "BACKEND",
    projectLocation:
      "<ROOT>/MyTestPrograms/batch-processing-large-datasets-spring",
    isActiveDevelopmentGoingOn: false,
    purpose:
      "This project is created to learn java 8 - 'batch-processing-large-datasets-spring' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "BCE-MicroServices",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/BCE-MicroServices",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'BCE-MicroServices' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "BeerKayMultithreading",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/BeerKayMultithreading",
    isActiveDevelopmentGoingOn: false,
    purpose:
      "This project is created to learn java 8 - 'BeerKayMultithreading' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "boot-logging-file-example",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/boot-logging-file-example",
    isActiveDevelopmentGoingOn: false,
    purpose:
      "This project is created to learn java 8 - 'boot-logging-file-example' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "boot-primefaces-integration-example",
    projectType: "BACKEND",
    projectLocation:
      "<ROOT>/MyTestPrograms/boot-primefaces-integration-example",
    isActiveDevelopmentGoingOn: false,
    purpose:
      "This project is created to learn java 8 - 'boot-primefaces-integration-example' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "carousel-with-angularjs",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/carousel-with-angularjs",
    isActiveDevelopmentGoingOn: false,
    purpose:
      "This project is created to learn java 8 - 'carousel-with-angularjs' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "coding.ex",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/coding.ex",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'coding.ex' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "CommandLineRunner",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/CommandLineRunner",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'CommandLineRunner' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "consume.rest",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/consume.rest",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'consume.rest' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "cron-expression",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/cron-expression",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'cron-expression' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "CRUD Operation angular + eclipse App",
    projectType: "BACKEND",
    projectLocation:
      "<ROOT>/MyTestPrograms/CRUD Operation angular + eclipse App",
    isActiveDevelopmentGoingOn: false,
    purpose:
      "This project is created to learn java 8 - 'CRUD Operation angular + eclipse App' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "CRUD-Spring-Boot-JPA-MySQL",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/CRUD-Spring-Boot-JPA-MySQL",
    isActiveDevelopmentGoingOn: false,
    purpose:
      "This project is created to learn java 8 - 'CRUD-Spring-Boot-JPA-MySQL' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "download-using-streaming-response-body",
    projectType: "BACKEND",
    projectLocation:
      "<ROOT>/MyTestPrograms/download-using-streaming-response-body",
    isActiveDevelopmentGoingOn: false,
    purpose:
      "This project is created to learn java 8 - 'download-using-streaming-response-body' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "encryption-decryption",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/encryption-decryption",
    isActiveDevelopmentGoingOn: false,
    purpose:
      "This project is created to learn java 8 - 'encryption-decryption' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "EventLogging",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/EventLogging",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'EventLogging' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "Exporter",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/Exporter",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'Exporter' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "FileService",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/FileService",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'FileService' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "GettringReadyWithForm",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/GettringReadyWithForm",
    isActiveDevelopmentGoingOn: false,
    purpose:
      "This project is created to learn java 8 - 'GettringReadyWithForm' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "GitRepoFetch",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/GitRepoFetch",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'GitRepoFetch' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "Helper",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/Helper",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'Helper' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "helpers",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/helpers",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'helpers' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "hibTutorial",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/hibTutorial",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'hibTutorial' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "JdbcDdl",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/JdbcDdl",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'JdbcDdl' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "jdk8examples",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/jdk8examples",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'jdk8examples' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "jpa-mappings",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/jpa-mappings",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'jpa-mappings' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "JSF-Primeface",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/JSF-Primeface",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'JSF-Primeface' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "JSON-Web-Token",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/JSON-Web-Token",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'JSON-Web-Token' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "JSPFileManager",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/JSPFileManager",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'JSPFileManager' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "JspJstlTutorial",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/JspJstlTutorial",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'JspJstlTutorial' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "jspTut",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/jspTut",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'jspTut' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "JSTL",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/JSTL",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'JSTL' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "kafka-producer-consumer",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/kafka-producer-consumer",
    isActiveDevelopmentGoingOn: false,
    purpose:
      "This project is created to learn java 8 - 'kafka-producer-consumer' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "Log4JPackgSpecificLog",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/Log4JPackgSpecificLog",
    isActiveDevelopmentGoingOn: false,
    purpose:
      "This project is created to learn java 8 - 'Log4JPackgSpecificLog' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "Log4jRotation",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/Log4jRotation",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'Log4jRotation' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "Log4jTest",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/Log4jTest",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'Log4jTest' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "logback-with-springboot-config-master",
    projectType: "BACKEND",
    projectLocation:
      "<ROOT>/MyTestPrograms/logback-with-springboot-config-master",
    isActiveDevelopmentGoingOn: false,
    purpose:
      "This project is created to learn java 8 - 'logback-with-springboot-config-master' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "LoginSecurity",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/LoginSecurity",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'LoginSecurity' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "ManualValidation",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/ManualValidation",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'ManualValidation' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "methodfilteringinterceptor",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/methodfilteringinterceptor",
    isActiveDevelopmentGoingOn: false,
    purpose:
      "This project is created to learn java 8 - 'methodfilteringinterceptor' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "monitoring",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/monitoring",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'monitoring' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "MultiplicationApp-With-Params",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/MultiplicationApp-With-Params",
    isActiveDevelopmentGoingOn: false,
    purpose:
      "This project is created to learn java 8 - 'MultiplicationApp-With-Params' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "MyAgentServices4.5",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/MyAgentServices4.5",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'MyAgentServices4.5' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "MyTestPrograms",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/MyTestPrograms",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'MyTestPrograms' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "NoticingApplication",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/NoticingApplication",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'NoticingApplication' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "oneTouch",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/oneTouch",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'oneTouch' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "Online Education System MCA Java Project",
    projectType: "BACKEND",
    projectLocation:
      "<ROOT>/MyTestPrograms/Online Education System MCA Java Project",
    isActiveDevelopmentGoingOn: false,
    purpose:
      "This project is created to learn java 8 - 'Online Education System MCA Java Project' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "paginationservlet",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/paginationservlet",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'paginationservlet' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "parameterizinginterceptor",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/parameterizinginterceptor",
    isActiveDevelopmentGoingOn: false,
    purpose:
      "This project is created to learn java 8 - 'parameterizinginterceptor' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "ParentChildRelationsTopics",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/ParentChildRelationsTopics",
    isActiveDevelopmentGoingOn: false,
    purpose:
      "This project is created to learn java 8 - 'ParentChildRelationsTopics' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "ProjectManagementAndCurrentStatusTracker",
    projectType: "BACKEND",
    projectLocation:
      "<ROOT>/MyTestPrograms/ProjectManagementAndCurrentStatusTracker",
    isActiveDevelopmentGoingOn: false,
    purpose:
      "This project is created to learn java 8 - 'ProjectManagementAndCurrentStatusTracker' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "ReadExcel",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/ReadExcel",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'ReadExcel' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "reports",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/reports",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'reports' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "restapipool",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/restapipool",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'restapipool' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "Resume",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/Resume",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'Resume' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "resume-app",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/resume-app",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'resume-app' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "resume-fullstack",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/resume-fullstack",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'resume-fullstack' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "ShrimadBhagwatGeeta",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/ShrimadBhagwatGeeta",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'ShrimadBhagwatGeeta' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "ShriRamCharitManas",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/ShriRamCharitManas",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'ShriRamCharitManas' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "SimpleRMIExample",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/SimpleRMIExample",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'SimpleRMIExample' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "spring-boot-crud-operation",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/spring-boot-crud-operation",
    isActiveDevelopmentGoingOn: false,
    purpose:
      "This project is created to learn java 8 - 'spring-boot-crud-operation' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "spring-boot-curd",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/spring-boot-curd",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'spring-boot-curd' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "spring-boot-curd-mongo",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/spring-boot-curd-mongo",
    isActiveDevelopmentGoingOn: false,
    purpose:
      "This project is created to learn java 8 - 'spring-boot-curd-mongo' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "spring-boot-hibernate-crud-demo",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/spring-boot-hibernate-crud-demo",
    isActiveDevelopmentGoingOn: false,
    purpose:
      "This project is created to learn java 8 - 'spring-boot-hibernate-crud-demo' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "spring-boot-jsontodb",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/spring-boot-jsontodb",
    isActiveDevelopmentGoingOn: false,
    purpose:
      "This project is created to learn java 8 - 'spring-boot-jsontodb' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "spring-example",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/spring-example",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'spring-example' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "spring-scheduler-with-shedlock-master",
    projectType: "BACKEND",
    projectLocation:
      "<ROOT>/MyTestPrograms/spring-scheduler-with-shedlock-master",
    isActiveDevelopmentGoingOn: false,
    purpose:
      "This project is created to learn java 8 - 'spring-scheduler-with-shedlock-master' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "spring-security-login-form-database",
    projectType: "BACKEND",
    projectLocation:
      "<ROOT>/MyTestPrograms/spring-security-login-form-database",
    isActiveDevelopmentGoingOn: false,
    purpose:
      "This project is created to learn java 8 - 'spring-security-login-form-database' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "spring-security-login-form-database-annotation",
    projectType: "BACKEND",
    projectLocation:
      "<ROOT>/MyTestPrograms/spring-security-login-form-database-annotation",
    isActiveDevelopmentGoingOn: false,
    purpose:
      "This project is created to learn java 8 - 'spring-security-login-form-database-annotation' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "SpringBatchDemo",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/SpringBatchDemo",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'SpringBatchDemo' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "SpringBatchDemo1",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/SpringBatchDemo1",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'SpringBatchDemo1' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "springboot-docker-compose",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/springboot-docker-compose",
    isActiveDevelopmentGoingOn: false,
    purpose:
      "This project is created to learn java 8 - 'springboot-docker-compose' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "Springboot-Microservice",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/Springboot-Microservice",
    isActiveDevelopmentGoingOn: false,
    purpose:
      "This project is created to learn java 8 - 'Springboot-Microservice' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "swing-projects",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/swing-projects",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'swing-projects' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "TaskScheduler",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/TaskScheduler",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'TaskScheduler' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "TaskScheduler1",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/TaskScheduler1",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'TaskScheduler1' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "test-jar",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/test-jar",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'test-jar' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "TestMavenProj",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/TestMavenProj",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'TestMavenProj' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "vocab-khajana",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/vocab-khajana",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'vocab-khajana' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },

  {
    name: "web-test",
    projectType: "BACKEND",
    projectLocation: "<ROOT>/MyTestPrograms/web-test",
    isActiveDevelopmentGoingOn: false,
    purpose: "This project is created to learn java 8 - 'web-test' ",
    requiredFeatures: "",
    techStacksUsed: [TSProps.SpringBoot],
    developmentHistory: "",
  },
];

const checkDuplicateProjectLocations = (
  projects: PersonalProjectsSemiProcessedDataProps[]
) => {
  const locations = new Set<string>();
  const duplicatedLocations: { location: string; projectName: string }[] = [];

  for (const project of projects) {
    if (locations.has(project.projectLocation)) {
      duplicatedLocations.push({
        location: project.projectLocation,
        projectName: project.name,
      });
      // return true; // Duplicate found
    } else {
      locations.add(project.projectLocation);
    }
  }

  return {
    duplicateFound: duplicatedLocations.length > 0,
    duplicatedLocations,
  }; // No duplicates found
};

const getPersonalProjectsWithIdList = (): ProjectProps[] => {
  const duplicateLocationResult =
    checkDuplicateProjectLocations(personalProjects);
  if (duplicateLocationResult.duplicateFound) {
    throw new Error(
      `Locations for 2 or more projects can not be same: ${JSON.stringify(
        duplicateLocationResult.duplicatedLocations,
        null,
        2
      )}`
    );
  }
  return personalProjects.map((pp, idx) => ({
    ...pp,
    uniqueId: `id_${idx + 1}`,
    isPersonalProject: true,
    companyName: "Personal Project",
  }));
};

const personalProjectsWithIdList = getPersonalProjectsWithIdList();

export { personalProjectsWithIdList };
