# `learn-react` project catalog

Every row is a **distinct codebase** under [learn-react/](../). Use the **Run from** path for `npm install` (or the documented command for that stack). A **README** link is included when a dedicated readme exists at project or app level.

**Legend:** CRA = Create React App (`react-scripts`). Paths are relative to `learn-react/`.

---

## Course starters and practice (Academind / generic CRA)


| Project                                                              | Run from                          | Stack                       | Focus                                                       |
| -------------------------------------------------------------------- | --------------------------------- | --------------------------- | ----------------------------------------------------------- |
| [01-starting-project](../01-starting-project/)                       | `01-starting-project/`            | CRA                         | Early course / starter exercises.                           |
| [Section-03-01-starting-setup](../Section-03-01-starting-setup/)     | `Section-03-01-starting-setup/`   | CRA                         | Section 3 starter.                                          |
| [section-06-01-starting-project](../section-06-01-starting-project/) | `section-06-01-starting-project/` | CRA                         | Section 6 starter.                                          |
| [react-complete-guide](../react-complete-guide/)                     | `react-complete-guide/`           | CRA (older `react-scripts`) | Legacy Academind CRA template; compare with newer starters. |
| [blank-project](../blank-project/)                                   | `blank-project/`                  | CRA                         | Minimal CRA baseline.                                       |
| [react-playground](../react-playground/)                             | `react-playground/`               | CRA                         | General experiments.                                        |


Related study notes and links: [Readme.md](../Readme.md) (hooks, effects, context, fragments, etc.).

---

## State management: Redux & RTK


| Project                                                                                          | Run from                                        | Stack                     | Focus                                                                                          |
| ------------------------------------------------------------------------------------------------ | ----------------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------- |
| [redux-toolkit-example-crud](../redux-toolkit-example-crud/)                                     | `redux-toolkit-example-crud/`                   | CRA                       | Redux Toolkit CRUD-style example. [README](../redux-toolkit-example-crud/README.md)            |
| [react-redux-toolkit-tutorial](../react-redux-toolkit-tutorial/)                                 | `react-redux-toolkit-tutorial/`                 | CRA                       | RTK tutorial walkthrough. [README](../react-redux-toolkit-tutorial/README.md)                  |
| [react-redux/redux-toolkit-example-crud-hooks](../react-redux/redux-toolkit-example-crud-hooks/) | `react-redux/redux-toolkit-example-crud-hooks/` | CRA                       | CRUD with hooks + RTK. [README](../react-redux/redux-toolkit-example-crud-hooks/README.md)     |
| [react-rtk-query-fetch-demo](../react-rtk-query-fetch-demo/)                                     | `react-rtk-query-fetch-demo/`                   | CRA                       | RTK Query data fetching. [README](../react-rtk-query-fetch-demo/README.md)                     |
| [react-redux/spring-boot-data-jpa-mysql](../react-redux/spring-boot-data-jpa-mysql/)             | `react-redux/spring-boot-data-jpa-mysql/`       | Spring Boot + JPA + MySQL | Backend pairing for Redux demos. [README](../react-redux/spring-boot-data-jpa-mysql/README.md) |


---

## GraphQL


| Project                                                          | Run from                        | Stack                     | Focus                                                                           |
| ---------------------------------------------------------------- | ------------------------------- | ------------------------- | ------------------------------------------------------------------------------- |
| [GQL-Demo/graphql-sum-app](../GQL-Demo/graphql-sum-app/)         | `GQL-Demo/graphql-sum-app/`     | CRA                       | React client for sum demo. [README](../GQL-Demo/graphql-sum-app/README.md)      |
| [GQL-Demo/graphql-sum-numbers](../GQL-Demo/graphql-sum-numbers/) | `GQL-Demo/graphql-sum-numbers/` | Express + express-graphql | GraphQL API server (`npm start`).                                               |
| [graphql-full-course/client](../graphql-full-course/client/)     | `graphql-full-course/client/`   | Snowpack + Apollo Client  | Client from full-course repo. [README](../graphql-full-course/client/README.md) |
| [graphql-full-course/server](../graphql-full-course/server/)     | `graphql-full-course/server/`   | Node                      | Companion server (see server docs/scripts).                                     |


---

## HTTP, REST, and service consumers


| Project                                                                    | Run from                             | Stack | Focus                                                                         |
| -------------------------------------------------------------------------- | ------------------------------------ | ----- | ----------------------------------------------------------------------------- |
| [my-http-example](../my-http-example/)                                     | `my-http-example/`                   | CRA   | Calling HTTP APIs from React. [README](../my-http-example/README.md)          |
| [rest-service-consumer/frontend](../rest-service-consumer/frontend/)       | `rest-service-consumer/frontend/`    | CRA   | fetch / axios patterns. [README](../rest-service-consumer/frontend/README.md) |
| [rest-service-consumer/backend](../rest-service-consumer/backend/)         | `rest-service-consumer/backend/`     | Node  | Sample API for consumer.                                                      |
| [rest-service-consumer/api-testing](../rest-service-consumer/api-testing/) | `rest-service-consumer/api-testing/` | Node  | API testing utilities.                                                        |
| [react-fetch-rxjs-hook](../react-fetch-rxjs-hook/)                         | `react-fetch-rxjs-hook/`             | CRA   | RxJS + fetch hook pattern.                                                    |


