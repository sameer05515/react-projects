# API Endpoints Reference

This document lists all API endpoints that need to be implemented in the Spring Boot 3 backend.

## Base URL
All endpoints are relative to: `http://localhost:3006`

## Implemented Endpoints âœ…

### Topics
- `POST /topics` - Create a new topic
- `GET /topics` - Get all topics
- `GET /topics/{uniqueId}` - Get topic by uniqueId
- `PUT /topics/{uniqueId}` - Update topic by uniqueId
- `POST /topics/search` - Search topics
- `POST /topics/section` - Create topic section
- `GET /topics/{uniqueId}/sections` - Get all sections for a topic
- `GET /topics/{uniqueId}/sections/{sectionUniqueId}` - Get specific section
- `PUT /topics/{uniqueId}/sections/{sectionUniqueId}` - Update section

### Tasks
- `GET /tasks` - Get all tasks
- `GET /tasks/{id}` - Get task by ID
- `POST /tasks` - Create a new task
- `PUT /tasks/{id}` - Update task by ID
- `DELETE /tasks/{id}` - Delete task by ID

### Tags
- `POST /tags` - Create a new tag
- `GET /tags` - Get all tags
- `GET /tags/{uniqueId}` - Get tag by uniqueId
- `PUT /tags/{uniqueId}` - Update tag by uniqueId
- `DELETE /tags/{uniqueId}` - Delete tag by uniqueId
- `GET /tags/aggregation-results?queryType=getTagsCountByDate` - Get aggregation results

## To Be Implemented ðŸ”„

### Links
- `GET /links` - Get all links
- `GET /links/{uniqueId}` - Get link by uniqueId
- `POST /links` - Create a new link
- `PUT /links/{uniqueId}` - Update link by uniqueId
- `DELETE /links/{uniqueId}` - Delete link by uniqueId
- `POST /links/search` - Search links

### Memory Maps
- `GET /memory-maps` - Get all memory maps
- `GET /memory-maps/{uniqueId}` - Get memory map by uniqueId
- `POST /memory-maps` - Create a new memory map
- `PUT /memory-maps/{uniqueId}` - Update memory map by uniqueId
- `DELETE /memory-maps/{uniqueId}` - Delete memory map by uniqueId
- `POST /memory-maps/search` - Search memory maps
- `PUT /memory-maps/{uniqueId}/skeleton` - Update skeleton

### Users
- `POST /api/users/login` - User login
- `POST /api/users/register` - User registration

### Words
- `GET /api/words` - Get all words
- `GET /api/words/{id}` - Get word by ID
- `POST /api/words` - Create a new word
- `PUT /api/words/{id}` - Update word by ID
- `DELETE /api/words/{id}` - Delete word by ID
- `POST /api/words/search` - Search words

### Pinned Items
- `GET /pinned-items` - Get all pinned items
- `GET /pinned-items/{uniqueId}` - Get pinned item by uniqueId
- `POST /pinned-items` - Create a new pinned item
- `PUT /pinned-items/{uniqueId}` - Update pinned item by uniqueId
- `DELETE /pinned-items/{uniqueId}` - Delete pinned item by uniqueId

### My Resume
- `GET /my-resume` - Get all resumes
- `GET /my-resume/{uniqueName}` - Get resume by uniqueName
- `POST /my-resume` - Create a new resume
- `PUT /my-resume/{uniqueName}` - Update resume by uniqueName
- `DELETE /my-resume/{uniqueName}` - Delete resume by uniqueName

### Interview Management V1
- `GET /intvw-mgmt/v1/categories` - Get all categories
- `GET /intvw-mgmt/v1/categories/{uniqueId}` - Get category by uniqueId
- `POST /intvw-mgmt/v1/categories` - Create a new category
- `PUT /intvw-mgmt/v1/categories/{uniqueId}` - Update category by uniqueId
- `DELETE /intvw-mgmt/v1/categories/{uniqueId}` - Delete category by uniqueId

