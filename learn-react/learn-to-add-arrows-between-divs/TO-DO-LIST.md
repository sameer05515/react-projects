# DONE Tasks
- **[Group]** Tree Data Utility Development
  - **[Task]** Implement utility to generate TreeData from a flat array containing `id` and `parentId` fields.
    - File location: `src\common\utils\generate-tree-data\from-flat-array\v1.js`
  - **[Task]** Create a utility to generate TreeData based on depth and number of children per level.
    - File location: `src\common\utils\generate-tree-data\from-depth-and-children\v1.js`
  - **[Task]** Implement transformation utility to convert existing TreeData structures.
    - File location: `src\common\utils\generate-tree-data\from-existing-tree\v1.js`
  - **[Task]** Parsing utility for generating TreeData from indented text.
    - File location: `src\common\utils\generate-tree-data\from-indented-text\v1.js`
  - **[Task]** Parsing utility for generating TreeData from key-value data with indentation.
    - File location: `src\common\utils\generate-tree-data\from-key-value-data\v1.js`

# In Progress Tasks
- **[Group]** Utility to return TreeData
  - **[Task]** Complete testing and finalize a stable utility to generate TreeData using Class-based builder approach.
    - File location: `src\common\utils\lib-rough-work-area\PURPOSE-generate-tree-data\from-builder-class-use\v1.js`
  - **[Task]** Implement functional approach for generating TreeData and ensure it aligns with project requirements.
    - File location: `src\common\utils\lib-rough-work-area\PURPOSE-generate-tree-data\from-functional-approach\v1.js`
- **[Group]** Externalize Utility and Common Components
  - **[Task]** Externalize all utility JavaScript files to a separate `Library Project` and use them as dependencies in the project.
    - This should be done after stable component creation of `ReactArcherV1` for rendering TreeData.
  - **[Task]** Document and ensure smooth integration of the externalized utility library.
    - Include detailed usage examples and API references.