---

## RxJS and real-time style demos


| Project                                                            | Run from                         | Stack | Focus                                                                      |
| ------------------------------------------------------------------ | -------------------------------- | ----- | -------------------------------------------------------------------------- |
| [rxjs_react_chat](../rxjs_react_chat/)                             | `rxjs_react_chat/`               | CRA   | Chat-style RxJS usage. [README](../rxjs_react_chat/README.md)              |
| [react-rxjs-pagination-example](../react-rxjs-pagination-example/) | `react-rxjs-pagination-example/` | CRA   | Pagination with RxJS. [README](../react-rxjs-pagination-example/README.md) |


---

## Routing, layout, and UI kits


| Project                                                                  | Run from                            | Stack           | Focus                                                                              |
| ------------------------------------------------------------------------ | ----------------------------------- | --------------- | ---------------------------------------------------------------------------------- |
| [react-router-bootstrap-project](../react-router-bootstrap-project/)     | `react-router-bootstrap-project/`   | CRA + Bootstrap | React Router + Bootstrap UI. [README](../react-router-bootstrap-project/README.md) |
| [coreui-free-react-admin-template](../coreui-free-react-admin-template/) | `coreui-free-react-admin-template/` | CRA + CoreUI    | Admin dashboard template. [README](../coreui-free-react-admin-template/README.md)  |


---

## Full-stack and larger applications


| Project                                                                                                                                  | Run from                                                            | Stack                       | Focus                                                                                                      |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| [TweetApp](../TweetApp/)                                                                                                                 | *see subfolders*                                                    | Multi                       | Large multi-frontend + multi-backend app. [TWEETAPP-OVERVIEW.md](./TWEETAPP-OVERVIEW.md)                   |
| [builderbook](../builderbook/)                                                                                                           | `builderbook/builderbook/` (main app) or `book/`* (chapters)        | Next.js + Express + MUI     | Open-source book publishing SaaS; chapter snapshots in `book/`. [README](../builderbook/README.md)         |
| [ChatApp/my-chat-app-gui](../ChatApp/my-chat-app-gui/)                                                                                   | `ChatApp/my-chat-app-gui/`                                          | CRA                         | Chat GUI. [README](../ChatApp/my-chat-app-gui/README.md)                                                   |
| [ChatApp/my-chat-app-backend/websocket-api](../ChatApp/my-chat-app-backend/websocket-api/)                                               | `ChatApp/my-chat-app-backend/websocket-api/`                        | Node                        | WebSocket API for chat.                                                                                    |
| [tasks-mgmt/my-tasks](../tasks-mgmt/my-tasks/)                                                                                           | `tasks-mgmt/my-tasks/`                                              | CRA                         | Tasks UI. [README](../tasks-mgmt/my-tasks/README.md)                                                       |
| [tasks-mgmt/TasksRest](../tasks-mgmt/TasksRest/)                                                                                         | `tasks-mgmt/TasksRest/`                                             | Express + Mongoose          | REST API for tasks.                                                                                        |
| [dynamic-form-generation-proj/frontend/dynamic-form-generator-gui](../dynamic-form-generation-proj/frontend/dynamic-form-generator-gui/) | `dynamic-form-generation-proj/frontend/dynamic-form-generator-gui/` | CRA                         | Dynamic forms GUI. [README](../dynamic-form-generation-proj/frontend/dynamic-form-generator-gui/README.md) |
| [react-express-mysql](../react-express-mysql/)                                                                                           | `react-express-mysql/`                                              | Express + Sequelize + MySQL | Integrated React + REST + DB sample. [README](../react-express-mysql/README.md)                            |


---

## Rich text, markdown, and shared components


| Project                                                  | Run from                    | Stack           | Focus                                                                                             |
| -------------------------------------------------------- | --------------------------- | --------------- | ------------------------------------------------------------------------------------------------- |
| [react-draft-wysiwyg-test](../react-draft-wysiwyg-test/) | `react-draft-wysiwyg-test/` | CRA             | Draft.js–based WYSIWYG. [README](../react-draft-wysiwyg-test/README.md)                           |
| [jodit-react](../jodit-react/)                           | `jodit-react/`              | Library package | Jodit editor integration (build/publish workflow). [README](../jodit-react/README.md)             |
| [common-components](../common-components/)               | `common-components/`        | Webpack bundle  | Shared React components (e.g. WYSIWYG); `npm run build`. [Readme](../common-components/Readme.md) |
| [react-markdown-blog](../react-markdown-blog/)           | `react-markdown-blog/`      | CRA             | Markdown-oriented blog sample. [README](../react-markdown-blog/README.md)                         |


