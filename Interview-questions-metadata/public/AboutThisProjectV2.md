# **About This Project: v2**  

This project is an initiative to explore **Markdown file handling**—from writing and structuring Markdown files to rendering them dynamically within a web application using **Node.js** and **Express.js**.  

## **Inspiration**  
Throughout this journey, we will document the **resources, references, and inspirations** that contributed to achieving our goals. This will help in tracking progress and refining our approach.  

---

# **v1: Existing Functionalities** *(Deployed in Learning-Prod Environment)*  

### **Overview**  
In the first version, we implemented a **single route** to serve Markdown content:  

#### **Endpoint:**  
```
GET /pages/admin/content-details/v1?direction=next&filename=Difference-between-syntax-questions.md
```
### **Key Features:**  
- The endpoint is currently **accessible without restrictions**.  
- Accepts optional search parameters:  
  - **`fileName`** (to specify a file)  
  - **`direction`** (to navigate between files)  
- If **no file name is provided**, the UI displays:  
  - A **tree-view structure** listing all available files (left panel).  
  - A default message prompting users to select a file (right panel).  

---

# **v2: Enhanced Version (In Progress 🚀)**  

### **Objectives**  
We aim to enhance the project by:  
- Introducing **structured API endpoints** for retrieving content.  
- Implementing **content mapping** for improved file access.  
- Developing **utility functions** to dynamically generate content mappings.  
- Refining the **UI** to align with new API structures.  

### **New API Routes (Planned)**  

1️⃣ **Frontend Content Retrieval**  
```
GET /pages/admin/content-details/v2?slug=<slug>
```
- Searches for a **matching `contentMapping` entry** from the `contentMappings` array.  
- Behavior based on lookup result:  
  - **Match Found** → Renders content.  
  - **No Match** → Displays an error message.  
  - **Non-Markdown File** → Shows a "Work in Progress" message.  

2️⃣ **Backend Content API**  
```
GET /api/smart-content/:slug
```
- Searches for `slug` in the `contentMappings` array.  
- Response:  
  - **Match Found** → Returns file content.  
  - **No Match** → Sends an error response.  

---

## **Automated Content Mapping Generation**  

To enhance efficiency, we are developing a **utility function** that dynamically scans the base directory and builds the `contentMappings` array.  

### **Approach**  
- We define **`BasePathMappings`**, an array of objects with the following structure:  
  ```typescript
  { name: string; basePath: string; }
  ```
- The system traverses the **basePath**, generating a **contentMappings array** that serves as an **index for all available files**.  
- This mapping will allow efficient file retrieval based on **slug-based search queries**.  

### **Additional Features**  
- **`getDetailsForSlug` Method:**  
  - Fetches **next/previous slugs** based on the given slug.  
  - Returns **selected index** and **total slug count** to facilitate seamless navigation.  

---

## **Planned UI Enhancements**  

While the focus is currently on API stabilization, **minor UI tweaks** will be implemented as necessary to maintain compatibility.  

**Key Considerations:**  
- **Improved folder structure** for better version control.  
- **Refactoring of view files** to improve maintainability.  
- **Retrospective learning:**  
  - In v1, our goal was to **quickly set up and explore a basic structure**.  
  - Technologies like **EJS, Node.js, and Express.js** were new to us at that time, making it a great learning experience.  
  - Now, with a better understanding, we can optimize and **refine the architecture** further. 😎🔥  

---

## **Conclusion**  
This project is an evolving **learning experience**, focusing on **dynamic content rendering, API design, and system automation**. As we progress, we will continue refining both the **backend logic** and **frontend presentation**, ensuring an efficient and scalable solution. 🚀  

