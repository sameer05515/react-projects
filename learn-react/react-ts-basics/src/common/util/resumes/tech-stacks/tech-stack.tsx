import { ValidationError } from "../../responses/responses";
import { hasDuplicateKeys } from "../../utils";
import { TechStacks } from "../initial-records";
import { TechStackKeyBroaderTopics } from "./tech-stack-key-broader-topics";
import { TechStackVersionHistory } from "./tech-stack-version-history";

interface TechStackBasicDetails {
  name: string;
  initiallyLaunchedOn: string;
}

const ProjectBasicDetails: Record<string, TechStackBasicDetails> = {
  [TechStacks.JAVA]: { name: "JAVA", initiallyLaunchedOn: "23-May-1995" },
  [TechStacks.Java8Plus]: {
    name: "Java8Plus",
    initiallyLaunchedOn: "18-Mar-2014",
  },
  [TechStacks.SpringBoot]: {
    name: "SpringBoot",
    initiallyLaunchedOn: "01-Apr-2014",
  },
  [TechStacks.Spring]: { name: "Spring", initiallyLaunchedOn: "01-Oct-2002" },
  [TechStacks.JDBC]: { name: "JDBC", initiallyLaunchedOn: "19-Feb-1997" },
  [TechStacks.JasperReports]: {
    name: "JasperReports",
    initiallyLaunchedOn: "06-Nov-2001",
  },
  [TechStacks.Junit]: { name: "JUnit", initiallyLaunchedOn: "26-Feb-1998" },
  [TechStacks.Swing]: { name: "Swing", initiallyLaunchedOn: "23-Apr-1997" },
  [TechStacks.J2ee_jee]: {
    name: "J2EE/JEE",
    initiallyLaunchedOn: "12-Dec-1999",
  },
  [TechStacks.JSP]: { name: "JSP", initiallyLaunchedOn: "01-Jan-1999" },
  [TechStacks.Servlets]: {
    name: "Servlets",
    initiallyLaunchedOn: "29-Jun-1997",
  },
  [TechStacks.Hibernate]: {
    name: "Hibernate",
    initiallyLaunchedOn: "01-Jan-2001",
  },

  [TechStacks.ReactJS]: { name: "ReactJS", initiallyLaunchedOn: "29-May-2013" },
  [TechStacks.NextJS]: { name: "NextJS", initiallyLaunchedOn: "25-Oct-2016" },
  [TechStacks.JavaScript]: {
    name: "JavaScript",
    initiallyLaunchedOn: "04-Dec-1995",
  },
  [TechStacks.EcmaScript]: {
    name: "EcmaScript",
    initiallyLaunchedOn: "01-Jun-1997",
  },
  [TechStacks.TypeScript]: {
    name: "TypeScript",
    initiallyLaunchedOn: "01-Oct-2012",
  },
  [TechStacks.Ajax]: { name: "Ajax", initiallyLaunchedOn: "18-Feb-2005" },
  [TechStacks.CSS]: { name: "CSS", initiallyLaunchedOn: "17-Dec-1996" },
  [TechStacks.HTML]: { name: "HTML", initiallyLaunchedOn: "25-Dec-1990" },

  [TechStacks.Microservices]: {
    name: "Microservices",
    initiallyLaunchedOn: "",
  },
  [TechStacks.Docker]: { name: "Docker", initiallyLaunchedOn: "20-Mar-2013" },
  [TechStacks.Kubernetes]: {
    name: "Kubernetes",
    initiallyLaunchedOn: "07-Jun-2014",
  },
  [TechStacks.Maven]: { name: "Maven", initiallyLaunchedOn: "13-Jul-2004" },
  [TechStacks.Gradle]: { name: "Gradle", initiallyLaunchedOn: "01-Apr-2009" },
  [TechStacks.Ant]: { name: "Ant", initiallyLaunchedOn: "19-Jul-2000" },
  [TechStacks.ApplicationServer]: {
    name: "ApplicationServer",
    initiallyLaunchedOn: "",
  },
  [TechStacks.Tomcat]: { name: "Tomcat", initiallyLaunchedOn: "01-Mar-1999" },
  [TechStacks.Weblogic]: {
    name: "Weblogic",
    initiallyLaunchedOn: "01-Jan-1998",
  },
  [TechStacks.Websphere]: {
    name: "Websphere",
    initiallyLaunchedOn: "01-Jun-1998",
  },
  [TechStacks.Database]: { name: "Database", initiallyLaunchedOn: "" },
  [TechStacks.RelationalDatabases]: {
    name: "RelationalDatabases",
    initiallyLaunchedOn: "",
  },
  [TechStacks.MySQL]: { name: "MySQL", initiallyLaunchedOn: "23-May-1995" },
  [TechStacks.NoSQLDatabases]: {
    name: "NoSQLDatabases",
    initiallyLaunchedOn: "",
  },
  [TechStacks.MongoDB]: { name: "MongoDB", initiallyLaunchedOn: "11-Feb-2009" },
  [TechStacks.VersionControl]: {
    name: "Version Control",
    initiallyLaunchedOn: "",
  },
  [TechStacks.CVS]: { name: "CVS", initiallyLaunchedOn: "19-Jun-1986" },
  [TechStacks.SVN]: { name: "SVN", initiallyLaunchedOn: "01-Feb-2000" },
  [TechStacks.GIT]: { name: "GIT", initiallyLaunchedOn: "07-Apr-2005" },
  [TechStacks.GitHub]: { name: "GitHub", initiallyLaunchedOn: "10-Apr-2008" },
  [TechStacks.BitBucket]: {
    name: "BitBucket",
    initiallyLaunchedOn: "01-Sep-2008",
  },
  [TechStacks.GitLab]: { name: "GitLab", initiallyLaunchedOn: "01-Oct-2011" },
};
const techStackIsKindOf: Record<string, string[]> = {
  [TechStacks.RelationalDatabases]: [TechStacks.Database],
  [TechStacks.NoSQLDatabases]: [TechStacks.Database],

  [TechStacks.CVS]: [TechStacks.VersionControl],
  [TechStacks.SVN]: [TechStacks.VersionControl],
  [TechStacks.GIT]: [TechStacks.VersionControl],
};