### Interview Management V2
- `GET /intvw-mgmt/v2/categories` - Get all categories
- `GET /intvw-mgmt/v2/questions` - Get all questions
- `GET /intvw-mgmt/v2/answers` - Get all answers
- `POST /intvw-mgmt/v2/categories` - Create category
- `POST /intvw-mgmt/v2/questions` - Create question
- `POST /intvw-mgmt/v2/answers` - Create answer
- `PUT /intvw-mgmt/v2/categories/{uniqueId}` - Update category
- `PUT /intvw-mgmt/v2/questions/{uniqueId}` - Update question
- `PUT /intvw-mgmt/v2/answers/{uniqueId}` - Update answer
- `DELETE /intvw-mgmt/v2/categories/{uniqueId}` - Delete category
- `DELETE /intvw-mgmt/v2/questions/{uniqueId}` - Delete question
- `DELETE /intvw-mgmt/v2/answers/{uniqueId}` - Delete answer

### Tweets V1
- `GET /tweets/v1` - Get all tweets
- `GET /tweets/v1/{id}` - Get tweet by ID
- `POST /tweets/v1` - Create a new tweet
- `PUT /tweets/v1/{id}` - Update tweet by ID
- `DELETE /tweets/v1/{id}` - Delete tweet by ID

### Tweets V2
- `GET /tweets/v2` - Get all tweets
- `GET /tweets/v2/{id}` - Get tweet by ID
- `POST /tweets/v2` - Create a new tweet
- `PUT /tweets/v2/{id}` - Update tweet by ID
- `DELETE /tweets/v2/{id}` - Delete tweet by ID

### Related Nodes
- `GET /node-story` - Get all related nodes
- `GET /node-story/{uniqueId}` - Get related node by uniqueId
- `POST /node-story` - Create a new related node
- `PUT /node-story/{uniqueId}` - Update related node by uniqueId
- `DELETE /node-story/{uniqueId}` - Delete related node by uniqueId

### Think Tank
- `GET /think-tank/v1` - Get all think tank items
- `GET /think-tank/v1/{uniqueId}` - Get think tank item by uniqueId
- `POST /think-tank/v1` - Create a new think tank item
- `PUT /think-tank/v1/{uniqueId}` - Update think tank item by uniqueId
- `DELETE /think-tank/v1/{uniqueId}` - Delete think tank item by uniqueId
- `GET /think-tank/v1/stats` - Get statistics

### ChatGPT
- `GET /cgpt` - Get all ChatGPT conversations
- `GET /cgpt/{uniqueId}` - Get ChatGPT conversation by uniqueId
- `POST /cgpt` - Create a new ChatGPT conversation
- `PUT /cgpt/{uniqueId}` - Update ChatGPT conversation by uniqueId
- `DELETE /cgpt/{uniqueId}` - Delete ChatGPT conversation by uniqueId

### Activities
- `GET /activities` - Get all activities
- `GET /activities/{uniqueId}` - Get activity by uniqueId
- `POST /activities` - Create a new activity
- `PUT /activities/{uniqueId}` - Update activity by uniqueId
- `DELETE /activities/{uniqueId}` - Delete activity by uniqueId

### Comparable Objects
- `GET /c-objects` - Get all comparable objects
- `GET /c-objects/{uniqueId}` - Get comparable object by uniqueId
- `POST /c-objects` - Create a new comparable object
- `PUT /c-objects/{uniqueId}` - Update comparable object by uniqueId
- `DELETE /c-objects/{uniqueId}` - Delete comparable object by uniqueId

### Consolidated Reporting
- `GET /consolidated-reporting` - Get all consolidated reports
- `GET /consolidated-reporting/{uniqueId}` - Get consolidated report by uniqueId
- `POST /consolidated-reporting` - Create a new consolidated report
- `PUT /consolidated-reporting/{uniqueId}` - Update consolidated report by uniqueId
- `DELETE /consolidated-reporting/{uniqueId}` - Delete consolidated report by uniqueId

## Documentation Endpoints

- `GET /api-docs` - Swagger UI
- `GET /redoc` - Redoc documentation (modern, responsive UI)
- `GET /api-docs-json` - OpenAPI JSON specification