---

## TypeScript, Vite, and tooling


| Project                                                                                                      | Run from                                              | Stack             | Focus                                                                                                     |
| ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- | ----------------- | --------------------------------------------------------------------------------------------------------- |
| [react-ts-basics](../react-ts-basics/)                                                                       | `react-ts-basics/`                                    | Vite + React + TS | TS component patterns. [README](../react-ts-basics/README.md)                                             |
| [jsx-renderer](../jsx-renderer/)                                                                             | `jsx-renderer/`                                       | Vite              | JSX rendering experiments. [README](../jsx-renderer/README.md)                                            |
| [my-resume-vite-app](../my-resume-vite-app/)                                                                 | `my-resume-vite-app/`                                 | Vite              | Resume site. [README](../my-resume-vite-app/README.md)                                                    |
| [my-library-testing-vite-ts-lib-imported-in-js-proj](../my-library-testing-vite-ts-lib-imported-in-js-proj/) | `my-library-testing-vite-ts-lib-imported-in-js-proj/` | Vite              | Consume TS library from JS app. [README](../my-library-testing-vite-ts-lib-imported-in-js-proj/README.md) |
| [react-with-ts-ex1](../react-with-ts-ex1/)                                                                   | `react-with-ts-ex1/`                                  | TypeScript CLI    | `npm run compile-ts` only—no SPA dev server.                                                              |


---

## Small focused demos


| Project                                                                  | Run from                            | Stack       | Focus                                                                                           |
| ------------------------------------------------------------------------ | ----------------------------------- | ----------- | ----------------------------------------------------------------------------------------------- |
| [calculator](../calculator/)                                             | `calculator/`                       | CRA         | Calculator UI. [README](../calculator/README.md)                                                |
| [diff-app](../diff-app/)                                                 | `diff-app/`                         | CRA         | Diff visualization. [README](../diff-app/README.md)                                             |
| [fa-search-react](../fa-search-react/)                                   | `fa-search-react/`                  | CRA         | Font Awesome search demo. [README](../fa-search-react/README.md)                                |
| [react-draggable-example](../react-draggable-example/)                   | `react-draggable-example/`          | CRA         | Drag-and-drop. [README](../react-draggable-example/README.md)                                   |
| [react-inner-scroll](../react-inner-scroll/)                             | `react-inner-scroll/`               | CRA (older) | Inner scroll layouts. [README](../react-inner-scroll/README.md)                                 |
| [learn-to-add-arrows-between-divs](../learn-to-add-arrows-between-divs/) | `learn-to-add-arrows-between-divs/` | CRA         | Connecting UI nodes with arrows. [README](../learn-to-add-arrows-between-divs/README.md)        |
| [recursive-react-tree](../recursive-react-tree/)                         | `recursive-react-tree/`             | CRA         | Recursive tree rendering. [README](../recursive-react-tree/README.md)                           |
| [react-list-component](../react-list-component/)                         | `react-list-component/`             | CRA         | List UI patterns. [README](../react-list-component/README.md)                                   |
| [react-silver-price-chart](../react-silver-price-chart/)                 | `react-silver-price-chart/`         | CRA         | Chart demo (often used with testing tutorials). [README](../react-silver-price-chart/README.md) |


---

## Data, resumes, and misc


| Project                                                  | Run from                    | Stack | Focus                                                                       |
| -------------------------------------------------------- | --------------------------- | ----- | --------------------------------------------------------------------------- |
| [resume-application](../resume-application/)             | `resume-application/`       | CRA   | Resume builder app. [README](../resume-application/README.md)               |
| [interview-companies-info](../interview-companies-info/) | `interview-companies-info/` | CRA   | Company/interview notes UI. [README](../interview-companies-info/README.md) |


---

## Maintenance tips

- **Dependencies age:** Older `react-scripts` (3.x, 4.x, 1.x) may report vulnerabilities; treat samples as learning artifacts unless you plan to upgrade.
- **Multiple ports:** If `3000` is taken, use the PORT env pattern documented in [Readme.md](../Readme.md) or each tool’s CLI flags.
- **Parent workspace:** For how `learn-react` fits next to `project-munshi`, testing folders, etc., see [WORKSPACE-OVERVIEW.md](../../docs/WORKSPACE-OVERVIEW.md).

---

## Doc index (this folder)


| File                                           | Purpose                                 |
| ---------------------------------------------- | --------------------------------------- |
| [GETTING-STARTED.md](./GETTING-STARTED.md)     | CRA vs Vite vs nested apps; how to run. |
| [TWEETAPP-OVERVIEW.md](./TWEETAPP-OVERVIEW.md) | TweetApp multi-repo layout.             |
| [PROJECT-CATALOG.md](./PROJECT-CATALOG.md)     | This catalog.                           |


