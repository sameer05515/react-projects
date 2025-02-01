import { availableOutputTypes } from "../../../common/components/Smart/Editor/v3.jsx";
import { Status, ThinkTankItem, ThinkTankItemType } from "./Item.dto.js";

const internalTodoDataArr = [
  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.HTML,
      content: `<b>Create My Todo list</b>

    - Successfully created basic structure of Todo.`,
    },
    createdDate: "25/Jan/2025",
    status: Status.CLOSED,
    closedOn: "25/Jan/2025",
    isUrgent: true,
    isImportant: true,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.HTML,
      content: `<b>Identify all sources, where i have stored some data and collate them</b>.
         It could be a database, github-repo, a folder, or some sub-folder in a github repo    
          Possible sources are
            - 'my-pages' repo
            - other GitHub repo
            - A react archer project
            - unit testing repo
            - My mongodb collection 
            - My smart-bkp repo
            - My hard drive
            - My old note books, in which I have written my projects day to day description 
            - ChatGPT conversations 
            - Udemy course links
            - Tweet app db data 
            - Questions and answers collection from Adrik's interview 
            - One node js ejs project, where I have collected some data 
            - One typescript project also, where some data collected 
            - Also one another next js project where some data collected, etc
            - Prioritise , revise and practice swiftly and efficiently and regularly 

    <b>Note: </b> We have developed page, and will add identified sources accordingly. Now making this todo as Not urgent, so that we can focus on other priority to-dos.
    `,
    },
    createdDate: "25/Jan/2025",
    status: Status.OPEN,
    closedOn: "",
    isUrgent: false,
    isImportant: true,
    hasGroomed: true,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.HTML,
      content: `<b>Review topics in Topic-Mgmt application:</b>
        - Add appropriate tags
        `,
    },
    createdDate: "25/Jan/2025",
    status: Status.OPEN,
    closedOn: "",
    isImportant: true,
    isUrgent: true,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.HTML,
      content: `<b>Migrate Todo application logic to  TweetApp application:</b>
        - Migrated code from 'my-pages' repo to here.
        - <span class="badge text-bg-danger">Although it was neither urgent not important</span>
        `,
    },
    createdDate: "25/Jan/2025",
    status: Status.CLOSED,
    isUrgent: false,
    isImportant: false,
    hasGroomed: true,
    closedOn: "26/Jan/2025",
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.HTML,
      content: `<b>Apply uniform layout and styles in all modules of TweetApp application:</b>
        - Add appropriate tags
        `,
    },
    createdDate: "25/Jan/2025",
    status: Status.OPEN,
    isUrgent: false,
    isImportant: true,
    hasGroomed: false,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.HTML,
      content: `<b>Add a toggle button in this page:</b>
        - Toggle button should show "Show all"/"Show only open"/"show closed" text and display filtered data accordingly in list
        `,
    },
    createdDate: "25/Jan/2025",
    status: Status.CLOSED,
    closedOn: "25/Jan/2025",
    isUrgent: true,
    isImportant: true,
    hasGroomed: true,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.HTML,
      content: `
[Urgent][Important][Aim: attract more interview calls]: Update my resume to reflect following too.
	- I have good knowledge of tailwind and bootstrap for web page designing
	- I have 14 years of fullstack development
	- I have worked as Developer, Senior Developer, Team Lead in my projects.
	- I have implemented several design patterns. (Also there will be one separate task to highlight my implemented design patterns with their use cases)
	
	This is to attract more interview calls
    `,
    },
    createdDate: "26/Jan/2025",
    isUrgent: true,
    isImportant: true,
    hasGroomed: false,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.HTML,
      content: `
[Not Urgent][Not Important] A try by removing zycus infotech company name and making last company as EVC ventures and gap of 2 years.
	- As an answer of what i did in this duration, i will mention that i have been working as freelancer and some part time job and explore chatgpt from last 2 years.
	- Expectation is , may be i may get a salary package of at least 20 -25 LPA package.
	
	- Closed, as per suggestions from ChatGPT. I will work on resume alterations by highlighling certifications, freelancing projects and personal growth during the gap.
	
	details can be found in below chat in tweets section.
	[TBD](./TBD)
    `,
    },
    createdDate: "26/Jan/2025",
    isUrgent: false,
    isImportant: false,
    hasGroomed: false,
    closedOn: "26/Jan/2025",
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.HTML,
      content: `
[Not urgent][Important] - Create a global node details viewer popup.
	- The popup should be placed in App.js or Routes Page.
	- It will be open on dispatch action similar to CustomBackdrop3
	- It will be useful to open details about a given node.
	- To make clarity, I should introduce one slug field in each of my node type. (or keep track of slug in a separate collection)
    `,
    },
    createdDate: "26/Jan/2025",
    isUrgent: false,
    isImportant: true,
    hasGroomed: false,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.HTML,
      content: `
[urgent][Not Important] - Move the static to-do data to database.
	- My expectation from To-do section is to be very simple, but effective.
	- In to-do, I just want to dump my ideas and sort them with urgency, created date, closed date 
	- Also I am planning to introduce an upcoming "action date", which will contain a future date, if some to-do is not actionable instantly
	
	- As the data grows, it will be difficult to manage it manually, hence making this task as urgent, but not important.
    `,
    },
    createdDate: "26/Jan/2025",
    isUrgent: true,
    isImportant: false,
    hasGroomed: false,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.HTML,
      content: `
[Not urgent][Not Important]: [Beautification of To-do module]: Add below in circle as logo
 <div>Stay calm → Review → Prioritize → Revise → Practice → Retrospect → Stay Calm</div>

 <b>Closing Note:</b> <span class="badge text-bg-danger">Although it was neither urgent not important</span>, I implemented it with the help of ChatGPT
    `,
    },
    createdDate: "26/Jan/2025",
    isUrgent: false,
    isImportant: false,
    hasGroomed: true,
    status: Status.CLOSED,
    closedOn: "27/Jan/2025",
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.HTML,
      content: `
[Not urgent][important]: [Beautification of To-do module]: Add smart editor to add/edit description of a Todo-Module

- This task is dependent on below to-dos and should be done post their implementation and successful testing
	- Create a modal containing smart editor, which can be open from any where in application, based on a query parameter "open-smart-editor=true"
		- Implementation of
    `,
    },
    createdDate: "26/Jan/2025",
    isUrgent: false,
    isImportant: true,
    hasGroomed: false,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.HTML,
      content: `
[Not urgent][Important]: Todos data should be visible to only user, who has created. It should be private and should not be visible in other modules. However, Todo can link any node (either topic, tweet, task, memory map or any future node)

Hence todo's visibility should be in controlled manner.

<span class="badge text-bg-danger">Dependency :</span> This Task can be implemented after implementation of authentication and authorization in TweetApp
    `,
    },
    createdDate: "26/Jan/2025",
    isUrgent: false,
    isImportant: true,
    hasGroomed: true,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.HTML,
      content: `
[Not urgent][Important] : Do POC for below in backend layer in node-service project.
	- create a POST rest endpoint which accepts a an object implementing Node interface in its body. 
	- After recieving the object, typecast it into a suitable class according to node-type mentioned in incoming object.
	- Write observation or challenges faced, if any
	
Why this is important?
- We will use the findings to improvise the backend layer of TweetApp to reduce redundancy and simplify the save/update of a node.
    `,
    },
    createdDate: "26/Jan/2025",
    isUrgent: false,
    isImportant: true,
    hasGroomed: false,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.HTML,
      content: `
[Not Urgent][Important] : Create a central modal to show all available tags. It will be used to select some tags, to be linked to any Node.
	- It should accept one initialState props (a string array, containing valid tags).
	- If pop-up finds some inconsistency in provided data, It should show error message and restrict user to further use the component for the purpose (i.e. if there is some issue, user should not be able to select/unselect tags)
	- Try to display only 5 tags at a time in the popup.
	- User should be able to filter tags, based on provided search text.
	- In later versions of this component, there should be a setting for count for number of tags displayed in paginated view.

Why this is important?
- This can reduce the complexity of various Node forms. Please see this [topic](TBD_topic_id] to get more informations about list of all currently supported Node-Types.

Why this is not urgent?
- Since we already have implemented the tagging/untagging in almost our all modules, we can take this To-do as an enhancement and can wait for its implementation post proper grooming done.
    `,
    },
    createdDate: "26/Jan/2025",
    isUrgent: false,
    isImportant: true,
    hasGroomed: false,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.HTML,
      content: `
[Not urgent][Important]: Develop one route to display "About this project" information.
	- It should contain information about TweetApp project.
	- It should also contain informations about all supported modules and thought process why we design this particular module or data type.
	
Suggestions: 
	- Try to use existing memory-map module and topic mgmt module for purpose of this to-do.
		- use memory-map to design flow.
		- use topics created dedicately for showing this data.
		
	- Although, as primarily it looks difficult to implement, we can go with some traditional approach like as follows
		- In our other projects, like chat renderer etc, we have created md files in public folder and used a [MDSection](./stable-github-url-of-MDSection-component] component.
		- In some other projects and in Miscellaneous components section of this project itself, we have created json object containing a description string. 
			- caution- However, please refer this [topic](topic-unique-id-showing-challenges-by-going-through-this-approach)(or, a github file url, residing in "memory-maps" private repo of "premendrakumar") 
			- caution- Also, Since this todo is not urgent and as a learner, we should go through a challenging approach.
    `,
    },
    createdDate: "26/Jan/2025",
    isUrgent: false,
    isImportant: true,
    hasGroomed: false,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.HTML,
      content: `
[Not urgent][Not Important]:[todo-not-groomed-yet] Create a topic or static md/html file, to mention user journey for following:
	- creating a Todo, 
	- changing its urgent or important flag with a reason
	- changing access of a todo (Note, initially all todos are private and we have not developed any facility/service/redux-selector to get list of todos, in our other modules). rather we have also not created services to persist todo's in table.
		- default - so that the todo become visible in other todos for linking.
		- protected - so that the todo is only visible within selected modules inside TweetApp application.
		- public - so that to-do visible in entire module and can be accessed from other applications or directly accessible in browser, as per authorization rule of TweetApp.

Why	this todo?	
- Although this todo is mostly a documentation work, this can be useful for future reference and could be useful for new user of TweetApp.
    `,
    },
    createdDate: "26/Jan/2025",
    isUrgent: false,
    isImportant: false,
    hasGroomed: false,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.HTML,
      content: `
[Urgent][Important]:[todo-not-groomed-yet] Decide authorization rules in TweetApp.

- Review , improvise the login/authorization rules of current TweetApp and Decide authorization rules in TweetApp.

What authorization rules we should implement?
- TBD

Why urgent and important?
- Although we have developed some login logic in TweetApp, this is in very early stage. We want to improve login and authorization modules now.
- As this TweetApp is <b>created for collate my learning</b> and in my interviews Spring security is very frequently asked sections (and honestly, I am not fully prepared for it due my other learning priorities), I want to brushup my knowledge to build an application with proper authentication and authorization.
    `,
    },
    createdDate: "26/Jan/2025",
    isUrgent: true,
    isImportant: true,
    hasGroomed: false,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.HTML,
      content: `
[Not Urgent][Not Important]: Just for readability purpose of a todo item, we can restrict the length of portion of description of tweet to, say 500 words or 50 lines.

Later we can move the setting in some common page or modal and connect it with redux.
    `,
    },
    createdDate: "26/Jan/2025",
    isUrgent: false,
    isImportant: false,
    hasGroomed: true,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.HTML,
      content: `
[Not urgent][Important]:[todo-not-groomed-yet] by default at time of creation of a new To-do item, it should only take the description field value and default values for below field should go with todo data. 
	- <b>Note</>, in its initial implementation, Todo module data is being managed manually, which can be error-prone and in later we are planning to persist todo data in database, hence we have not highlighted some section and pre-requisites for this todo.
		- Also we are making this todo as "not groomed yet" due to same reason.
    `,
    },
    createdDate: "26/Jan/2025",
    isUrgent: false,
    isImportant: false,
    hasGroomed: false,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.HTML,
      content: `
[Not Urgent][Not Important]:[todo-not-groomed-yet] We want to develop functionality to create todos in bulk from given text.

Note: 
	- This feature is very handle-with-care type. And there could be several <b>corner cases</b>. Hence, this should be developed after regorous testing and most probably after developing feature for persisting todo items in database.
	- We should create a clear user journey to develop this feature. Below are few advises
		- Create one form with a text area.
		- Once user inputs some text and click on "Preview button", seggregate the text into multiple todo descriptions and render them in todo items.
		- there should be some logic to seggregate description. below are few examples
			- say, a separator text like "--------- todo description ends here----", or
			- a user given separator text, like "-------------"
			- In place of on text area accepting multiple descriptions as-a-whole and then seggregating them into multiple todos, we can go with 
				- "one-text-area---one-todo" approach too and give a checkbox in bottom of form having text "create another one, after creating this todo."
				- Alternatively, we can give a "Add more button" in bottom and on click of it another form can be open.
			- However, to avoid unneccesary complexity in initial development, we should go with simplest approach.
    `,
    },
    createdDate: "26/Jan/2025",
    isUrgent: false,
    isImportant: false,
    hasGroomed: false,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.HTML,
      content: `
Sanitize all todo data, which created on 26/jan/2025. 

due to lack of time, we have just created them on raw notepad and placed in db (manual data-store currently) as-it-is. They need to be reviewed and groomed properly.
    `,
    },
    createdDate: "26/Jan/2025",
    isUrgent: true,
    isImportant: true,
    hasGroomed: true,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.HTML,
      content: `
Practice and revise Spring boot security with 
  - a html project , 
  - a react project, and 
  - a spring MVC project 
    `,
    },
    createdDate: "26/Jan/2025",
    isUrgent: true,
    isImportant: true,
    hasGroomed: true,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.HTML,
      content: `
27-January-2025
Create a project setup with angular without cli+ts+vite
Explore it's use and limitations 
Create a basic react+ js+vite setup, which has some authentication and authorisation logic. For persistence of the data, try to use first a manual json approach.
Then move data to backend, but in same hardcoded json format. It can be managed via an express or a spring boot security project

      `,
    },
    createdDate: "27/Jan/2025",
    isUrgent: true,
    isImportant: true,
    hasGroomed: true,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.HTML,
      content: `
    Create one TO-DO App with angular.

    Approach will be similar. we will use hardcoded json to populate todo data and will try to render UI with Angular.

    <b>Purpose: </b> Learning Angular by creating this app

    Done with help of chat gpt. <span class="badge text-bg-danger">However, i must learn the code.</span>

28-January-2025
[Urgent and important] : I have asked almost all topics' refreshers to ChatGPT. Please go through it and collect actionable for my revision plan and start revision cycle as soon as possible.
[28-Jan-2025]: Reviewed till microservices. Resume review from "please create a small plan or roadmap for SOLID and other frequently used principle refresher."

    `,
    },
    createdDate: "28/Jan/2025",
    isUrgent: false,
    isImportant: false,
    hasGroomed: true,
    status: Status.CLOSED,
    closedOn: "28/Jan/2025",
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.HTML,
      content: `
    <b>Unpublished Todos 29-Jan-2025</b>

Unpublished Todos 29-Jan-2025
- [NU,I,][NG], I want to create a routine.
	- I want to read 1 refresher topic every day
	- I want to read and review(change its rating for now for sake of simplicity) 5 topics in topic mgmt. (2 new topics, 3 from lastly read and reviewed)
	- I want to put/remove 1 tag from lastly read and reviewed topics.
	- I want to read/practice/review(change its rating for now for sake of simplicity) 10 interview questions ( 4 new question, 2 from lastly read and reviewed, 4 coding questions)
	- I want to ask/explore 5 new sub-sequent questions.
	
------------------------------------
- I want to see only one todo in 1 page (i.e. I want to implement pagination with page size 1, in Todo-module)
--------------------------------------
- [NU,I][Groomed] I want to display topic card info, using cornell method. 
	- One running design sample can be found in chat renderer application at below route
	- http://localhost:5000/testing?tester=CornellMethodVisualizationV1
---------------------------------
- [NU,I][Groomed] I want to use PomodoroTimerV2 for effective use of Pomodoro Technique for focused work sessions.
	- Please refer task prioritisation roadmap in chat gpt conversation, for more details.
--------------------------------------
- [NU,I][NG], I want to do POC for following
	- check whether each next chatgpt version file contains data of its previous version + delta questions which were asked after previous version till date-time of current version.
	
------------------------------------
- [UI], I want to  want to get prepared for interview questions before today EOD.

--------------------------------
- [UI]- add a filter of major version on below page in chat renderer app.
http://localhost:5000/testing

<hr/>


<b>MY QUESTIONS TO SELF (TO REDUCE STRESS AND IF THEY ARE "VALID ASK"s, then answer them by next day)</b>
-------------------------
Date : 29-Jan-2025
- How I can use all "small roadmap for refreshing **.**" topics and link them as memory maps? 
	- How will I add above topics to my Revision&Practice cycle?
-------------------------
- How will I create a "Revision&Practice" pool and use it effectively?
-------------------------
- How will I store these questions. I do not want to bloat my questions module with these premature questions? (I know, by tomorrow 90% questions will be striked through myself, as they will loose their context and impact of hampering my decision power?
	- One possible way is, I can put these questions either
		- under a specific memory map item in TweetApp, with date . And strike-through or find answer next day they created.
		- or, I will maintain a separate json file, similar to todo.

-----------------------------------------------
29-January-2025
[Not Urgent][Important]- Read "Microservices Patterns" by Chris Richardson. Book. 
Book can be found at 
https://github.com/AAAAAIstudy/bookshelf-1/blob/main/Extra/Microservices%20Patterns%20With%20examples%20in%20Java.pdf

Move all todos mentioned here to google doc, for better maintainability and reliability for security 


    `,
    },
    createdDate: "29/Jan/2025",
    isUrgent: false,
    isImportant: false,
    hasGroomed: false,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.MARKDOWN,
      content: `
- [TO-DO][NU,I]: Review TweetApp backend code and implement
	- global error handling mechanism in all APIs
	- revise and update role specific logic and authorization logic.
    `,
    },
    createdDate: "30/Jan/2025",
    isUrgent: false,
    isImportant: false,
    hasGroomed: false,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.MARKDOWN,
      content: `
- [TO-DO][NU,I][NG]: Update structure of a question object as follows
	- id (mongo id for internal use. our application does not rely on it)
	- uniqueId (a custom uniqueId for each question node)
	- name or title, some 1 liner of question. It is to be shown in compact mode (i.e. heading of question to be displayed in a list/tree-list of questions)
	- slug , a unique , human-readable string for a question. It can be updated. But preferably it should be same after publishing a question.
	- answers, array of smart contents (i.e. object having fields content, input component, output format)
	- createdOn, updatedOn
	- version field, so that different versions of questions can be easily distinguished.
	- pre-requisite questions, and sub-sequent questions -  ( we are planning to hold list of question ids in some different way, where any question can have list question ids, which should be seen/visited before coming to this question and also questions which should be seen/visited after leaving to this question)
	- parentId ( a legacy field, which we want to get rid for in future and rely on preRequisiteQuestions and subSequentQuestions in-stead)
	- children ( a legacy derived field, which we want to get rid for in future and rely on preRequisiteQuestions and subSequentQuestions in-stead)
    `,
    },
    createdDate: "30/Jan/2025",
    isUrgent: false,
    isImportant: false,
    hasGroomed: false,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.MARKDOWN,
      content: `
- [TO-DO][NU,NI][Groomed][Closed]: create a single todo (used as pool of unpublished todos), having title of a date(like "Todos 30-Jan-2025") and containing all unpublished to-do data. this is to avoid bloating to-do board.
	- Alternatively, we are going to create all unpublished todos of last day (or prior to yesterday in a single todo)
    `,
    },
    createdDate: "30/Jan/2025",
    isUrgent: false,
    isImportant: false,
    hasGroomed: false,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.MARKDOWN,
      content: `
- [TO-DO][NU,I][Groomed]: A simple workflow for todo creation, where todos can be marked as important or urgent only after they have been groomed.
	- Although we can use "NU", "NI" in todo description for readability purpose.
    `,
    },
    createdDate: "30/Jan/2025",
    isUrgent: false,
    isImportant: false,
    hasGroomed: false,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.MARKDOWN,
      content: `
- [TO-DO][NU,NI][NG]: any todo which is not groomed, should be placed in todo-datewise-pool only, for better readability. Rest all todos should be treated as groomed only.
    `,
    },
    createdDate: "30/Jan/2025",
    isUrgent: false,
    isImportant: false,
    hasGroomed: false,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.MARKDOWN,
      content: `
30-January-2025
"The Microservice architecture pattern language', read till 1.5 section of book.
Will resume reaWill resume reading further by tomorrow morning.

      `,
    },
    createdDate: "30/Jan/2025",
    isUrgent: false,
    isImportant: false,
    hasGroomed: false,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.MARKDOWN,
      content: `
- [TO-DO][Not-Urgent,Important][Not Groomed]: We are planning to migrate To-do data with below changes
	- All existing data will be moved to mongodb.
	- To-Do module will be renamed to \`Think-Tank\`. 
		- fields mentioned below will be available in each item.
			- description (with a smartContent content) and 
			- flags (like Urgent, Important, Groomed)
	- A type field will be introduced here in pojo. 
		- Possible values are To-do, raw-question, yet-to-be-decided.
			- by default all items will belong to \`yet-to-be decided\`, which can be changed any-time.
			
	- We are planning for a field called \`inspiredFrom\`, which will contain ids of other items in \`Think-tank\`. 
		- Also if we are marking item-A, item-B in \`inspiredFrom\` list of item-C, then item-C will be shown in a derived list of \`inspirationCause\` of item-A and item-B.
		- We will update this business logic accordingly during any challenges faced or observations in its implementation.
		
	- We are planning for a \`why\` section in description itself for audit and future purpose. Please note we are not introducing a separate field for sake of simplicity of \`Think-Tank\` module and retaining its nature of being fuzzy or uncertain (i.e. any think-tank item may or may not be executed before going to \`Closed\` state.)
		- Please note an item in \`Think-tank\` is private unless it is not shared by user. It is only visible to the user, who created it.
		
	- To track the visibility of a think-tank item in multi-user environment, we should introduce a \`createdBy\` field too. This createdBy field should be supplied in header (or any other valid way, decided at time of actual implementation) of each API of \`Think-Tank\` module.
	
	- We are planning to show items in pagination with default PageSize 1 and supply a total items count, as per controls selected by user. Control related logic is mentioned below. 
	- We are planning to show controls as per below.
		- **Filtering**
			- filter items by open status
			- filter items by closed status.
			- show all open/closed items.
			- filter by 1 or more types (types information mentioned above in this item itself)
				- As we said \`1 or more\`, hence UI should restrict un-selection of a type check-box, if selectedTypes array has size of 1.
				- To unselect last type, user must have to select any other type first. then only he should be able to do so.
		- **Change PageSize**
			- A user can change page size between 1-10. the new pageSize will be sent as query parameter to route.
			- If pageSize param missing or an invalid value (i.e pagesize is not an integer or outside 1-10),
				- then a \`warning panel\` will be activated (This warning panel should go after first release, i.e. \`Migration\` of data to MongoDB.)
					- This warning panel should be controlled through a state (passed in navigation \`To\` object).
						- We can go with a simple name for state as array of \`messages\` object, with below fields.
							- \`messageType\` - Info| Warning| Error. 
								- If type not mentioned, message object's default type will be \`Error\`.
								- And an additional message with error type \`Error\` should be appended with proper standard message for missing messageType. (Hope this is an extreme condition, and very rare to happen, but we are planning so to make \`Think-Tank\` module resilient)
							- \`message\` a string.
					- However, as per resiliency in core of this module, the default value of 1 will be stored in state.
		- **Sorting**
			- A user can apply zero or more sorting logic to item-list.
			- By default, data should come in reverse chronological order of CreatedDate (i.e. the most recently created item should come first)
		
		- All sorting commands will be visible in route. ( or in location state, decided at time of actual implementation). 
			- sorting logic should be tracked as an array of object with fields {sortBy: string; direction: ASC/DESC}

====================================
Same answer in some formatted way.


### **Think-Tank Migration Plan**  

#### **Overview**  
We are migrating the **To-Do module** to **Think-Tank**, with the following changes:  
- **All data will be moved to MongoDB.**  
- **The module will be renamed to "Think-Tank".**  
- **New fields and features will be introduced to improve organization and tracking.**  

---

### **Key Changes**  

#### **1. Data Structure Updates**  
Each Think-Tank item will have the following fields:  
- **\`description\`** – Contains a **smartContent** description.  
- **\`flags\`** – Labels like **Urgent, Important, Groomed**.  
- **\`type\`** – Defines the category of an item. Possible values:  
  - \`To-do\`  
  - \`Raw-question\`  
  - \`Yet-to-be-decided\` (default, can be changed anytime)  
- **\`inspiredFrom\`** – References other Think-Tank items.  
  - If Item C is inspired by Item A & B, then:  
    - **Item C** will list A & B in \`inspiredFrom\`.  
    - **Item A & B** will list C under \`inspirationCause\`.  
  - This logic will be refined as we implement it.  

---

#### **2. Access & Visibility**  
- **Think-Tank items are private by default.**  
- Only the **creator** can view them unless shared explicitly.  
- A **\`createdBy\`** field will track the owner.  
  - This will be included in API headers or another suitable mechanism during implementation.  

---

#### **3. "Why" Section for Auditability**  
- Every item should include a **"why" section** in its description.  
- **No separate field** is introduced to keep Think-Tank flexible and open-ended.  
- Items **may or may not** be completed before being marked **Closed**.  

---

### **User Interface (UI) Enhancements**  

#### **1. Pagination**  
- Default **page size: 1**.  
- Total item count will be displayed based on user-selected controls.  

#### **2. Filters**  
Users can filter items by:  
- **Status**: Open / Closed / Both  
- **Type**: To-do, Raw-question, Yet-to-be-decided  
  - **At least one type must always be selected.**  
  - Users must select a different type before unchecking the last remaining selection.  

#### **3. Page Size Customization**  
- Users can **set page size between 1-10**.  
- If an **invalid page size** is provided (not an integer or outside 1-10):  
  - A **warning panel** will be triggered (to be removed after the first release).  
  - Warnings will be tracked using a \`messages\` array with:  
    - **\`messageType\`**: Info | Warning | Error (default: Error)  
    - **\`message\`**: The message text.  
  - The system will default to **page size = 1** in such cases.  

#### **4. Sorting**  
- Users can apply **zero or more sorting options**.  
- Default sorting: **Newest first (reverse chronological order of \`createdDate\`).**  
- Sorting rules will be stored in an array of objects:  
  \`\`\`ts
  { sortBy: string; direction: "ASC" | "DESC" }
  \`\`\`  
- Sorting parameters will be reflected in the **URL route or location state** (to be decided during implementation).  

---

### **Summary of Changes**  
✅ Migrating To-Do module data to MongoDB.  
✅ Renaming To-Do to **Think-Tank**.  
✅ Introducing \`type\`, \`inspiredFrom\`, and \`createdBy\` fields.  
✅ Private by default; users must share items manually.  
✅ Improved **pagination, filtering, sorting, and error handling**.  
✅ Keeping Think-Tank flexible with **no rigid structure** for tracking thoughts.  

This plan ensures **scalability, flexibility, and a smooth user experience**. 🚀
    `,
    },
    createdDate: "30/Jan/2025",
    isUrgent: false,
    isImportant: false,
    hasGroomed: false,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.MARKDOWN,
      content: `
[TO-DO]: -  finding ways in javascript or typescript to restrict user to use direct new operator use , as current constructor itself relies on order of values
- This is for enhancing Think-Tank item dto in chat-renderer application.
    `,
    },
    createdDate: "30/Jan/2025",
    isUrgent: false,
    isImportant: false,
    hasGroomed: false,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.MARKDOWN,
      content: `
- [RAW-QUESTION] Why I am getting so less interview calls?
	- Has my carreer ended? should I switch to some other way to earn?
    `,
    },
    createdDate: "30/Jan/2025",
    isUrgent: false,
    isImportant: false,
    hasGroomed: false,
    itemType: ThinkTankItemType.RawQuestion,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.MARKDOWN,
      content: `
- [RAW-QUESTION] Why I am not getting succeess in freelancing?	
    `,
    },
    createdDate: "30/Jan/2025",
    isUrgent: false,
    isImportant: false,
    hasGroomed: false,
    itemType: ThinkTankItemType.RawQuestion,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.MARKDOWN,
      content: `
- [RAW-QUESTION] What is difference between a \`to-do\`, \`task\` , \`goal\` and \`long-term-goal\`?
	- Prbabale answer : 
		- to-dos are very raw task, which may be executed never once we decide later so. Also they are private to each user, unless thier access is not modified by user.
		- task are some deterministic block of work, which may be completed in few days or hours. Tasks are visible in other modules of TweetApp and can be linked with a Topic/Tweet/Question/Tag or any future module.
		- Goal is a long term block of code, which may take a couple of weeks to get completely executed. Their access is also private to each user, unless thier access is not modified by user.
		- Long-term-goal is a long term block of code, which may take a couple of weeks to get completely executed. Their access is also private to each user, unless thier access is not modified by user. There must be a plan (in the form of memory-maps) attached to it.
		- A Long-term-goal should contain one or more Goals.
		- A Goal can contain one or more tasks.
		- There is no referecing facility with a todo. However to better organise to-dos, we can think for a mandatory why-section in a todo, which should be followed before closing any todo. Also reviewers (a user, who has been given read access for to-dos, should raise alarm or put some review comment, if why-section missing or purpose unidentified in a todo). As todos are private in nature, hence every user should assign a reviewer to become eligible to use our to-do module.
================

Same answer in some formatted way.

### **FAQ: Difference Between To-Do, Task, Goal, and Long-Term Goal in TweetApp**  

#### **1. What is the difference between a \`to-do\`, \`task\`, \`goal\`, and \`long-term goal\`?**  

- **To-Do**:  
  - A raw idea or task that may or may not be executed later.  
  - Private to the user unless shared.  
  - Cannot be linked to other modules.  
  - Should include a **"why" section** before closing to clarify its purpose.  
  - Users must assign a reviewer for accountability.  

- **Task**:  
  - A well-defined piece of work that can be completed in hours or days.  
  - Visible in other TweetApp modules.  
  - Can be linked to Topics, Tweets, Questions, Tags, or future modules.  

- **Goal**:  
  - A larger work unit that takes **weeks** to complete.  
  - Private to the user unless shared.  
  - Contains multiple **Tasks**.  

- **Long-Term Goal**:  
  - A significant objective that also takes **weeks** to accomplish.  
  - Private to the user unless shared.  
  - Must include a **plan (memory maps)** for execution.  
  - Contains multiple **Goals**.  

### **Hierarchy Summary**  
🔹 **Long-Term Goal** → Contains multiple **Goals**  
🔹 **Goal** → Contains multiple **Tasks**  
🔹 **Task** → Standalone unit of work (linked to other modules)  
🔹 **To-Do** → Private note, cannot be linked to other modules  

Would you like any modifications to fit your project better? 😊
    `,
    },
    createdDate: "30/Jan/2025",
    isUrgent: false,
    isImportant: false,
    hasGroomed: false,
    itemType: ThinkTankItemType.RawQuestion,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.MARKDOWN,
      content: `
- [RAW-QUESTION] What is difference between a \`raw-question\`, \`FAQ\` and \`Question\`?

	- **Raw Question**
		- raw-question can have only a description section containing a smartContent. 
		- In the description itself conatins all question-title text, its details and answers.
		- A raw-question may or may not be answered in future.
		- A raw question may be strike-through
		- Better if we put raw-questions in a separate pool, (raw qustion-pool)
		- Private to the user unless shared.  
		- Cannot be linked to other modules.  
		- Should include a **"why" section** before closing to clarify its purpose.  
		- Users must assign a reviewer for accountability.
		
	- **FAQ**
		- A well structured question to be created by an Admin
		- can be in a drafted and published status.
		- Once published, one version will be atached with a question and all its state at time of publish will go in a separate pool (FAQ pool). FAQ Pool will be visible publicly and Other admins can use it to create a FAQ section of application.
		
	- **Question**
		- A general purpose question created in admin module. 
		- We will decide buisness rules for a question in a separate question.
		
		
==================================

Same answer in some formatted way.

### Difference Between \`Raw Question\`, \`FAQ\`, and \`Question\`  

#### **Raw Question**  
- A simple, unstructured question with only a description (smartContent).  
- It includes the question, details, and possible answers in one place.  
- Might never be answered and can be **struck through** if needed.  
- Stored separately in a **Raw Question Pool**.  
- Private unless shared and **cannot be linked** to other modules.  
- Before closing, users must add a **"why" section** to clarify its purpose.  
- Users must assign a reviewer for accountability.  

#### **FAQ (Frequently Asked Question)**  
- A **structured question** created by an Admin.  
- Can have **draft** and **published** statuses.  
- Once published, a version is stored in a **FAQ Pool** (publicly visible).  
- Other Admins can use the FAQ Pool to create an FAQ section for the app.  

#### **Question**  
- A **general-purpose** question created in the Admin module.  
- Business rules for questions will be defined separately.
    `,
    },
    createdDate: "30/Jan/2025",
    isUrgent: false,
    isImportant: false,
    hasGroomed: false,
    itemType: ThinkTankItemType.RawQuestion,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.MARKDOWN,
      content: `
- [RAW-QUESTION] Which topics should I (a user) prepare for my interviews?
	- For topics which 
		- \`Self-commited-trivial\`- I have committed in my resume (Long term effect and I should work for them regorously)
			- I ( as a User) will put such topics in my commitment pool.
		- \`Self-highlighlted-volatile\`- I have mentioned during my interview
			- But they may or may not have any effect post interview, post self-review
			- If found relevant, we will push such topics in commitment pool.
		- \`Recommended-volatile\`- I have been recommended from an interviewer, before scheduling interview round.
			- Again they only have limited effect, unless found relevant and pushed to commitment pool.
			

===================

Same answer in some formatted way.

### **Which Topics Should I Prepare for My Interviews?**  

As a user, I should focus on three types of topics for interview preparation:  

#### **1. Self-Committed Trivial**  
- Topics **I have committed in my resume** (long-term impact).  
- I should work on these topics rigorously.  
- These topics go into my **Commitment Pool** for continuous preparation.  

#### **2. Self-Highlighted Volatile**  
- Topics **I mentioned during my interview** but were not pre-committed.  
- These topics **may or may not** have long-term importance after self-review.  
- If relevant, they will be added to the **Commitment Pool**.  

#### **3. Recommended Volatile**  
- Topics **recommended by an interviewer** before scheduling an interview round.  
- These topics have **limited impact** unless they are found relevant.  
- If valuable, they should also be moved to the **Commitment Pool**.  

### **Additional Suggestions**  
- **Track Your Progress**: Keep notes on frequently asked topics.  
- **Prioritize Weak Areas**: Focus more on topics where you struggle.  
- **Stay Updated**: Interview trends change, so refine your list over time.  
- **Practice Often**: Mock interviews and coding challenges will improve retention.
    `,
    },
    createdDate: "30/Jan/2025",
    isUrgent: false,
    isImportant: false,
    hasGroomed: false,
    itemType: ThinkTankItemType.RawQuestion,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.MARKDOWN,
      content: `
- [RAW-QUESTION] 
## Should we introduce a \`blockedBy\` field containing ids of other think-tank items?
> or what should be criteria to raise a task?
	
- Simplest answer is \`No\`.
	- Reason, it violates the purpose of \`Think-Tank\` ( be simple, fuzzy and private to user)
	- As we want to introduce minimal fields in a \`Think-Tank\` item, this is time to raise a task instead, and lower the priority of todo-item.
		- If possible, just close it and mention the cause of bloackage and link manually the task/to-do item created.
		
	- In think-tank, the chronology of any idea is important. This will be more helpful.
		- We should also not alter the description of an idea, once it is marked as groomed.
		- We do not want a think-tank item to be modified more. This will defeat the purpose of think-tank (that ideas may or may not be executed)
			- We do not want to make such condition that user has to expose his idea.
				- If something useful (in sense of an idea) coming in mind, then we should encourage user to raise a task, instead. 
					- In this way, user can better track its status.
    `,
    },
    createdDate: "30/Jan/2025",
    isUrgent: false,
    isImportant: false,
    hasGroomed: false,
    itemType: ThinkTankItemType.RawQuestion,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.MARKDOWN,
      content: `
- [RAW-QUESTION] 
## Should we give user facility to add more than one descriptions to a think-tank item?
- To be decided, post migrating data to mongodb
    `,
    },
    createdDate: "30/Jan/2025",
    isUrgent: false,
    isImportant: false,
    hasGroomed: false,
    itemType: ThinkTankItemType.RawQuestion,
  }),

  ThinkTankItem.fromObject({
    smartContent: {
      textOutputType: availableOutputTypes.HTML,
      content: `
Think-Tank items: 31-Jan-2025
----------------------------------------
[Raw-Question][U,I,NG] 
- Am I prepared for interviews?
	- No. 
	- Below are reasons:-
		- 
	
--------------------------------------
[Raw-Question][U,I,NG] 
- What is my priority in next job opportunity?
	- refer http://localhost:3002/notifications for a raw answer.
	- amend it and remove dependency of above link.
	
-----------------------------------------------
[TODO][U,I,NG] 
- Understand Javascript Event Loop and persist the understanding in a topic. 
	- Also collect the related questions. 
	- Map all questions and topic to memory map (for key-terminologies of javascript)

--------------------------------------------
[TODO][NU,I,NG] 
- Change memory-map code so that it can hold memory-map items as array of node with below structure. 
\`\`\`
{
	uniqueId:string; 
	parentId:string; 
	type:string; 
	smartContent:{
		content:string;
		outputType:string;
	}
}
\`\`\`
Also make such mechanism (i.e. do such code changes) that is compatible with previous TIS approach. We will facilitate users both approaches to create memory-maps (i.e. users can create memory maps using TIS and newer node-array approach. However we give user a info message to encourage them use of newer node-array approach.




----------------------------------------------------------------
[TODO][NU,I,G] 
Hierarchical structure of data in Tweet, Topic, MemoryMap, Question module are not helping to establish a complex but reliable relations among nodes. 
	- We should think for a better approach.
------------------------------
[TODO][U,I,NG][State-In-Progress][Owner-Prem]
Collect best practices questions series (i.e. ask this to ChatGPT)
	- ✅ What are best practices to develop APIs?
		- What are best practices to develop APIs with Spring Boot?
		- What are best practices to develop APIs with Node+Express?
	- What are best practices to securing an API resources?

-------------------------------
[My-Pain-Areas] 
**Problem Statement**:  
- I am not able to prioritize, as I see multiple items to be done concurrently. Like
	- Moving Think-Tank items data to mongodb
	- Improving layout of TweetApp, and many more.
- However, I can not concentrate on every items at same time.

- Also, Once I am starting to work on some items, I feel distractions, roadblocks. Due to it, my concentration is not being maintained.

**Solution**:
- TBD
			
---------------------------------
[Self-Realization]
> I realized that mind gets distracted due to various reasons, but in that case it can not think properly. Hence **We must try to stop and be calm first, whenever some distraction, anxiety or confusion is felt**. 

===============
# Same thought in more organized way :)

🌿 **Stay Calm, Regain Focus** 🌿  

Life is full of distractions—worries, doubts, and endless thoughts pulling us in different directions. When our mind is restless, it becomes difficult to think clearly and make the right decisions.  

✨ **But here’s the key:** Whenever you feel distracted, anxious, or confused, don’t rush. Instead, **pause, take a deep breath, and allow yourself to be calm first.**  

🧘‍♂️ **Why?**  
- A calm mind sees solutions, while a restless mind sees problems.  
- Clarity comes in moments of stillness, not chaos.  
- Stopping for a moment helps us regain control over our thoughts instead of being controlled by them.  

So next time you feel overwhelmed, **just pause. Close your eyes. Take a deep breath.** In that moment of stillness, you’ll find the power to refocus and move forward with confidence. 🚀

===================================

### **Effective Strategies to Manage Stress**  

#### 🏃‍♂️ **1. Physical Techniques (Body-Based)**
- **Exercise Regularly** 🏋️‍♂️ – Running, yoga, or even a short walk reduces cortisol levels.  
- **Deep Breathing** 🌬 – Try the **4-7-8 breathing technique** (inhale for 4 sec, hold for 7, exhale for 8).  
- **Progressive Muscle Relaxation (PMR)** 💆‍♂️ – Tense and relax different muscle groups.  

#### 🧠 **2. Mental Techniques (Mind-Based)**
- **Reframe Negative Thoughts** 🔄 – Convert *"I'm failing"* into *"I'm learning"*.  
- **Mindfulness & Meditation** 🧘‍♀️ – Stay present and avoid overthinking. Try apps like **Headspace** or **Calm**.  
- **Journaling** ✍️ – Write down your worries to clear mental clutter.  

#### 🗓 **3. Time & Work Management**
- **Use the Pomodoro Technique** 🍅 – Work in **25-minute focused sessions** with 5-minute breaks.  
- **Prioritize Tasks** 📋 – Follow the **Eisenhower Matrix** (Urgent vs. Important).  
- **Avoid Multitasking** 🚫 – Focus on one task at a time for better efficiency.  

#### ❤️ **4. Emotional & Social Support**
- **Talk to Someone** 🗣 – Friends, family, or a mentor can offer perspective.  
- **Laugh & Have Fun** 😆 – Watch comedy, play games, or engage in hobbies.  
- **Practice Gratitude** 🙏 – Write 3 things you're grateful for daily.  

#### 🌿 **5. Lifestyle Changes**
- **Healthy Diet** 🥗 – Reduce caffeine, sugar, and processed foods.  
- **Good Sleep Hygiene** 😴 – Maintain a **consistent sleep schedule** and avoid screens before bed.  
- **Limit Social Media** 📱 – Reduce doomscrolling and comparison stress.  

Would you like help creating a personalized stress-management routine based on your daily schedule? 😊
    `,
    },
    createdDate: "31/Jan/2025",
    isUrgent: false,
    isImportant: false,
    hasGroomed: false,
    itemType: ThinkTankItemType.ToDo,
  }),

  ThinkTankItem.fromObject({
    smartContent:{textOutputType: availableOutputTypes.HTML,content: `
31-January-2025
[Nu, I, G][TODO]- Collate all frequently asked questions in interviews 
As a hint, refer tags in Tweet app, and notes created during earlier interviews
—--

[Nu, I][TODO] We should make a rule that any ThinkTank item, which user wants to publish should have a unique slug based on its title. Hence title should be non empty.
This title should be used for creating a slug, based on title
As a workaround, if title is not unique , system should suggest some unique slug by appending
A date string in format of ddMMMyyyy
Or any other suffix identified during actual implementation 
The actual id should not be exposed for a public think-tank item. This can be useful if user wants to publish a new version with same slug.
As version came in picture, we can go with a default '-latest' prefix in every slug, by default. This prefix thing can also be part of suggested slug in case of conflicts 
—-
(Commitment)(U,I) I have 15: years of Full stack development experience 
—-
(Commitment)(U,I) I have worked for development with java for 15 years 
—--
I have worked for development with Reactjs for 8 years
—----
I have worked for development with spring boot and microservices for 8 years
—----
I have worked for team leadership for 8 years
—----
(Raw-Question)- After I get new job opportunity, and my resuming my career, how will I manage my time and schedule for revision?


Restarting your career while managing time for revision requires a structured approach. Here’s a simple yet powerful strategy to balance your work, learning, and personal life effectively:  

### **1. Prioritize & Plan Ahead**  
- Identify key topics you need to revise (technologies, frameworks, problem-solving skills, etc.).  
- Allocate time based on importance—focus more on areas that need improvement.  
- Use a **weekly planner** or a **digital calendar** (Google Calendar, Notion, or Todoist) to schedule revision slots.  

### **2. Leverage the Power of Micro-Learning**  
- Instead of long study sessions, revise in **short bursts** (30-45 minutes).  
- Use the **Pomodoro Technique** (25 mins study + 5 mins break) to stay focused.  
- Summarize key learnings daily in a **personal knowledge base** (Notion, OneNote, or Obsidian).  

### **3. Integrate Learning into Your Work**  
- Apply what you revise in real projects at your job.  
- Maintain a **"Lessons Learned" journal** to note challenges and solutions.  
- Engage in technical discussions with colleagues to reinforce concepts.  

### **4. Make Use of Dead Time**  
- Listen to tech podcasts or audiobooks during commutes.  
- Watch short tutorial videos during lunch breaks.  
- Use flashcards (Anki, Quizlet) for quick topic recall.  

### **5. Stay Consistent & Track Progress**  
- Set **small weekly goals** (e.g., "Revise React Hooks," "Practice 3 DSA problems").  
- Use a **habit tracker** to monitor progress and stay accountable.  
- Every weekend, **reflect** on what worked and adjust the schedule if needed.  

### **6. Maintain Work-Life Balance**  
- Avoid burnout by setting boundaries between work and study time.  
- Schedule **relaxation and social time** to stay motivated.  
- Exercise and meditate to keep your mind fresh.  

**🚀 Final Thought:** The key to success is **consistency, not intensity.** Even **30 minutes a day** adds up over time. Stay patient, trust the process, and enjoy the journey of growth!
—----------












    `},
    createdDate: "31/Jan/2025",
    isUrgent: false,
    isImportant: false,
    hasGroomed: false,
    itemType: ThinkTankItemType.ToDo
  }),

  ThinkTankItem.fromObject({
    smartContent:{textOutputType: availableOutputTypes.HTML,content: `
01-February-2025
[U,I][Plan][NG] My plan of revision
RPR (review, practice and revise) refresher plans of topics
RPR key terminologies of topics
RPR practicals of topics
Links with summary of learning
—---------------------
[U,I][TODO] My laptop fan is making a lot of noise. I must take it to repair shop for its diagnosis, to refrain from any big damage.

—--------------------------
[U,I][TODO][G] SmartEditors and SmartPreviewers are most common used code in TweetApp. However, their codes have been spaghetti over the time. And due to refactor initiated, now the Sev1 has been raised. So, dhoti sambhal ke saara kaam chhor ke log jao.

—----------------------------------
[U,I][MY-UPDATES] 
- What I am working today (i.e. on 01-February-2025)
  - I am refactoring SmartEditor code. 
    - However, after initial refactor of renaming file, I am worrying that I am introducing breaking changes in v4. How will I manage balance between legacy v3 and new v4. I am thinking both from UI as well as backend side.
    - My worry is also due to unstable backend of TweetApp. For now I have thought so many changes, but have not implemented them uniformly.
    - I fear that I may introduce breaking changes un-intentionally, and due to this my whole application may stop functioning.
      - For solution of this worry, I must push all my recent changes in a separate branch, naming as \`work-branch-before-impl-smart-editor-v4-changes\`
      - In this way, I will have a backup working branch, which I can use to rollback my breaking changes.


 

    `},
    createdDate: "01/Feb/2025",
    isUrgent: false,
    isImportant: false,
    hasGroomed: false,
    itemType: ThinkTankItemType.ToDo
  }),

  // ThinkTankItem.fromObject({
  //   smartContent:{textOutputType: availableOutputTypes.HTML,content: `

  //   `},
  //   createdDate: "30/Jan/2025",
  //   isUrgent: false,
  //   isImportant: false,
  //   hasGroomed: false,
  //   itemType: ThinkTankItemType.ToDo
  // }),

  // ThinkTankItem.fromObject({
  //   smartContent:{textOutputType: availableOutputTypes.HTML,content: `

  //   `},
  //   createdDate: "30/Jan/2025",
  //   isUrgent: false,
  //   isImportant: false,
  //   hasGroomed: false,
  //   itemType: ThinkTankItemType.ToDo
  // }),

  // ThinkTankItem.fromObject({
  //   smartContent:{textOutputType: availableOutputTypes.HTML,content: `

  //   `},
  //   createdDate: "30/Jan/2025",
  //   isUrgent: false,
  //   isImportant: false,
  //   hasGroomed: false,
  //   itemType: ThinkTankItemType.ToDo
  // }),

  // ThinkTankItem.fromObject({
  //   smartContent:{textOutputType: availableOutputTypes.HTML,content: `

  //   `},
  //   createdDate: "30/Jan/2025",
  //   isUrgent: false,
  //   isImportant: false,
  //   hasGroomed: false,
  //   itemType: ThinkTankItemType.ToDo
  // }),

  // ThinkTankItem.fromObject({
  //   smartContent:{textOutputType: availableOutputTypes.HTML,content: `

  //   `},
  //   createdDate: "30/Jan/2025",
  //   isUrgent: false,
  //   isImportant: false,
  //   hasGroomed: false,
  //   itemType: ThinkTankItemType.ToDo
  // }),

  // ThinkTankItem.fromObject({
  //   smartContent:{textOutputType: availableOutputTypes.HTML,content: `

  //   `},
  //   createdDate: "30/Jan/2025",
  //   isUrgent: false,
  //   isImportant: false,
  //   hasGroomed: false,
  //   itemType: ThinkTankItemType.ToDo
  // }),

  // ThinkTankItem.fromObject({
  //   smartContent:{textOutputType: availableOutputTypes.HTML,content: `

  //   `},
  //   createdDate: "30/Jan/2025",
  //   isUrgent: false,
  //   isImportant: false,
  //   hasGroomed: false,
  //   itemType: ThinkTankItemType.ToDo
  // }),

  // ThinkTankItem.fromObject({
  //   smartContent:{textOutputType: availableOutputTypes.HTML,content: `

  //   `},
  //   createdDate: "30/Jan/2025",
  //   isUrgent: false,
  //   isImportant: false,
  //   hasGroomed: false,
  //   itemType: ThinkTankItemType.ToDo
  // }),

  // ThinkTankItem.fromObject({
  //   smartContent:{textOutputType: availableOutputTypes.HTML,content: `

  //   `},
  //   createdDate: "30/Jan/2025",
  //   isUrgent: false,
  //   isImportant: false,
  //   hasGroomed: false,
  //   itemType: ThinkTankItemType.ToDo
  // }),

  // ThinkTankItem.fromObject({
  //   smartContent:{textOutputType: availableOutputTypes.HTML,content: `

  //   `},
  //   createdDate: "30/Jan/2025",
  //   isUrgent: false,
  //   isImportant: false,
  //   hasGroomed: false,
  //   itemType: ThinkTankItemType.ToDo
  // }),

  // ThinkTankItem.fromObject({
  //   smartContent:{textOutputType: availableOutputTypes.HTML,content: `

  //   `},
  //   createdDate: "30/Jan/2025",
  //   isUrgent: false,
  //   isImportant: false,
  //   hasGroomed: false,
  //   itemType: ThinkTankItemType.ToDo
  // }),

  // ThinkTankItem.fromObject({
  //   smartContent:{textOutputType: availableOutputTypes.HTML,content: `

  //   `},
  //   createdDate: "30/Jan/2025",
  //   isUrgent: false,
  //   isImportant: false,
  //   hasGroomed: false,
  //   itemType: ThinkTankItemType.ToDo
  // }),

  // ThinkTankItem.fromObject({
  //   smartContent:{textOutputType: availableOutputTypes.HTML,content: `

  //   `},
  //   createdDate: "30/Jan/2025",
  //   isUrgent: false,
  //   isImportant: false,
  //   hasGroomed: false,
  //   itemType: ThinkTankItemType.ToDo
  // }),

  // ThinkTankItem.fromObject({
  //   smartContent:{textOutputType: availableOutputTypes.HTML,content: `

  //   `},
  //   createdDate: "30/Jan/2025",
  //   isUrgent: false,
  //   isImportant: false,
  //   hasGroomed: false,
  //   itemType: ThinkTankItemType.ToDo
  // }),

  // ThinkTankItem.fromObject({
  //   smartContent:{textOutputType: availableOutputTypes.HTML,content: `

  //   `},
  //   createdDate: "30/Jan/2025",
  //   isUrgent: false,
  //   isImportant: false,
  //   hasGroomed: false,
  //   itemType: ThinkTankItemType.ToDo
  // }),

  // ThinkTankItem.fromObject({
  //   smartContent:{textOutputType: availableOutputTypes.HTML,content: `

  //   `},
  //   createdDate: "30/Jan/2025",
  //   isUrgent: false,
  //   isImportant: false,
  //   hasGroomed: false,
  //   itemType: ThinkTankItemType.ToDo
  // }),

  // ThinkTankItem.fromObject({
  //   smartContent:{textOutputType: availableOutputTypes.HTML,content: `

  //   `},
  //   createdDate: "30/Jan/2025",
  //   isUrgent: false,
  //   isImportant: false,
  //   hasGroomed: false,
  //   itemType: ThinkTankItemType.ToDo
  // }),

  // ThinkTankItem.fromObject({
  //   smartContent:{textOutputType: availableOutputTypes.HTML,content: `

  //   `},
  //   createdDate: "30/Jan/2025",
  //   isUrgent: false,
  //   isImportant: false,
  //   hasGroomed: false,
  //   itemType: ThinkTankItemType.ToDo
  // }),

  // ThinkTankItem.fromObject({
  //   smartContent:{textOutputType: availableOutputTypes.HTML,content: `

  //   `},
  //   createdDate: "30/Jan/2025",
  //   isUrgent: false,
  //   isImportant: false,
  //   hasGroomed: false,
  //   itemType: ThinkTankItemType.ToDo
  // }),

  // ThinkTankItem.fromObject({
  //   smartContent:{textOutputType: availableOutputTypes.HTML,content: `

  //   `},
  //   createdDate: "30/Jan/2025",
  //   isUrgent: false,
  //   isImportant: false,
  //   hasGroomed: false,
  //   itemType: ThinkTankItemType.ToDo
  // }),

  // ThinkTankItem.fromObject({
  //   smartContent:{textOutputType: availableOutputTypes.HTML,content: `

  //   `},
  //   createdDate: "30/Jan/2025",
  //   isUrgent: false,
  //   isImportant: false,
  //   hasGroomed: false,
  //   itemType: ThinkTankItemType.ToDo
  // }),

  // ThinkTankItem.fromObject({
  //   smartContent:{textOutputType: availableOutputTypes.HTML,content: `

  //   `},
  //   createdDate: "30/Jan/2025",
  //   isUrgent: false,
  //   isImportant: false,
  //   hasGroomed: false,
  //   itemType: ThinkTankItemType.ToDo
  // }),

  // ThinkTankItem.fromObject({
  //   smartContent:{textOutputType: availableOutputTypes.HTML,content: `

  //   `},
  //   createdDate: "30/Jan/2025",
  //   isUrgent: false,
  //   isImportant: false,
  //   hasGroomed: false,
  //   itemType: ThinkTankItemType.ToDo
  // }),

  // ThinkTankItem.fromObject({
  //   smartContent:{textOutputType: availableOutputTypes.HTML,content: `

  //   `},
  //   createdDate: "30/Jan/2025",
  //   isUrgent: false,
  //   isImportant: false,
  //   hasGroomed: false,
  //   itemType: ThinkTankItemType.ToDo
  // }),

  // ThinkTankItem.fromObject({
  //   smartContent:{textOutputType: availableOutputTypes.HTML,content: `

  //   `},
  //   createdDate: "30/Jan/2025",
  //   isUrgent: false,
  //   isImportant: false,
  //   hasGroomed: false,
  //   itemType: ThinkTankItemType.ToDo
  // }),

  // ThinkTankItem.fromObject({
  //   smartContent:{textOutputType: availableOutputTypes.HTML,content: `

  //   `},
  //   createdDate: "30/Jan/2025",
  //   isUrgent: false,
  //   isImportant: false,
  //   hasGroomed: false,
  //   itemType: ThinkTankItemType.ToDo
  // }),

  // ThinkTankItem.fromObject({
  //   smartContent:{textOutputType: availableOutputTypes.HTML,content: `

  //   `},
  //   createdDate: "30/Jan/2025",
  //   isUrgent: false,
  //   isImportant: false,
  //   hasGroomed: false,
  //   itemType: ThinkTankItemType.ToDo
  // }),

  // ThinkTankItem.fromObject({
  //   smartContent:{textOutputType: availableOutputTypes.HTML,content: `

  //   `},
  //   createdDate: "30/Jan/2025",
  //   isUrgent: false,
  //   isImportant: false,
  //   hasGroomed: false,
  //   itemType: ThinkTankItemType.ToDo
  // }),

  // ThinkTankItem.fromObject({
  //   smartContent:{textOutputType: availableOutputTypes.HTML,content: `

  //   `},
  //   createdDate: "30/Jan/2025",
  //   isUrgent: false,
  //   isImportant: false,
  //   hasGroomed: false,
  //   itemType: ThinkTankItemType.ToDo
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
       * - [30-Jan-2025]- We are removing this filter. and commenting extra placehoders. This is due to conversion of `name` to smartContent.
       * */
      // .filter((d) => d.name && d.name.trim())
      .map((d) => ({
        ...d,
        /**
         * This is fix for all closed to-dos, which created before intoduction of `hasGroomed` in ToDo class.
         *
         * Logic is: if a todo is closed, then it will be treated as groomed, despite any value saved in database.
         * */
        hasGroomed: d.hasGroomed === true || d.status === Status.CLOSED,
      }))
  );
};

const myTodos = sanitizeDataBeforeExport(internalTodoDataArr);

export { myTodos };
