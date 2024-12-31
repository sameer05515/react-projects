import DataSource, { Status } from "./SourceDetails.dto.js";

const defaultOwnerName = "Premendra Kumar";

const internalDataSourceArr = [
  DataSource.fromObject({
    sourceName: "my-pages",
    status: Status.IN_USE,
    sourceType: "GitHub Repository",
    location: "https://github.com/sameer05515/my-pages",
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    Contains HTML code, some old angularjs pages, <br/>

    We have also created some new HTML with newer ES6 syntax
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),

  /**
   *
   * "https://github.com/sameer05515/react-projects" repository and its sub-projects == start
   *
   */
  DataSource.fromObject({
    sourceName: "react-projects",
    status: Status.IN_USE,
    sourceType: "GitHub Repository",
    location: "https://github.com/sameer05515/react-projects",
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    1. To learn working with reactjs in various ways:-
      - using CRA
      - using vite
      - using nextjs
    2. Learn to create reactjs library projects
    3. Learn to create unit tests for frontend reactjs project.
    `,
    criticality: "High",
    notes: "Archived repository",
  }),

  DataSource.fromObject({
    sourceName: "builderbook",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/builderbook`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "calculator",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/calculator`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "coreui-free-react-admin-template",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/coreui-free-react-admin-template`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "Interview-questions-metadata",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/Interview-questions-metadata`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "jodit-react",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/jodit-react`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "learn-react",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),

  DataSource.fromObject({
    sourceName: "01-starting-project",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/01-starting-project`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "blank-project",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/blank-project`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "ChatApp",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/ChatApp`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "common-components",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/common-components`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "diff-app",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/diff-app`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "dynamic-form-generation-proj",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/dynamic-form-generation-proj`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "fa-search-react",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/fa-search-react`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "GQL-Demo",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/GQL-Demo`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "graphql-full-course",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/graphql-full-course`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "interview-companies-info",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/interview-companies-info`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "learn-to-add-arrows-between-divs",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/learn-to-add-arrows-between-divs`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "my-http-example",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/my-http-example`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "my-library-testing-vite-ts-lib-imported-in-js-proj",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/my-library-testing-vite-ts-lib-imported-in-js-proj`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "my-resume-vite-app",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/my-resume-vite-app`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-draggable-example",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/react-draggable-example`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-express-mysql",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/react-express-mysql`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-fetch-rxjs-hook",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/react-fetch-rxjs-hook`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-markdown-blog",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/react-markdown-blog`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-redux",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/react-redux`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-redux-toolkit-tutorial",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/react-redux-toolkit-tutorial`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-router-bootstrap-project",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/react-router-bootstrap-project`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-rtk-query-fetch-demo",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/react-rtk-query-fetch-demo`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-rxjs-pagination-example",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/react-rxjs-pagination-example`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-silver-price-chart",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/react-silver-price-chart`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-ts-basics",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/react-ts-basics`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-with-ts-ex1",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/react-with-ts-ex1`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "redux-toolkit-example-crud",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/redux-toolkit-example-crud`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "rest-service-consumer",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/rest-service-consumer`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "resume-application",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/resume-application`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "rxjs_react_chat",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/rxjs_react_chat`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "Section-03-01-starting-setup",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/Section-03-01-starting-setup`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "section-06-01-starting-project",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/section-06-01-starting-project`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "tasks-mgmt",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/tasks-mgmt`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "TweetApp",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/TweetApp`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "next-gen-js-summary.pdf",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/next-gen-js-summary.pdf`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "Readme.md",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react/Readme.md`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),

  DataSource.fromObject({
    sourceName: "learn-react-and-next-ts",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react-and-next-ts`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "next-ts-basics",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react-and-next-ts/next-ts-basics`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),

  DataSource.fromObject({
    sourceName: "spp-tweet-app-with-next-ts",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-react-and-next-ts/spp-tweet-app-with-next-ts`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),

  DataSource.fromObject({
    sourceName: "learn-to-create-react-library",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-create-react-library`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),

  DataSource.fromObject({
    sourceName: "react-js-library-test",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-create-react-library/react-js-library-test`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-js-library-with-vite",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-create-react-library/react-js-library-with-vite`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-js-library-with-vite-playground",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-create-react-library/react-js-library-with-vite-playground`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-js-library-with-vite-receter-template",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-create-react-library/react-js-library-with-vite-receter-template`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-js-library-with-vite-receter-template-playground",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-create-react-library/react-js-library-with-vite-receter-template-playground`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-storybook-v6",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-create-react-library/react-storybook-v6`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-ts-library-test",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-create-react-library/react-ts-library-test`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-ts-library-with-rollup",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-create-react-library/react-ts-library-with-rollup`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-ts-library-with-rollup-playground",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-create-react-library/react-ts-library-with-rollup-playground`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-ts-library-with-vite",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-create-react-library/react-ts-library-with-vite`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-ts-library-with-vite-playground",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-create-react-library/react-ts-library-with-vite-playground`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "Dev.To.ReactComponentLibraryPublication.md",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-create-react-library/Dev.To.ReactComponentLibraryPublication.md`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "React-story-book-tutorial.md",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-create-react-library/React-story-book-tutorial.md`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "readme.md",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-create-react-library/readme.md`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "storybook-version-history.md",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-create-react-library/storybook-version-history.md`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "learn-to-create-utility-library",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-create-utility-library`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),

  DataSource.fromObject({
    sourceName: "ts-library-with-vite",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-create-utility-library/ts-library-with-vite`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "Readme.md",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-create-utility-library/Readme.md`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),

  DataSource.fromObject({
    sourceName: "learn-to-test-react-components",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-test-react-components`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),

  DataSource.fromObject({
    sourceName: "CRA-react-unit-testing-ghulamabbas2",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-test-react-components/CRA-react-unit-testing-ghulamabbas2`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "jest-crashcourse-by-laith-academy",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-test-react-components/jest-crashcourse-by-laith-academy`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "jest-mock-vs-spy-mohokh67",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-test-react-components/jest-mock-vs-spy-mohokh67`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-testing-tutorial-js-cra-silver-price-chart-with-codevolution",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-test-react-components/react-testing-tutorial-js-cra-silver-price-chart-with-codevolution`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-testing-tutorial-ts-cra-with-codevolution",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-test-react-components/react-testing-tutorial-ts-cra-with-codevolution`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-testing-tutorial-ts-vite-with-codevolution",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-test-react-components/react-testing-tutorial-ts-vite-with-codevolution`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-unit-testing-library-with-vitest-and-ts",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-test-react-components/react-unit-testing-library-with-vitest-and-ts`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "tdd-in-react-router-with-ts-shoaibbhimani",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-test-react-components/tdd-in-react-router-with-ts-shoaibbhimani`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "testing-express-server-with-jest",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-test-react-components/testing-express-server-with-jest`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "testing-javascript-web-dev-simplified-with-jest",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-test-react-components/testing-javascript-web-dev-simplified-with-jest`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "unit-testing-library-with-vitest-and-js",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-test-react-components/unit-testing-library-with-vitest-and-js`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "unit-testing-with-ts-and-jest-ghulamabbas2",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-test-react-components/unit-testing-with-ts-and-jest-ghulamabbas2`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "Common-Error-Warnings-And-Troubleshooting.md",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-test-react-components/Common-Error-Warnings-And-Troubleshooting.md`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "jest-companion-and-alternatives.md",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-test-react-components/jest-companion-and-alternatives.md`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "Readme.md",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-test-react-components/Readme.md`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),

  DataSource.fromObject({
    sourceName: "learn-to-use-material-ui",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/learn-to-use-material-ui`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "node-service-frontend",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/node-service-frontend`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "problem-mgmt-nosql-frontend",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/problem-mgmt-nosql-frontend`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-complete-guide",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/react-complete-guide`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-draft-wysiwyg-test",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/react-draft-wysiwyg-test`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-inner-scroll",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/react-inner-scroll`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-list-component",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/react-list-component`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "react-playground",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/react-playground`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "recursive-react-tree",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/recursive-react-tree`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "Tree-Data-raversal-In-TS",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/Tree-Data-raversal-In-TS`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "typecript-play",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/typecript-play`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "typescript-compiler-play",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/typescript-compiler-play`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "typescript-edwin-diaz-1",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/typescript-edwin-diaz-1`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "webpack-and-typescript-coding-ninza-lesson-6",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/webpack-and-typescript-coding-ninza-lesson-6`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "webpak-typescript-coding-ninza",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/webpak-typescript-coding-ninza`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "documentation.md",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/documentation.md`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "key-terminologies.md",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/key-terminologies.md`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "React-Optimization-Tips.md",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/React-Optimization-Tips.md`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "Readme.md",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/Readme.md`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "references.md",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/references.md`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),
  DataSource.fromObject({
    sourceName: "version-details.md",
    status: Status.NOT_IN_USE,
    sourceType: "Project",
    location: `https://github.com/sameer05515/react-projects/version-details.md`,
    repositoryOrDbName: "repo",
    lastModified: "27/Jan/2025",
    owner: defaultOwnerName,
    purpose: `
    TBD    
    `,
    criticality: "Medium",
    notes: "Archived repository",
  }),

  /**
   *
   * "https://github.com/sameer05515/react-projects" repository and its sub-projects == end
   *
   */

  /**
   *
   * Repository data separator ==========================================================================
   *
   *
   */

  // DataSource.fromObject({
  //   sourceName: "GitHub Repo ABC",
  //   status: Status.NOT_IN_USE,
  //   sourceType: "GitHub Repository",
  //   location: "https://github.com/user/repo",
  //   repositoryOrDbName: "repo",
  //   lastModified: "27/Jan/2025",
  //   owner: defaultOwnerName,
  //   purpose: "Codebase Backup",
  //   criticality: "Medium",
  //   notes: "Archived repository",
  // }),

  // DataSource.fromObject({
  //   sourceName: "GitHub Repo ABC",
  //   status: Status.NOT_IN_USE,
  //   sourceType: "GitHub Repository",
  //   location: "https://github.com/user/repo",
  //   repositoryOrDbName: "repo",
  //   lastModified: "27/Jan/2025",
  //   owner: defaultOwnerName,
  //   purpose: "Codebase Backup",
  //   criticality: "Medium",
  //   notes: "Archived repository",
  // }),

  // DataSource.fromObject({
  //   sourceName: "GitHub Repo ABC",
  //   status: Status.NOT_IN_USE,
  //   sourceType: "GitHub Repository",
  //   location: "https://github.com/user/repo",
  //   repositoryOrDbName: "repo",
  //   lastModified: "27/Jan/2025",
  //   owner: defaultOwnerName,
  //   purpose: "Codebase Backup",
  //   criticality: "Medium",
  //   notes: "Archived repository",
  // }),
];

/**
 *
 * ===========  SANITIZATION AND EXPORT OF DATA. =========
 *
 *
 */

const sanitizeDataBeforeExport = (todosArr) => {
  return (
    todosArr
      /**
       * This filter is fix for removing all to-dos, which has name empty-trimmed string.
       *
       * Explaination of todo containing empty-trimmed string:
       *  - Since we are currently manually creating to-dos, so to save some time have put some extra `placeholder` tods, which we are filtering, in sanitization
       *
       * Logic is: if a todo is closed, then it will be treated as groomed, despite any value saved in database.
       * */
      .filter((d) => d.sourceName && d.sourceName.trim())
      .map((d) => ({
        ...d,
        /**
         *
         * This section of code just copied from Todo data.js as-it-is. This we are retaining for future purpose only.
         * */
        // hasGroomed: d.hasGroomed === true || d.status === Status.CLOSED,
      }))
  );
};

const myDataSources = sanitizeDataBeforeExport(internalDataSourceArr);

export { myDataSources };
