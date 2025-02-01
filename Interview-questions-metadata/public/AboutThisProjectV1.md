# About this project: v1
In this project, I aim to learn how to write Markdown files. Additionally, we will render these files in a web application using Node.js.


### Inspiration
We will document all site URLs and thoughts that inspired and aided us in achieving our goal.


# v1: Existing functionalities : Live in our learning-prod-environment
- Till this version, we have a single route as below  
`GET /pages/admin/files/v1?direction=next&filename=Difference-between-syntax-questions.md`

    - This URL is currently accesible without any restriction.
    - User sends optional `fileName` and `direction` search params
    - If not present, the page will display a list of file names in left section in tree-view
    - In right-section a default message to select a file is displayed.

# v2: Enhanced version: In progress
- We are planning to enhance the application to v2, so that 
    - It can have new routes should be in below fashion
        - URI `GET /pages/admin/v2`
            - search param `slug` 
            - On basis of slug a `contentMapping` entry will be searched from `contentMappings` array.
                - if not found Error message will be displayed
                - if found, the file content (which is currently md file only) will be rendered.
                - Since contentMapping object may contain non-md file reference too, hence for now `work-in-progress` type message will be displayed.
        - URI `GET /api/smart-content/:slug`
            - search param `slug`
            - On basis of slug a `contentMapping` entry will be searched from `contentMappings` array.
                - if not found Error response will be thrown
                - if found, the data will be sent as response

- Apart from this we are also developing utility, where on base of BasePathMappings objects (having structure {name:string; basePath:string;}), we will generate an array of contentMapping object (final structure will be published later.)
    - this content mappings array will be used as search directory to find a file data on basis of given `slug`
    - Additionally the method `getDetailsForSlug` should return nextPrev pointer-slug for a given slug and selectedIndex and total count of slug.

- We are also planning to enhance the UI, but this should be done post API for v2 get stabilized. However minor tweeks to support any breaking changes as follows must be done there
    - view files re-organization, as in v1 we have not focused more on versioning and effective seggregation due to probale version support. (well that's ok, because our focus was just to create and run a basic structure only, there we have gained a lot. Aferall `ejs`, `node`, `express` all were new and unknown terms at that time. 😎😎)