const techStackDependsOn: Record<string, string[]> = {
  [TechStacks.JAVA]: [],
  [TechStacks.Java8Plus]: [TechStacks.JAVA],
  [TechStacks.SpringBoot]: [
    TechStacks.JAVA,
    TechStacks.Spring,
    TechStacks.Java8Plus,
  ],
  [TechStacks.Spring]: [TechStacks.JAVA],

  [TechStacks.ReactJS]: [TechStacks.JavaScript],
  [TechStacks.NextJS]: [TechStacks.ReactJS, TechStacks.JavaScript],
  [TechStacks.JavaScript]: [],
  [TechStacks.EcmaScript]: [TechStacks.JavaScript],
  [TechStacks.TypeScript]: [TechStacks.JavaScript, TechStacks.EcmaScript],

  [TechStacks.Microservices]: [
    TechStacks.SpringBoot,
    TechStacks.Docker,
    TechStacks.Kubernetes,
  ],
  [TechStacks.Docker]: [],
  [TechStacks.Kubernetes]: [TechStacks.Docker],

  [TechStacks.Maven]: [TechStacks.JAVA],
  [TechStacks.Gradle]: [TechStacks.JAVA],
  [TechStacks.Ant]: [TechStacks.JAVA],

  [TechStacks.ApplicationServer]: [TechStacks.JAVA],
  [TechStacks.Tomcat]: [TechStacks.ApplicationServer],
  [TechStacks.Weblogic]: [TechStacks.ApplicationServer],
  [TechStacks.Websphere]: [TechStacks.ApplicationServer],

  [TechStacks.Database]: [],
  [TechStacks.RelationalDatabases]: [TechStacks.Database],
  [TechStacks.MySQL]: [TechStacks.RelationalDatabases],
  [TechStacks.NoSQLDatabases]: [TechStacks.Database],
  [TechStacks.MongoDB]: [TechStacks.NoSQLDatabases],

  [TechStacks.VersionControl]: [],
  [TechStacks.CVS]: [TechStacks.VersionControl],
  [TechStacks.SVN]: [TechStacks.VersionControl],
  [TechStacks.GIT]: [TechStacks.VersionControl],
  [TechStacks.GitHub]: [TechStacks.GIT],
  [TechStacks.BitBucket]: [TechStacks.GIT],
  [TechStacks.GitLab]: [TechStacks.GIT],
};

interface TechStackData {
  uniqueId: string;
  name: string;
  initiallyLaunchedOn: string;
  dependsOn: string[];
  kindOf: string[];
  versionHistory: string;
  keyBroaderTopics:string;
}

const prepareData = (): TechStackData[] => {
  return Object.entries(TechStacks).map(([_, uniqueId]) => {
    const data: TechStackData = {
      uniqueId: uniqueId,
      // name: key,
      ...ProjectBasicDetails[uniqueId],
      dependsOn: techStackDependsOn[uniqueId] || [],
      kindOf: techStackIsKindOf[uniqueId] || [],
      versionHistory: TechStackVersionHistory[uniqueId],
      keyBroaderTopics:TechStackKeyBroaderTopics[uniqueId]
    };
    return data;
  });
};

interface TechStackResponse {
  success: boolean;
  data: TechStackData[] | null;
  messages: string[];
}

export const getAllTechStacks = (): TechStackResponse => {
  let computedTechStacks: TechStackData[] = [];
  try {
    const hasDuplicateKeysResponse = hasDuplicateKeys(TechStacks);
    if (hasDuplicateKeysResponse.isError) {
      throw new ValidationError(
        "Found duplicate keys.",
        hasDuplicateKeysResponse.messages
      );
    }

    computedTechStacks = prepareData();

    return { success: true, data: computedTechStacks, messages: [] };
  } catch (e) {
    if (e instanceof ValidationError) {
      return { success: false, data: null, messages: e.data };
    }
    return {
      success: false,
      data: null,
      messages: ["Unknown error occurred."],
    };
  }
};

export const getTemplate = () => {
  let str = "";
  str = Object.keys(TechStacks).reduce((acc, key) => {
    // acc =
    //   acc +
    //   "\n" +
    //   `[TechStacks.${key}]: {name:'${key}]',initiallyLaunchedOn:''},`;
    acc = acc + "\n" + `[TechStacks.${key}]: '',`;
    return acc;
  }, str);
  return `{\n ${str} \n}`;
};
